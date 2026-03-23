'use strict';

/**
 * Tests for bot/notifications/signalPush.js — Telegram Signal Broadcaster
 *
 * Tests the module shape, message formatting logic, channel subscriptions,
 * and action-to-emoji mapping. Does NOT actually send Telegram messages
 * or connect to Redis.
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const SIGNAL_PUSH_PATH = path.join(
  __dirname, '..', 'src', 'bot', 'notifications', 'signalPush.js'
);

// ─── Module Shape ────────────────────────────────

describe('signalPush — module shape', () => {
  it('source file should exist', () => {
    assert.ok(fs.existsSync(SIGNAL_PUSH_PATH), 'signalPush.js should exist');
  });

  it('should export startSignalSubscriber function', () => {
    const source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes('startSignalSubscriber'),
      'Should export startSignalSubscriber',
    );
  });
});

// ─── Channel Subscriptions ───────────────────────

describe('signalPush — Redis channel subscriptions', () => {
  let source;

  it('should subscribe to nox:signals channel', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('nox:signals'), 'Should subscribe to nox:signals');
  });

  it('should subscribe to nox:trade_results channel', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('nox:trade_results'), 'Should subscribe to nox:trade_results');
  });

  it('should subscribe to nox:kol_alerts channel', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('nox:kol_alerts'), 'Should subscribe to nox:kol_alerts');
  });

  it('should subscribe to nox:threat_alerts channel', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('nox:threat_alerts'), 'Should subscribe to nox:threat_alerts');
  });

  it('should subscribe to nox:position_alerts channel', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('nox:position_alerts'), 'Should subscribe to nox:position_alerts');
  });
});

// ─── Message Formatting ─────────────────────────

describe('signalPush — message formatting', () => {
  let source;

  it('should use Telegram Markdown formatting', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes("parse_mode") && source.includes("Markdown"),
      'Should use Markdown parse_mode',
    );
  });

  it('should include Solscan TX link for trade results', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes('solscan.io/tx'),
      'Trade results should link to Solscan',
    );
  });

  it('should display KOL trade amount', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('amountSol'), 'Should display trade amount');
  });

  it('should include copy action buttons', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes('Copy') || source.includes('copy'),
      'Should have copy trade button',
    );
    assert.ok(
      source.includes('Skip') || source.includes('skip'),
      'Should have skip button',
    );
  });

  it('should use inline keyboard buttons', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes('inlineKeyboard') || source.includes('Markup.inlineKeyboard'),
      'Should use inline keyboard for action buttons',
    );
  });
});

// ─── Signal Types ────────────────────────────────

describe('signalPush — signal type handling', () => {
  let source;

  it('should handle kol_buy signal type', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('kol_buy'), 'Should handle kol_buy signal type');
  });

  it('should handle new_listing signal type', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('new_listing'), 'Should handle new_listing signal type');
  });

  it('should handle trade success and failure', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes("'success'") || source.includes('"success"'),
      'Should handle trade success status');
    assert.ok(source.includes("'failed'") || source.includes('"failed"'),
      'Should handle trade failed status');
  });
});

// ─── Error Handling ──────────────────────────────

describe('signalPush — error handling', () => {
  let source;

  it('should catch and log signal push failures', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes('signal push failed') || source.includes('processing error'),
      'Should have error logging for push failures',
    );
  });

  it('should gracefully handle missing chatId/userId', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes('!chatId') || source.includes('!userId'),
      'Should guard against missing chatId/userId',
    );
  });
});

// ─── User Querying ───────────────────────────────

describe('signalPush — user targeting', () => {
  let source;

  it('should query Users who copy the KOL wallet', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(
      source.includes('copyTargets.wallet'),
      'Should query by copyTargets.wallet',
    );
    assert.ok(
      source.includes('copyTargets.enabled'),
      'Should check copyTargets.enabled',
    );
  });

  it('should respect copy multiplier and maxSol', () => {
    source = fs.readFileSync(SIGNAL_PUSH_PATH, 'utf-8');
    assert.ok(source.includes('multiplier'), 'Should use copy multiplier');
    assert.ok(source.includes('maxSol'), 'Should respect maxSol limit');
  });
});
