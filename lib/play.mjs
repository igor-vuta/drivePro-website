export const pileNumbers = [1, 2, 3];

export function newPlayState(paused = false) {
  return { phase: paused ? 'paused' : 'active', cleared: 0 };
}

export function movedCount(state) {
  return pileNumbers.filter(number => (state.cleared & (1 << (number - 1))) !== 0).length;
}

export function nextPile(state) {
  return pileNumbers.find(number => (state.cleared & (1 << (number - 1))) === 0) ?? null;
}

export function movePile(state, number) {
  if (state.phase !== 'active' || !pileNumbers.includes(number)) return state;
  const bit = 1 << (number - 1);
  if (state.cleared & bit) return state;
  const cleared = state.cleared | bit;
  return { phase: cleared === 7 ? 'completed' : 'active', cleared };
}

export function pausePlay(state) {
  return state.phase === 'active' ? { ...state, phase: 'paused' } : state;
}

export function resumePlay(state) {
  return state.phase === 'paused' ? { ...state, phase: 'active' } : state;
}

export function resetPlay() {
  return newPlayState();
}

export function acceptsLoad(request, currentRequest, mounted) {
  return mounted && request === currentRequest;
}
