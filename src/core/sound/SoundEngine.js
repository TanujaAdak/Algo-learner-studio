/**
 * SoundEngine.js
 *
 * Programmatic audio synthesizer for algorithm visualizer animations using Web Audio API.
 * Zero external audio files required. Uses harmonic sine and triangle waves
 * with exponential gain decay for smooth, pleasant clicks, blips, and chimes.
 */

class SoundEngine {
  constructor() {
    this._ctx = null
    this._enabled = false
    try {
      const stored = localStorage.getItem('algoviz_sound')
      this._enabled = stored === null ? true : stored === 'true'
    } catch {
      this._enabled = true
    }
    this._listeners = new Set()
  }

  get enabled() {
    return this._enabled
  }

  set enabled(val) {
    this._enabled = Boolean(val)
    try {
      localStorage.setItem('algoviz_sound', String(this._enabled))
    } catch {}
    this._notify()
  }

  subscribe(listener) {
    this._listeners.add(listener)
    return () => this._listeners.delete(listener)
  }

  _notify() {
    for (const listener of this._listeners) {
      try {
        listener(this._enabled)
      } catch {}
    }
  }

  toggle() {
    this.enabled = !this.enabled
    if (this.enabled) {
      // Play a quick confirmation chime
      this.playTone(587.33, 0.08, 'sine', 0.035)
    }
    return this.enabled
  }

  _getAudioContext() {
    if (typeof window === 'undefined') return null
    if (!this._ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this._ctx = new AudioCtx()
      }
    }
    if (this._ctx && this._ctx.state === 'suspended') {
      this._ctx.resume().catch(() => {})
    }
    return this._ctx
  }

  /**
   * Plays a smooth tone with exponential envelope decay
   */
  playTone(frequency, duration = 0.06, type = 'sine', volume = 0.035) {
    if (!this._enabled) return
    const ctx = this._getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(frequency, now)

      // Smooth attack and decay to prevent audio popping
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.006)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + duration + 0.02)
    } catch {
      // AudioContext policy or device limitation fallback
    }
  }

  /**
   * Dispatches sound according to the frame action & data
   */
  playFrameSound(frame) {
    if (!this._enabled || !frame) return

    const action = frame.action

    switch (action) {
      case 'COMPARE': {
        let freq = 480
        if (Array.isArray(frame.target) && typeof frame.target[0] === 'number') {
          freq = Math.min(880, Math.max(220, 220 + frame.target[0] * 7))
        }
        this.playTone(freq, 0.045, 'triangle', 0.03)
        break
      }

      case 'SWAP':
      case 'OVERWRITE': {
        this.playTone(330, 0.04, 'sine', 0.035)
        setTimeout(() => this.playTone(493.88, 0.05, 'triangle', 0.03), 30)
        break
      }

      case 'VISIT_NODE':
      case 'ENQUEUE':
      case 'PUSH': {
        this.playTone(523.25, 0.05, 'sine', 0.028)
        break
      }

      case 'INSERT_NODE':
      case 'FOUND': {
        this.playTone(659.25, 0.06, 'sine', 0.035)
        setTimeout(() => this.playTone(880, 0.09, 'sine', 0.04), 45)
        break
      }

      case 'DELETE_NODE':
      case 'NOT_FOUND':
      case 'CONFLICT': {
        this.playTone(220, 0.08, 'sawtooth', 0.02)
        break
      }

      case 'DONE': {
        // Success arpeggio chord (C5 - E5 - G5 - C6)
        this.playTone(523.25, 0.07, 'sine', 0.03)
        setTimeout(() => this.playTone(659.25, 0.07, 'sine', 0.03), 50)
        setTimeout(() => this.playTone(783.99, 0.07, 'sine', 0.035), 100)
        setTimeout(() => this.playTone(1046.50, 0.12, 'sine', 0.04), 150)
        break
      }

      default: {
        this.playTone(440, 0.03, 'sine', 0.015)
      }
    }
  }
}

export const soundEngine = new SoundEngine()
export default soundEngine
