/**
 * TopBar.jsx
 *
 * Global top navigation bar with breadcrumb trail, real-time status pill,
 * Share link generator, and keyboard shortcuts trigger.
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import soundEngine from '../../core/sound/SoundEngine.js'

export const THEMES = [
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    desc: 'Slate & Mint Emerald',
    icon: '🐙',
    swatches: ['#0D1117', '#58D6A3', '#F0F4F8'],
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    desc: 'Indigo & Electric Cyan',
    icon: '🌙',
    swatches: ['#0c0e14', '#7dcfff', '#bb9af7'],
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    desc: 'Warm Espresso & Mauve',
    icon: '☕',
    swatches: ['#181825', '#cba6f7', '#a6e3a1'],
  },
  {
    id: 'nord',
    name: 'Nord Frost',
    desc: 'Arctic Slate & Ice Blue',
    icon: '❄️',
    swatches: ['#242933', '#88c0d0', '#eceff4'],
  },
]

const MODULE_LABELS = {
  dashboard:     { label: 'Dashboard Overview',         category: null },
  bst:           { label: 'Binary Search Tree',         category: 'Trees & Indexes' },
  avl:           { label: 'AVL Tree (Balanced)',        category: 'Trees & Indexes' },
  heap:          { label: 'Min / Max Heap',             category: 'Trees & Indexes' },
  trie:          { label: 'Trie (Prefix Tree)',         category: 'Trees & Indexes' },
  database:      { label: 'B+ Tree (SQL Engine)',       category: 'Trees & Indexes' },
  bubble:        { label: 'Bubble Sort',                category: 'Sorting Algorithms' },
  selection:     { label: 'Selection Sort',             category: 'Sorting Algorithms' },
  insertion:     { label: 'Insertion Sort',             category: 'Sorting Algorithms' },
  merge:         { label: 'Merge Sort',                 category: 'Sorting Algorithms' },
  quick:         { label: 'Quick Sort',                 category: 'Sorting Algorithms' },
  heapsort:      { label: 'Heap Sort',                  category: 'Sorting Algorithms' },
  bfs:           { label: 'Breadth-First Search (BFS)', category: 'Graph Algorithms' },
  dfs:           { label: 'Depth-First Search (DFS)',   category: 'Graph Algorithms' },
  dijkstra:      { label: "Dijkstra's Shortest Path",   category: 'Graph Algorithms' },
  prim:          { label: "Prim's MST",                 category: 'Graph Algorithms' },
  kruskal:       { label: "Kruskal's MST",              category: 'Graph Algorithms' },
  fibonacci:     { label: 'Fibonacci Tabulation',       category: 'Dynamic Programming' },
  lcs:           { label: 'Longest Common Subsequence', category: 'Dynamic Programming' },
  knapsack:      { label: '0/1 Knapsack',               category: 'Dynamic Programming' },
  'coin-change': { label: 'Coin Change',                category: 'Dynamic Programming' },
  'linked-list': { label: 'Singly Linked List',         category: 'Linear Structures' },
  stack:         { label: 'Stack (LIFO)',               category: 'Linear Structures' },
  queue:         { label: 'Queue (FIFO)',               category: 'Linear Structures' },
  'hash-chain':  { label: 'Separate Chaining',          category: 'Hashing & Tables' },
  'hash-open':   { label: 'Open Addressing (Linear)',   category: 'Hashing & Tables' },
  nqueens:       { label: 'N-Queens Backtracking',      category: 'Backtracking' },
  sudoku:        { label: 'Sudoku Solver',              category: 'Backtracking' },
  maze:          { label: 'Maze Pathfinder',            category: 'Backtracking' },
}

/**
 * @param {{
 *   activeModule: string,
 *   status: 'ready'|'running'|'done'|'error',
 *   statusText?: string,
 *   onNavigate: (id: string) => void,
 *   onToggleHelp: () => void,
 *   onToggleMobile?: () => void
 * }} props
 */
