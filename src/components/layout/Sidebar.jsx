/**
 * Sidebar.jsx
 *
 * Professional developer navigation sidebar.
 * Organizes DSA categories, tracks active modules, marks coming soon modules,
 * and supports responsive mobile drawer toggle.
 */

import { useState } from 'react'

/** Full navigation tree */
const NAV = [
  {
    category: 'Trees & Indexes',
    items: [
      {
        id: 'trees',
        icon: '🌳',
        label: 'Binary Trees',
        color: 'var(--cat-trees)',
        badge: '5',
        children: [
          { id: 'bst',      label: 'Binary Search Tree' },
          { id: 'avl',      label: 'AVL Tree (Self-Balancing)' },
          { id: 'heap',     label: 'Min / Max Heap' },
          { id: 'trie',     label: 'Trie (Prefix Tree)' },
          { id: 'database', label: 'B+ Tree (SQL Internals)' },
        ],
      },
    ],
  },
  {
    category: 'Algorithms',
    items: [
      {
        id: 'sorting',
        icon: '⚡',
        label: 'Sorting Algorithms',
        color: 'var(--cat-sorting)',
        badge: '6',
        children: [
          { id: 'bubble',    label: 'Bubble Sort' },
          { id: 'selection', label: 'Selection Sort' },
          { id: 'insertion', label: 'Insertion Sort' },
          { id: 'merge',     label: 'Merge Sort' },
          { id: 'quick',     label: 'Quick Sort' },
          { id: 'heapsort',  label: 'Heap Sort' },
        ],
      },
      {
        id: 'graphs',
        icon: '🕸️',
        label: 'Graph Algorithms',
        color: 'var(--cat-graphs)',
        badge: '5',
        children: [
          { id: 'bfs',       label: 'Breadth-First Search (BFS)' },
          { id: 'dfs',       label: 'Depth-First Search (DFS)' },
          { id: 'dijkstra',  label: "Dijkstra's Shortest Path" },
          { id: 'prim',      label: "Prim's MST", comingSoon: true },
          { id: 'kruskal',   label: "Kruskal's MST", comingSoon: true },
        ],
      },
      {
        id: 'dp',
        icon: '🧩',
        label: 'Dynamic Programming',
        color: 'var(--cat-dp)',
        badge: '4',
        children: [
          { id: 'fibonacci',   label: 'Fibonacci Tabulation' },
          { id: 'lcs',         label: 'Longest Common Subsequence' },
          { id: 'knapsack',    label: '0/1 Knapsack', comingSoon: true },
          { id: 'coin-change', label: 'Coin Change', comingSoon: true },
        ],
      },
      {
        id: 'backtracking',
        icon: '🔙',
        label: 'Backtracking',
        color: 'var(--cat-backtrack)',
        badge: '3',
        children: [
          { id: 'nqueens', label: 'N-Queens Problem' },
          { id: 'sudoku',  label: 'Sudoku Solver', comingSoon: true },
          { id: 'maze',    label: 'Maze Pathfinder', comingSoon: true },
        ],
      },
    ],
  },
  {
    category: 'Linear & Hash Structures',
    items: [
      {
        id: 'lists',
        icon: '🔗',
        label: 'Linked Structures',
        color: 'var(--cat-lists)',
        badge: '3',
        children: [
          { id: 'linked-list', label: 'Singly Linked List' },
          { id: 'stack',       label: 'Stack (LIFO)' },
          { id: 'queue',       label: 'Queue (FIFO)' },
        ],
      },
      {
        id: 'hashing',
        icon: '#️⃣',
        label: 'Hashing & Tables',
        color: 'var(--cat-hashing)',
        badge: '2',
        children: [
          { id: 'hash-chain',  label: 'Separate Chaining' },
          { id: 'hash-open',   label: 'Open Addressing (Linear)' },
        ],
      },
    ],
  },
]

/**
 * @param {{
 *   activeModule: string,
 *   onNavigate: (id: string) => void,
 *   mobileOpen?: boolean,
 *   onCloseMobile?: () => void
 * }} props
 */
export default function Sidebar({ activeModule, onNavigate, mobileOpen = false, onCloseMobile }) {
  const [openGroups, setOpenGroups] = useState({ trees: true, sorting: true, graphs: true, lists: true, dp: true, backtracking: true, hashing: true })
  const [search, setSearch] = useState('')

  const toggleGroup = (id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSelect = (id) => {
    onNavigate(id)
    onCloseMobile?.()
  }

  const query = search.toLowerCase().trim()

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
      {/* Brand Header */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark" onClick={() => handleSelect('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="sidebar-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3" />
              <circle cx="6" cy="19" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M12 8v4" />
              <path d="M12 12l-4 4" />
              <path d="M12 12l4 4" />
            </svg>
          </div>
          <div>
            <div className="sidebar-logo-text" style={{ fontSize: 14.5, whiteSpace: 'nowrap' }}>Algo Learner Studio</div>
            <div className="sidebar-logo-sub">DSA Visualizer</div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Filter algorithms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Filter algorithms"
        />
      </div>

      {/* Navigation Tree */}
      <nav className="sidebar-nav" aria-label="Algorithms navigation">
        {/* Dashboard Link */}
        <div
          className={`sidebar-item ${activeModule === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleSelect('dashboard')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleSelect('dashboard')}
          aria-current={activeModule === 'dashboard' ? 'page' : undefined}
        >
          <span className="sidebar-item-icon">⚡</span>
          <span className="sidebar-item-label">Dashboard Overview</span>
        </div>

        {/* Grouped Modules */}
        {NAV.map(({ category, items }) => {
          const visibleItems = query
            ? items.filter(
                (item) =>
                  item.label.toLowerCase().includes(query) ||
                  item.children?.some((c) => c.label.toLowerCase().includes(query))
              )
            : items

          if (visibleItems.length === 0) return null

          return (
            <div key={category}>
              <div className="sidebar-category">{category}</div>

              {visibleItems.map((item) => {
                const isOpen = !!openGroups[item.id]
                const hasChildren = item.children && item.children.length > 0
                const isGroupActive = activeModule === item.id || item.children?.some((c) => c.id === activeModule)

                const visibleChildren = query
                  ? item.children?.filter((c) => c.label.toLowerCase().includes(query))
                  : item.children

                return (
                  <div key={item.id}>
                    <div
                      className={`sidebar-item ${isGroupActive && !hasChildren ? 'active' : ''}`}
                      onClick={() => {
                        if (hasChildren) {
                          toggleGroup(item.id)
                        } else {
                          handleSelect(item.id)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && (hasChildren ? toggleGroup(item.id) : handleSelect(item.id))}
                      aria-expanded={hasChildren ? isOpen : undefined}
                    >
                      <span className="sidebar-item-icon">
                        {item.icon}
                      </span>
                      <span className="sidebar-item-label">{item.label}</span>
                      {hasChildren && (
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4 }}>
                          {isOpen ? '▾' : '▸'}
                        </span>
                      )}
                    </div>

                    {hasChildren && (
                      <div className={`sidebar-sub-items ${isOpen || query ? 'open' : ''}`}>
                        {visibleChildren?.map((child) => (
                          <div
                            key={child.id}
                            className={`sidebar-sub-item ${activeModule === child.id ? 'active' : ''}`}
                            onClick={() => handleSelect(child.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleSelect(child.id)}
                            aria-current={activeModule === child.id ? 'page' : undefined}
                          >
                            <span>{child.label}</span>
                            {child.comingSoon && (
                              <span className="sidebar-soon-chip">Soon</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
