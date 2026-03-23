'use strict';

/**
 * Tests for models/Signal.js — Mongoose Schema validation
 *
 * Tests schema shape, required fields, defaults, enums, and indexes.
 * Does NOT connect to a real MongoDB — uses Mongoose validation.
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const Signal = require('../src/models/Signal');

// ─── Schema Shape ────────────────────────────────

describe('Signal model — schema shape', () => {
  it('should be a Mongoose model', () => {
    assert.equal(typeof Signal, 'function');
    assert.ok(Signal.modelName === 'Signal');
  });

  it('should have all required paths', () => {
    const paths = Object.keys(Signal.schema.paths);
    const required = ['tokenMint', 'score', 'action'];
    for (const field of required) {
      assert.ok(paths.includes(field), `Missing schema path: ${field}`);
    }
  });

  it('should have expected optional paths', () => {
    const paths = Object.keys(Signal.schema.paths);
    const optional = [
      'tokenSymbol',
      'tokenName',
      'poolAddress',
      'dex',
      'components',
      'kolMatches',
      'detectedAt',
      'detectedSlot',
      'source',
      'status',
      'expiresAt',
      'actedOnCount',
      'totalVolumeSol',
    ];
    for (const field of optional) {
      assert.ok(paths.includes(field), `Missing schema path: ${field}`);
    }
  });
});

// ─── Validation ──────────────────────────────────

describe('Signal model — validation', () => {
  it('should fail validation when tokenMint is missing', () => {
    const signal = new Signal({
      score: 85,
      action: 'strong_buy',
    });
    const err = signal.validateSync();
    assert.ok(err, 'Should have validation error');
    assert.ok(err.errors.tokenMint, 'tokenMint should be required');
  });

  it('should fail validation when score is missing', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      action: 'strong_buy',
    });
    const err = signal.validateSync();
    assert.ok(err, 'Should have validation error');
    assert.ok(err.errors.score, 'score should be required');
  });

  it('should fail validation when action is not in enum', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 50,
      action: 'invalid_action',
    });
    const err = signal.validateSync();
    assert.ok(err, 'Should have validation error');
    assert.ok(err.errors.action, 'action should fail enum validation');
  });

  it('should accept valid action enum values', () => {
    const validActions = ['strong_buy', 'buy', 'watch', 'avoid', 'rug_alert'];
    for (const action of validActions) {
      const signal = new Signal({
        tokenMint: 'TestMint123',
        score: 50,
        action,
      });
      const err = signal.validateSync();
      if (err && err.errors.action) {
        assert.fail(`Action '${action}' should be valid but got error: ${err.errors.action.message}`);
      }
    }
  });

  it('should accept valid dex enum values', () => {
    const validDex = ['raydium', 'orca', 'meteora', 'unknown'];
    for (const dex of validDex) {
      const signal = new Signal({
        tokenMint: 'TestMint123',
        score: 50,
        action: 'buy',
        dex,
      });
      const err = signal.validateSync();
      if (err && err.errors.dex) {
        assert.fail(`Dex '${dex}' should be valid`);
      }
    }
  });

  it('should pass validation with all required fields', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    const err = signal.validateSync();
    assert.equal(err, undefined, `Unexpected validation error: ${err?.message}`);
  });

  it('should fail validation for score out of range', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 150,
      action: 'buy',
    });
    const err = signal.validateSync();
    assert.ok(err, 'Score > 100 should fail');
    assert.ok(err.errors.score);
  });
});

// ─── Defaults ────────────────────────────────────

describe('Signal model — defaults', () => {
  it('should default status to "active"', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    assert.equal(signal.status, 'active');
  });

  it('should default dex to "raydium"', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    assert.equal(signal.dex, 'raydium');
  });

  it('should default source to "yellowstone_grpc"', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    assert.equal(signal.source, 'yellowstone_grpc');
  });

  it('should default detectedAt to current time', () => {
    const before = Date.now();
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    const after = Date.now();
    const ts = signal.detectedAt.getTime();
    assert.ok(ts >= before && ts <= after, 'detectedAt should default to now');
  });

  it('should default expiresAt to ~15 min from now', () => {
    const before = Date.now();
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    const expiresAt = signal.expiresAt.getTime();
    //  15 min = 900_000 ms, allow 1s tolerance
    const expectedMin = before + 900_000 - 1000;
    const expectedMax = before + 900_000 + 1000;
    assert.ok(expiresAt >= expectedMin && expiresAt <= expectedMax, 'expiresAt should be ~15 min from now');
  });

  it('should default actedOnCount to 0', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    assert.equal(signal.actedOnCount, 0);
  });

  it('should default components with ScoreComponent defaults', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
    });
    assert.equal(signal.components.threatScore, 100);
    assert.equal(signal.components.rugCheckPassed, false);
    assert.equal(signal.components.highestKolTier, 'none');
    assert.equal(signal.components.isClusterSignal, false);
  });
});

// ─── KOL Matches ─────────────────────────────────

describe('Signal model — KOL matches', () => {
  it('should accept valid KOL matches array', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
      kolMatches: [
        { walletAddress: 'wallet1', label: 'SmartMoney1', tier: 's', amountSol: 5 },
        { walletAddress: 'wallet2', tier: 'b', amountSol: 1 },
      ],
    });
    const err = signal.validateSync();
    assert.equal(err, undefined, `KOL matches should validate: ${err?.message}`);
    assert.equal(signal.kolMatches.length, 2);
    assert.equal(signal.kolMatches[0].tier, 's');
    assert.equal(signal.kolMatches[1].action, 'buy'); // default
  });

  it('should fail when kolMatch walletAddress is missing', () => {
    const signal = new Signal({
      tokenMint: 'TestMint123',
      score: 85,
      action: 'strong_buy',
      kolMatches: [{ tier: 's', amountSol: 5 }],
    });
    const err = signal.validateSync();
    assert.ok(err, 'Should fail without walletAddress');
  });
});

// ─── Indexes ─────────────────────────────────────

describe('Signal model — indexes', () => {
  it('should have multiple compound indexes', () => {
    const indexes = Signal.schema.indexes();
    assert.ok(indexes.length >= 3, `Should have at least 3 compound indexes, got ${indexes.length}`);
  });
});