export default function TopBar({
  activeModule,
  status = 'ready',
  statusText = '',
  currentTheme = 'github-dark',
  onThemeChange,
  onNavigate,
  onToggleHelp,
  onToggleMobile,
}) {
  const info = MODULE_LABELS[activeModule] || { label: activeModule, category: null }
  const [copied, setCopied] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(() => soundEngine.enabled)
  const themeDropdownRef = useRef(null)

  useEffect(() => {
    return soundEngine.subscribe((val) => setSoundOn(val))
  }, [])

  const currentThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0]

  useEffect(() => {
    if (!themeOpen) return
    const handleClickOutside = (e) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [themeOpen])

  const handleShare = useCallback(() => {
    const url = window.location.href
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    } else {
      const el = document.createElement('input')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        {/* Mobile menu hamburger */}
        <button
          className="topbar-mobile-menu"
          onClick={onToggleMobile}
          aria-label="Toggle navigation menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb navigation */}
        <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
          <span
            className="crumb-root"
            onClick={() => onNavigate('dashboard')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('dashboard')}
          >
            Algo Learner Studio
          </span>

          {info.category && (
            <>
              <span className="crumb-sep">/</span>
              <span className="crumb-category">{info.category}</span>
            </>
          )}

          {activeModule !== 'dashboard' && (
            <>
              <span className="crumb-sep">/</span>
              <span className="crumb-active">{info.label}</span>
            </>
          )}
        </nav>
      </div>

      <div className="topbar-right">
        {statusText && (
          <span className="topbar-status-text" title={statusText}>
            {statusText}
          </span>
        )}

        {/* Real-time Status Pill */}
        <span
          className={`status-pill ${status}`}
          aria-live="polite"
          aria-label={`System status: ${status}`}
        >
          {status === 'ready'   ? 'Ready'   : null}
          {status === 'running' ? 'Running' : null}
          {status === 'done'    ? 'Done'    : null}
          {status === 'error'   ? 'Error'   : null}
        </span>

        {/* Theme Selector */}
        <div className="theme-selector-wrap" ref={themeDropdownRef}>
          <button
            id="theme-switcher-btn"
            className={`theme-toggle-btn ${themeOpen ? 'open' : ''}`}
            onClick={() => setThemeOpen((v) => !v)}
            aria-expanded={themeOpen}
            aria-haspopup="listbox"
            title="Switch color theme"
          >
            <span className="theme-icon">{currentThemeObj.icon}</span>
            <span className="theme-label">{currentThemeObj.name}</span>
            <span className="theme-chevron">▼</span>
          </button>

          {themeOpen && (
            <div className="theme-dropdown" role="listbox" aria-label="Color themes">
              <div className="theme-dropdown-header">Select Theme</div>
              {THEMES.map((t) => {
                const isActive = t.id === currentTheme
                return (
                  <button
                    key={t.id}
                    className={`theme-option ${isActive ? 'active' : ''}`}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onThemeChange?.(t.id)
                      setThemeOpen(false)
                    }}
                  >
                    <div className="theme-option-left">
                      <div className="theme-swatches">
                        {t.swatches.map((color, i) => (
                          <span
                            key={i}
                            className="theme-swatch-dot"
                            style={{ background: color }}
                          />
                        ))}
                      </div>
                      <div className="theme-option-info">
                        <span className="theme-option-name">{t.icon} {t.name}</span>
                        <span className="theme-option-desc">{t.desc}</span>
                      </div>
                    </div>
                    {isActive && <span className="theme-option-check">✓</span>}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Share Button (non-dashboard) */}
        {activeModule !== 'dashboard' && (
          <button
            id="share-link-btn"
            className={`topbar-action-btn ${copied ? 'active' : ''}`}
            onClick={handleShare}
            aria-label="Copy shareable link"
            title="Copy shareable URL to clipboard"
          >
            <span>{copied ? '✓' : '🔗'}</span>
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        )}

        {/* Sound Effects Toggle Button */}
        <button
          id="sound-toggle-btn"
          className={`topbar-help-btn ${soundOn ? 'sound-active' : ''}`}
          onClick={() => soundEngine.toggle()}
          aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
          title={soundOn ? 'Sound effects: On (click to mute)' : 'Sound effects: Muted (click to enable)'}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>

        {/* Shortcuts / Help Button */}
        <button
          id="help-btn"
          className="topbar-help-btn"
          onClick={onToggleHelp}
          aria-label="Keyboard shortcuts (press ?)"
          title="Keyboard shortcuts — press ?"
        >
          ?
        </button>
      </div>
    </header>
  )
}
