/**
 * ArrayRenderer/index.jsx
 *
 * Visualizes arrays as vertical bar charts.
 * Supports highlighting compared indices, active markers, sorted ranges, and pivot nodes.
 */

import { useMemo } from 'react'

/**
 * @param {{
 *   values: number[],
 *   highlighted?: number[], // active pointers
 *   compared?: number[],    // currently compared items
 *   sorted?: number[],      // indices marked as sorted
 *   pivot?: number | null   // pivot element index
 * }} props
 */
export default function ArrayRenderer({
  values = [],
  highlighted = [],
  compared = [],
  sorted = [],
  pivot = null,
}) {
  const { minVal, range } = useMemo(() => {
    if (values.length === 0) return { minVal: 0, range: 1 }
    const min = Math.min(...values)
    const max = Math.max(...values)
    const minVal = min < 0 ? min : 0
    const maxVal = max > 0 ? max : 1
    const range = maxVal - minVal || 1
    return { minVal, range }
  }, [values])

  if (!values || values.length === 0) {
    return (
      <div className="array-renderer" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-muted)', margin: 'auto' }}>No array loaded.</div>
      </div>
    )
  }

  return (
    <div className="array-renderer" role="list" aria-label="Array values visualization">
      {values.map((val, idx) => {
        const heightPercent = Math.max(8, Math.min(100, Math.round(((val - minVal) / range) * 100)))

        const isHighlighted = highlighted.includes(idx)
        const isCompared = compared.includes(idx)
        const isSorted = sorted.includes(idx)
        const isPivot = pivot === idx

        let barClass = 'array-bar'
        let wrapClass = 'array-bar-wrap'
        if (isHighlighted) {
          barClass += ' active'
          wrapClass += ' is-active'
        } else if (isPivot) {
          barClass += ' pivot'
          wrapClass += ' is-pivot'
        } else if (isCompared) {
          barClass += ' compared'
          wrapClass += ' is-compared'
        } else if (isSorted) {
          barClass += ' sorted'
          wrapClass += ' is-sorted'
        }

        return (
          <div key={idx} className={wrapClass} role="listitem">
            {/* Value Label above bar */}
            <span className="array-bar-value">{val}</span>

            {/* Scaled Bar */}
            <div
              className={barClass}
              style={{ height: `${heightPercent}%` }}
              title={`Index ${idx}: ${val}`}
            />

            {/* Index Label below bar */}
            <span className="array-bar-index">{idx}</span>
          </div>
        )
      })}
    </div>
  )
}
