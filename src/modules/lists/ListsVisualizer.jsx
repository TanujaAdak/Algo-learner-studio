/**
 * ListsVisualizer.jsx
 *
 * Visualizer container for Singly Linked List, Stack (LIFO), and Queue (FIFO).
 * Features dedicated renderers for pointer linking, stack levels, and queue queues.
 */

import { useEffect, useState } from 'react'
import usePlayback from '../../core/playback/usePlayback.js'
import PlaybackControls from '../../components/playback/PlaybackControls.jsx'
import PseudocodePanel from '../../components/playback/PseudocodePanel.jsx'
import ComplexityCard from '../../components/playback/ComplexityCard.jsx'
import StateInspector from '../../components/playback/StateInspector.jsx'
import InputPanel from '../../components/common/InputPanel.jsx'
import { listsPseudocode } from '../../data/pseudocode/lists.js'
import { complexities } from '../../data/complexities/index.js'
import { presets } from '../../data/presets/index.js'

// Import algorithm/structure managers
import LinkedList from './algorithms/linkedList.js'
import StackRec from './algorithms/stack.js'
import QueueRec from './algorithms/queue.js'

const ALGOS = {
  linkedList: { label: 'Singly Linked List' },
  stack:      { label: 'Stack (LIFO)' },
  queue:      { label: 'Queue (FIFO)' },
}

/** Horizontal Linked List Renderer */
function LinkedListRenderer({ list = [], activeId = null }) {
  if (!list || list.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 32 }}>
        <span className="linked-list-badge head">HEAD</span>
        <span className="linked-list-arrow">→</span>
        <span className="linked-list-badge null">NULL (Empty List)</span>
      </div>
    )
  }

  return (
    <div className="linked-list-canvas">
      <div className="linked-list-chain">
        <span className="linked-list-badge head">HEAD</span>
        <span className="linked-list-arrow">→</span>

        {list.map((node) => {
          const isActive = activeId === node.id
          return (
            <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className={`linked-list-node-card ${isActive ? 'active' : ''}`}>
                <div className="linked-list-node-val">{node.val}</div>
                <div className="linked-list-node-ptr" title="Next pointer">•</div>
              </div>
              <span className="linked-list-arrow">→</span>
            </div>
          )
        })}

        <span className="linked-list-badge null">NULL</span>
      </div>
    </div>
  )
}

/** Vertical Stack LIFO Renderer */
function StackRenderer({ stack = [], highlighted = [] }) {
  if (!stack || stack.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32, color: 'var(--text-muted)' }}>
        <div style={{ width: 140, height: 160, border: '2px dashed var(--border-default)', borderTop: 'none', borderRadius: '0 0 8px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
          Empty Stack
        </div>
        <span style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>BOTTOM</span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, height: '100%', justifyContent: 'flex-end', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 6, width: 180, border: '2px solid var(--border-strong)', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: 8, background: 'var(--bg-input)' }}>
        {stack.map((val, idx) => {
          const isTop = idx === stack.length - 1
          const isHighlighted = highlighted.includes(idx)
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 6,
                background: isHighlighted ? 'rgba(244, 199, 107, 0.25)' : isTop ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                border: `1.5px solid ${isHighlighted ? 'var(--color-warning)' : isTop ? 'var(--accent)' : 'var(--border-subtle)'}`,
                color: isTop ? 'var(--accent)' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: 13,
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s',
              }}
            >
              <span>{val}</span>
              {isTop && (
                <span style={{ fontSize: 10, background: 'var(--accent)', color: '#0D1117', padding: '1px 5px', borderRadius: 3, fontWeight: 800 }}>
                  TOP
                </span>
              )}
            </div>
          )
        })}
      </div>
      <span style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
        STACK BASE
      </span>
    </div>
  )
}

