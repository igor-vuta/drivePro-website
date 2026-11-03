import assert from 'node:assert/strict';
import test from 'node:test';
import { acceptsLoad, movePile, movedCount, newPlayState, nextPile, pausePlay, resetPlay, resumePlay } from '../lib/play.mjs';

test('three distinct piles can be moved once in any order', () => {
  for (const order of [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]) {
    let state = newPlayState();
    order.forEach((number, index) => {
      state = movePile(state, number);
      assert.equal(movedCount(state), index + 1);
      assert.equal(movePile(state, number), state);
      assert.equal(state.phase, index === 2 ? 'completed' : 'active');
    });
    assert.equal(nextPile(state), null);
    assert.equal(movePile(state, 1), state);
  }
});

test('pause preserves progress and requires resume for another move', () => {
  const one = movePile(newPlayState(), 2);
  const paused = pausePlay(one);
  assert.equal(paused.phase, 'paused');
  assert.equal(movedCount(movePile(paused, 1)), 1);
  const resumed = resumePlay(paused);
  assert.equal(movedCount(movePile(resumed, 1)), 2);
  assert.equal(nextPile(movePile(resumed, 1)), 3);
});

test('reset and replay start with all piles available', () => {
  const complete = [3, 2, 1].reduce(movePile, newPlayState());
  const reset = resetPlay(complete);
  assert.equal(reset.phase, 'active');
  assert.equal(movedCount(reset), 0);
  assert.equal(nextPile(reset), 1);
  const replay = newPlayState();
  assert.deepEqual(replay, reset);
});

test('paused entry cannot move until an explicit resume', () => {
  const paused = newPlayState(true);
  assert.equal(movePile(paused, 1), paused);
  assert.equal(movedCount(resumePlay(paused)), 0);
});

test('exited or unmounted sessions reject stale load completion and replay fresh', () => {
  const request = 4;
  assert.equal(acceptsLoad(request, request, true), true);
  assert.equal(acceptsLoad(request, request + 1, true), false);
  assert.equal(acceptsLoad(request, request, false), false);
  const previouslyMoved = movePile(newPlayState(), 3);
  assert.equal(movedCount(previouslyMoved), 1);
  assert.equal(movedCount(newPlayState()), 0);
});
