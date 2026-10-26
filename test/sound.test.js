import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import soundEngine from '../src/core/sound/SoundEngine.js'

describe('SoundEngine Synthesizer Verification', () => {
  it('instantiates and provides enable toggle', () => {
    assert.equal(typeof soundEngine.enabled, 'boolean')
    const current = soundEngine.enabled
    const toggled = soundEngine.toggle()
    assert.equal(toggled, !current)
    // restore
    soundEngine.enabled = current
    assert.equal(soundEngine.enabled, current)
  })

  it('notifies subscribers upon sound state changes', () => {
    let notifiedVal = null
    const unsubscribe = soundEngine.subscribe((val) => {
      notifiedVal = val
    })

    soundEngine.enabled = false
    assert.equal(notifiedVal, false)

    soundEngine.enabled = true
    assert.equal(notifiedVal, true)

    unsubscribe()
  })

  it('handles playFrameSound safely for all event actions without throwing', () => {
    const actions = [
      { action: 'COMPARE', target: [42, 84] },
      { action: 'SWAP', target: [10, 20] },
      { action: 'VISIT_NODE' },
      { action: 'INSERT_NODE' },
      { action: 'FOUND' },
      { action: 'DELETE_NODE' },
      { action: 'CONFLICT' },
      { action: 'DONE' },
      { action: 'STEP_LABEL' },
    ]

    for (const frame of actions) {
      assert.doesNotThrow(() => {
        soundEngine.playFrameSound(frame)
      })
    }
  })
})
