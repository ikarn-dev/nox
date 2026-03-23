'use strict';

/**
 * Tests for execution/jito-blast.js — 5-Endpoint Parallel Bundle Submission
 *
 * Uses mocked fetch to avoid hitting real Jito endpoints.
 * Tests: race logic, retry, timeout, error aggregation.
 */

const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');

// We need to mock global fetch for these tests
let originalFetch;

describe('jito-blast — parallel submission', () => {
  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should return the fastest successful endpoint', async () => {
    // Mock fetch: endpoint 3 responds fastest (10ms), others slower (100ms)
    let callCount = 0;
    globalThis.fetch = async (url, _opts) => {
      callCount++;
      const idx = url.includes('amsterdam') ? 0 : 50;
      await new Promise((r) => setTimeout(r, idx));
      return {
        ok: true,
        json: async () => ({
          result: `bundle-${callCount}`,
        }),
      };
    };

    const { blastJitoBundle } = require('../src/execution/jito-blast');

    const result = await blastJitoBundle(['tx1_base64'], {
      timeoutMs: 2000,
      retries: 0,
      endpoints: [
        'https://amsterdam.test/api/v1/bundles',
        'https://slow1.test/api/v1/bundles',
        'https://slow2.test/api/v1/bundles',
      ],
    });

    assert.ok(result.bundleId, 'Should have a bundleId');
    assert.ok(result.latencyMs >= 0, 'Should have latencyMs');
    assert.equal(result.attempt, 1);
  });

  it('should retry on total failure then succeed', async () => {
    let attempt = 0;
    globalThis.fetch = async () => {
      attempt++;
      if (attempt <= 2) {
        // First 2 calls (first round fails) - both endpoints fail
        return {
          ok: false,
          text: async () => 'server error',
        };
      }
      // Second round succeeds
      return {
        ok: true,
        json: async () => ({ result: 'bundle-retry-success' }),
      };
    };

    const { blastJitoBundle } = require('../src/execution/jito-blast');

    const result = await blastJitoBundle(['tx1'], {
      timeoutMs: 2000,
      retries: 1,
      endpoints: ['https://ep1.test/api/v1/bundles', 'https://ep2.test/api/v1/bundles'],
    });

    assert.equal(result.bundleId, 'bundle-retry-success');
    assert.equal(result.attempt, 2);
  });

  it('should throw after exhausting all retries', async () => {
    globalThis.fetch = async () => ({
      ok: false,
      text: async () => 'always fail',
    });

    const { blastJitoBundle } = require('../src/execution/jito-blast');

    await assert.rejects(
      () =>
        blastJitoBundle(['tx1'], {
          timeoutMs: 500,
          retries: 0,
          endpoints: ['https://fail.test/api/v1/bundles'],
        }),
      (err) => {
        assert.ok(err.message.includes('failed after'));
        return true;
      },
    );
  });

  it('should throw when Jito returns RPC error', async () => {
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        error: { message: 'Bundle simulation failed' },
      }),
    });

    const { blastJitoBundle } = require('../src/execution/jito-blast');

    await assert.rejects(
      () =>
        blastJitoBundle(['tx1'], {
          timeoutMs: 1000,
          retries: 0,
          endpoints: ['https://rpc-error.test/api/v1/bundles'],
        }),
      (err) => {
        assert.ok(err.message.includes('failed'));
        return true;
      },
    );
  });
});

// ─── getBundleStatus ─────────────────────────────

describe('jito-blast — getBundleStatus', () => {
  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should return confirmed status', async () => {
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        result: {
          value: [
            {
              bundle_id: 'abc123',
              confirmation_status: 'confirmed',
              slot: 12345,
              transactions: ['tx1'],
            },
          ],
        },
      }),
    });

    const { getBundleStatus } = require('../src/execution/jito-blast');
    const status = await getBundleStatus('abc123');
    assert.equal(status.status, 'confirmed');
    assert.equal(status.slot, 12345);
    assert.equal(status.bundleId, 'abc123');
  });

  it('should return not_found for missing bundle', async () => {
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ result: { value: [] } }),
    });

    const { getBundleStatus } = require('../src/execution/jito-blast');
    const status = await getBundleStatus('missing123');
    assert.equal(status.status, 'not_found');
  });

  it('should return error status on fetch failure', async () => {
    globalThis.fetch = async () => {
      throw new Error('network down');
    };

    const { getBundleStatus } = require('../src/execution/jito-blast');
    const status = await getBundleStatus('fail123');
    assert.equal(status.status, 'error');
  });
});

// ─── Exports shape ───────────────────────────────

describe('jito-blast — exports', () => {
  it('should export expected functions and constants', () => {
    const mod = require('../src/execution/jito-blast');
    assert.equal(typeof mod.blastJitoBundle, 'function');
    assert.equal(typeof mod.getBundleStatus, 'function');
    assert.ok(Array.isArray(mod.JITO_ENDPOINTS));
    assert.equal(mod.JITO_ENDPOINTS.length, 5);
  });
});
