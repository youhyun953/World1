let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

function getContext(): AudioContext | null {
  if (!soundEnabled || typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, startTimeOffset = 0, type: OscillatorType = 'sine', volume = 0.08) {
  const ctx = getContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime + startTimeOffset;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playSuccessChime() {
  playTone(523.25, 0.14, 0, 'triangle', 0.08);
  playTone(659.25, 0.18, 0.09, 'triangle', 0.08);
  playTone(783.99, 0.25, 0.18, 'triangle', 0.09);
}

export function playChoiceChime() {
  playTone(440, 0.12, 0, 'sine', 0.06);
  playTone(554.37, 0.18, 0.08, 'sine', 0.06);
}

export function playSoftAlert() {
  playTone(330, 0.14, 0, 'sine', 0.06);
  playTone(293.66, 0.18, 0.11, 'sine', 0.06);
}

export function playStampSound() {
  playTone(392, 0.1, 0, 'triangle', 0.09);
  playTone(523.25, 0.15, 0.08, 'triangle', 0.09);
  playTone(659.25, 0.16, 0.16, 'triangle', 0.09);
  playTone(1046.5, 0.3, 0.24, 'sine', 0.08);
}
