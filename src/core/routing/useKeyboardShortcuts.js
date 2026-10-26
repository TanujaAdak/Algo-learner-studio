/**
 * useKeyboardShortcuts.js
 *
 * Global keyboard shortcuts for the app.
 *
 * Shortcuts:
 *   ?          → show help overlay
 *   Escape     → close overlay / go to dashboard
 *   Ctrl+K     → open command palette (future)
 *   Alt+←      → browser back
 */

import { useEffect } from 'react'

export default function useKeyboardShortcuts({ onDashboard, onToggleHelp, onEscape, onToggleSound }) {
  useEffect(() => {
    const handler = (e) => {
      // Ignore when typing in input fields or contenteditable elements
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return

      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        onToggleHelp?.()
      }

      if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        onToggleSound?.()
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        if (onEscape) {
          onEscape()
        } else {
          onDashboard?.()
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onDashboard, onToggleHelp, onEscape, onToggleSound])
}
