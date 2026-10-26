/**
 * Dashboard.jsx
 *
 * Professional DSA curriculum starting point.
 * Provides organized category sections, concise algorithmic explanations,
 * tag previews, and clean navigation into every visualizer module.
 */

const CATEGORIES = [
  {
    id: 'trees',
    icon: '🌳',
    title: 'Trees & Indexes',
    desc: 'Self-balancing binary trees, prefix lookups, priority heap structures, and database storage indexes.',
    color: 'var(--cat-trees)',
    count: 5,
    tags: ['BST', 'AVL Tree', 'Binary Heap', 'Trie', 'B+ Tree'],
    firstChild: 'bst',
  },
  {
    id: 'sorting',
    icon: '⚡',
    title: 'Sorting Algorithms',
    desc: 'Compare comparisons, swaps, partitions, and recursion depth across classic comparison sorts.',
    color: 'var(--cat-sorting)',
    count: 6,
    tags: ['Bubble', 'Selection', 'Insertion', 'Merge', 'Quick', 'Heap Sort'],
    firstChild: 'bubble',
  },
  {
    id: 'graphs',
    icon: '🕸️',
    title: 'Graph Algorithms',
    desc: 'Traverse networks with queue layer frontiers, call stacks, and greedy minimum priority queues.',
    color: 'var(--cat-graphs)',
    count: 3,
    tags: ['BFS', 'DFS', 'Dijkstra'],
    firstChild: 'bfs',
  },
  {
    id: 'dp',
    icon: '🧩',
    title: 'Dynamic Programming',
    desc: 'Break overlapping subproblems into tabulated cache matrices and bottom-up dependency tables.',
    color: 'var(--cat-dp)',
    count: 2,
    tags: ['Fibonacci Tabulation', 'LCS 2D Matrix'],
    firstChild: 'fibonacci',
  },
  {
    id: 'lists',
    icon: '🔗',
    title: 'Linked Structures',
    desc: 'Pointer allocation, node chaining, LIFO stack operations, and FIFO queue buffering.',
    color: 'var(--cat-lists)',
    count: 3,
    tags: ['Singly Linked List', 'Stack', 'Queue'],
    firstChild: 'linked-list',
  },
  {
    id: 'hashing',
    icon: '#️⃣',
    title: 'Hashing & Tables',
    desc: 'Map keys to table buckets, handle collisions via chaining, or probe linearly with open addressing.',
    color: 'var(--cat-hashing)',
    count: 2,
    tags: ['Separate Chaining', 'Linear Probing'],
    firstChild: 'hash-chain',
  },
  {
    id: 'backtracking',
    icon: '🔙',
    title: 'Backtracking',
    desc: 'Systematically search combinatorial solution spaces, pruning branches on constraint conflict.',
    color: 'var(--cat-backtrack)',
    count: 1,
    tags: ['N-Queens Constraint Satisfaction'],
    firstChild: 'nqueens',
  },
  {
    id: 'database',
    icon: '🗄️',
    title: 'Database Internals',
    desc: 'Execute real SQL queries against an in-memory B+ Tree index with leaf chain linking.',
    color: 'var(--cat-db)',
    count: 1,
    tags: ['B+ Tree Index', 'SQL Parser', 'Query Plan'],
    firstChild: 'database',
  },
]

/**
 * @param {{ onNavigate: (id: string) => void }} props
 */
export default function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard">
      {/* Hero Introduction */}
      <section className="dashboard-hero">
        <div className="dashboard-eyebrow">
          <span>●</span> Interactive DSA Learning Environment
        </div>
        <h1 className="dashboard-title">
          Algo Learner Studio — Universal DSA Visualizer
        </h1>
        <p className="dashboard-subtitle">
          Your interactive studio for mastering Data Structures &amp; Algorithms. Explore step-by-step
          visualizations, line-by-line pseudocode execution, audio feedback, and complexity analysis.
        </p>
      </section>

      {/* Category Module Cards */}
      <section aria-labelledby="curriculum-heading">
        <div className="dashboard-section-title" id="curriculum-heading">
          <span>Core Algorithm Modules</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Select any module to open workspace</span>
        </div>

        <div className="dashboard-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="cat-card"
              onClick={() => onNavigate(cat.firstChild)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate(cat.firstChild)}
              aria-label={`Open ${cat.title} module`}
            >
              <div className="cat-card-header">
                <div className="cat-card-icon" style={{ color: cat.color }}>
                  {cat.icon}
                </div>
                <span className="cat-card-count">{cat.count} visualizers</span>
              </div>
              <h2 className="cat-card-title">{cat.title}</h2>
              <p className="cat-card-desc">{cat.desc}</p>
              <div className="cat-card-tags">
                {cat.tags.map((tag) => (
                  <span key={tag} className="cat-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & Workflow */}
      <section aria-labelledby="pipeline-heading">
        <div className="dashboard-section-title" id="pipeline-heading">
          Execution Engine Pipeline
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
          }}
        >
          {[
            {
              step: '01',
              title: 'Custom Input',
              desc: 'Provide your own numbers, words, or graph vertices — or select curated edge-case presets.',
            },
            {
              step: '02',
              title: 'Event Recording',
              desc: 'Pure algorithm routines execute and emit discrete events (compare, swap, rotate, backtrack).',
            },
            {
              step: '03',
              title: 'Frame Generation',
              desc: 'Events are reduced into complete state snapshots with educational descriptions and code line indices.',
            },
            {
              step: '04',
              title: 'Synchronized Playback',
              desc: 'Step forward and backward, adjust playback speed, and inspect variable snapshots in real time.',
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)',
                    background: 'var(--accent-dim)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  {step}
                </span>
                <span style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--text-primary)' }}>
                  {title}
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