/** Horizontal Queue FIFO Renderer */
function QueueRenderer({ queue = [], highlighted = [] }) {
  if (!queue || queue.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, color: 'var(--text-muted)' }}>
        <div style={{ width: 280, height: 60, border: '2px dashed var(--border-default)', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
          Empty Queue Buffer
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: 24, overflowX: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderTop: '2px solid var(--border-strong)', borderBottom: '2px solid var(--border-strong)', padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-warning)', marginRight: 6 }}>
          FRONT (OUT) ⇦
        </span>
        {queue.map((val, idx) => {
          const isFront = idx === 0
          const isRear = idx === queue.length - 1
          const isHighlighted = highlighted.includes(idx)
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                style={{
                  minWidth: 50,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                  borderRadius: 6,
                  background: isHighlighted ? 'rgba(244, 199, 107, 0.25)' : 'var(--bg-elevated)',
                  border: `1.5px solid ${isHighlighted ? 'var(--color-warning)' : isFront || isRear ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  color: isFront || isRear ? 'var(--accent)' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: 13,
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s',
                }}
              >
                {val}
              </div>
              <span style={{ fontSize: 9.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {isFront && isRear ? 'FRONT/REAR' : isFront ? 'FRONT' : isRear ? 'REAR' : `[${idx}]`}
              </span>
            </div>
          )
        })}
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginLeft: 6 }}>
          ⇦ REAR (IN)
        </span>
      </div>
    </div>
  )
}

export default function ListsVisualizer({ onStatusChange }) {
  const [algoId, setAlgoId] = useState('linkedList')
  const [inputValue, setInputValue] = useState('')
  const [opMode, setOpMode] = useState('insert')
  const [frames, setFrames] = useState([])

  const [listEngine] = useState(() => new LinkedList())
  const [stackEngine] = useState(() => new StackRec())
  const [queueEngine] = useState(() => new QueueRec())

  const playback = usePlayback(frames)
  const { currentFrame, isPlaying } = playback

  useEffect(() => {
    handleLoadPreset(presets.lists[0].value)
  }, [algoId])

  useEffect(() => {
    if (isPlaying) {
      onStatusChange?.('running', `Executing ${ALGOS[algoId].label} operations...`)
    } else if (currentFrame?.action === 'DONE') {
      onStatusChange?.('done', currentFrame.description)
    } else {
      onStatusChange?.('ready', '')
    }
  }, [isPlaying, currentFrame, algoId])

  const handleLoadPreset = (valStr) => {
    listEngine.nodes = []
    stackEngine.stack = []
    queueEngine.queue = []

    const items = valStr
      .split(',')
      .map((k) => parseInt(k.trim(), 10))
      .filter((k) => !isNaN(k))

    let lastFrames = []
    if (algoId === 'linkedList') {
      for (const val of items) {
        lastFrames = listEngine.insert(val)
      }
    } else if (algoId === 'stack') {
      for (const val of items) {
        lastFrames = stackEngine.push(val)
      }
    } else if (algoId === 'queue') {
      for (const val of items) {
        lastFrames = queueEngine.enqueue(val)
      }
    }
    setFrames(lastFrames)
    setInputValue('')
  }

  const handleSubmit = () => {
    let nextFrames = []
    const val = parseInt(inputValue.trim(), 10)

    if (algoId === 'linkedList') {
      if (opMode === 'insert') {
        const items = inputValue.split(',').map((k) => parseInt(k.trim(), 10)).filter((k) => !isNaN(k))
        if (items.length === 0) return
        for (const item of items) {
          nextFrames = listEngine.insert(item)
        }
      } else {
        if (isNaN(val)) return
        nextFrames = listEngine.deleteVal(val)
      }
    } else if (algoId === 'stack') {
      if (opMode === 'push') {
        const items = inputValue.split(',').map((k) => parseInt(k.trim(), 10)).filter((k) => !isNaN(k))
        if (items.length === 0) return
        for (const item of items) {
          nextFrames = stackEngine.push(item)
        }
      } else {
        nextFrames = stackEngine.pop()
      }
    } else if (algoId === 'queue') {
      if (opMode === 'enqueue') {
        const items = inputValue.split(',').map((k) => parseInt(k.trim(), 10)).filter((k) => !isNaN(k))
        if (items.length === 0) return
        for (const item of items) {
          nextFrames = queueEngine.enqueue(item)
        }
      } else {
        nextFrames = queueEngine.dequeue()
      }
    }

    setFrames(nextFrames)
    setInputValue('')
  }

  const currentList = currentFrame?.stateSnapshot?.list || listEngine.nodes || []
  const currentArray = currentFrame?.stateSnapshot?.array || []
  const highlighted = currentFrame?.highlightedNodes || []
  const activeNodeId = highlighted.length > 0 ? highlighted[0] : null

  let activePseudocode = []
  if (algoId === 'linkedList') {
    activePseudocode = listsPseudocode.linkedList[opMode] || []
  } else if (algoId === 'stack') {
    activePseudocode = listsPseudocode.stack[opMode] || []
  } else if (algoId === 'queue') {
    activePseudocode = listsPseudocode.queue[opMode] || []
  }

  const getSubModeTabs = () => {
    if (algoId === 'linkedList') {
      return [
        { id: 'insert', label: 'Insert Node' },
        { id: 'delete', label: 'Delete Value' },
      ]
    } else if (algoId === 'stack') {
      return [
        { id: 'push', label: 'Push Value' },
        { id: 'pop', label: 'Pop Value' },
      ]
    } else if (algoId === 'queue') {
      return [
        { id: 'enqueue', label: 'Enqueue Value' },
        { id: 'dequeue', label: 'Dequeue Value' },
      ]
    }
    return []
  }

  const handleCategorySwitch = (id) => {
    setAlgoId(id)
    if (id === 'linkedList') setOpMode('insert')
    if (id === 'stack') setOpMode('push')
    if (id === 'queue') setOpMode('enqueue')
  }

  return (
    <div className="module-page">
      <div className="module-header">
        <div className="module-eyebrow">🔗 Linear Structures</div>
        <h2 className="module-title">{ALGOS[algoId].label}</h2>
        <p className="module-desc">
          Step through dynamic memory pointer linking, LIFO stack push/pop frames, and FIFO queue buffering.
        </p>
      </div>

      {/* Tabs */}
      <div className="module-tabs" role="tablist">
        {Object.entries(ALGOS).map(([id, item]) => (
          <button
            key={id}
            role="tab"
            aria-selected={algoId === id}
            className={`module-tab ${algoId === id ? 'active' : ''}`}
            onClick={() => handleCategorySwitch(id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="module-tabs sub-tabs" role="tablist">
        {getSubModeTabs().map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={opMode === tab.id}
            className={`module-tab ${opMode === tab.id ? 'active' : ''}`}
            onClick={() => setOpMode(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="module-body">
        {/* ── LEFT: Canvas & Playback ─────────────────── */}
        <div className="viz-canvas-area">
          <div className="viz-canvas-hero" style={{ position: 'relative' }}>
            {algoId === 'linkedList' ? (
              <LinkedListRenderer
                list={currentList}
                activeId={activeNodeId}
              />
            ) : algoId === 'stack' ? (
              <StackRenderer
                stack={currentArray}
                highlighted={highlighted}
              />
            ) : (
              <QueueRenderer
                queue={currentArray}
                highlighted={highlighted}
              />
            )}
          </div>

          <div className="viz-playback-section">
            <PlaybackControls playback={playback} />
          </div>

          <div className="viz-step-section">
            {currentFrame ? (
              <>
                <div className="step-bar-desc">
                  {currentFrame.action === 'INSERT_NODE' && '➕ '}
                  {currentFrame.action === 'POP' && '📤 '}
                  {currentFrame.action === 'PUSH' && '📥 '}
                  {currentFrame.action === 'ENQUEUE' && '📥 '}
                  {currentFrame.action === 'DEQUEUE' && '📤 '}
                  {currentFrame.description}
                </div>
                {currentFrame.explanation && (
                  <div className="step-bar-explain">{currentFrame.explanation}</div>
                )}
              </>
            ) : (
              <div className="step-bar-explain" style={{ color: 'var(--text-muted)' }}>
                Select an operation and click to begin.
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Info Panel ──────────────────────────────── */}
        <div className="viz-info-panel">
          <div className="viz-controls-section">
            <div className="section-label">Execution Controls</div>
            {['pop', 'dequeue'].includes(opMode) ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isPlaying || currentArray.length === 0}
                  style={{ width: '100%' }}
                >
                  🚀 Remove Next ({opMode.toUpperCase()})
                </button>
              </div>
            ) : (
              <InputPanel
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSubmit}
                onSelectPreset={handleLoadPreset}
                placeholder="Enter value(s) (e.g. 15 or 10, 20, 30)"
                label="ELEMENT VALUE"
                buttonText={opMode.toUpperCase()}
                presets={presets.lists}
                disabled={isPlaying}
              />
            )}
          </div>

          <div className="viz-code-section">
            <div className="section-label">Pseudocode</div>
            <PseudocodePanel
              pseudocode={{ javascript: activePseudocode }}
              codeLineIndex={currentFrame?.codeLineIndex ?? -1}
            />
          </div>

          <div className="viz-state-section">
            <div className="section-label">State</div>
            <StateInspector
              metrics={currentFrame?.metrics}
              stateSnapshot={currentFrame?.stateSnapshot}
            />
          </div>

          <div className="viz-complexity-section">
            <div className="section-label">Complexity</div>
            <ComplexityCard complexity={complexities[algoId]} />
          </div>
        </div>
      </div>
    </div>
  )
}
