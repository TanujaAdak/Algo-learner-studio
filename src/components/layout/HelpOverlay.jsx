/**
 * HelpOverlay.jsx
 *
 * Keyboard shortcut reference modal.
 * Triggered globally via "?" and dismissible via Escape or clicking backdrop.
 */

export default function HelpOverlay({ onClose }) {
  return (
    <div
      className="help-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts and Help"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="help-modal-card">
        {/* Header */}
        <div className="help-modal-header">
          <div>
            <div className="help-modal-eyebrow">KEYBOARD SHORTCUTS</div>
            <h2 className="help-modal-title">Algo Learner Studio Controls</h2>
          </div>
          <button
            className="help-modal-close"
            onClick={onClose}
            aria-label="Close shortcuts overlay"
          >
            ✕
          </button>
        </div>

        {/* Shortcuts List */}
        <div>
          {[
            { keys: ['?'],          label: 'Toggle this keyboard shortcut helper' },
            { keys: ['Esc'],        label: 'Dismiss modal / Return to dashboard' },
            { keys: ['Space'],      label: 'Play / Pause algorithm animation' },
            { keys: ['M'],          label: 'Toggle sound effects on / mute' },
            { keys: ['→'],          label: 'Step forward one execution frame' },
            { keys: ['←'],          label: 'Step backward one execution frame' },
            { keys: ['Shift', '→'], label: 'Jump to final completed frame' },
            { keys: ['Shift', '←'], label: 'Jump to initial frame' },
          ].map(({ keys, label }) => (
            <div key={label} className="help-shortcut-row">
              <span className="help-shortcut-label">{label}</span>
              <div className="help-shortcut-keys">
                {keys.map((k) => (
                  <kbd key={k} className="help-shortcut-key">{k}</kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          <span>Algo Learner Studio — Developer Edition</span>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
