import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import BST from '../src/modules/trees/bst/BST.js'
import AVL from '../src/modules/trees/avl/AVL.js'
import { runBFS } from '../src/modules/graphs/algorithms/bfs.js'
import { runDFS } from '../src/modules/graphs/algorithms/dfs.js'
import { runDijkstra } from '../src/modules/graphs/algorithms/dijkstra.js'
import { runNQueens } from '../src/modules/backtracking/algorithms/nqueens.js'

describe('BST Algorithm & Frame Generation', () => {
  it('should keep full tree intact during node insertion and deletion', () => {
    const bst = new BST()
    bst.insert(50)
    bst.insert(30)
    bst.insert(70)
    bst.insert(20)
    bst.insert(40)

    const insertFrames = bst.insert(60)
    assert.ok(insertFrames.length > 0)
    // The last frame of insert must have all 6 nodes in its stateSnapshot.root
    const lastInsert = insertFrames[insertFrames.length - 1]
    assert.ok(lastInsert.stateSnapshot?.root)
    assert.equal(lastInsert.stateSnapshot.root.key, 50)
    assert.equal(lastInsert.stateSnapshot.root.left.key, 30)
    assert.equal(lastInsert.stateSnapshot.root.right.key, 70)

    const deleteFrames = bst.delete(30)
    assert.ok(deleteFrames.length > 0)
    // Deletion frames should preserve the root (50) and right subtree (70, 60)
    for (const frame of deleteFrames) {
      if (frame.stateSnapshot?.root) {
        assert.equal(frame.stateSnapshot.root.key, 50, 'Root node must remain 50 throughout deletion frames')
        assert.ok(frame.stateSnapshot.root.right, 'Right child must remain present')
      }
    }
  })
})

describe('AVL Balancing & Frame Generation', () => {
  it('should balance and generate frames without isolating inserted nodes', () => {
    const avl = new AVL()
    avl.insert(10)
    avl.insert(20)
    const frames = avl.insert(30) // causes rotation
    assert.ok(frames.length > 0)
    const lastFrame = frames[frames.length - 1]
    assert.ok(lastFrame.stateSnapshot?.root)
    // In AVL after 10, 20, 30, root should be 20 with children 10 and 30
    assert.equal(lastFrame.stateSnapshot.root.key, 20)
    assert.equal(lastFrame.stateSnapshot.root.left.key, 10)
    assert.equal(lastFrame.stateSnapshot.root.right.key, 30)
  })
})

describe('Graph Algorithms with Boundary & Disconnected Nodes', () => {
  const nodes = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
  // Edge referencing undefined node 99 and disconnected node 3
  const edges = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 99, weight: 1 }, // invalid edge endpoint
    { from: 1, to: 2, weight: 2 },
  ]

  it('runBFS handles disconnected and invalid edges gracefully', () => {
    const frames = runBFS(nodes, edges, 0)
    assert.ok(frames.length > 0)
    const visited = frames[frames.length - 1].stateSnapshot.visited
    assert.ok(visited.includes(0))
    assert.ok(visited.includes(1))
    assert.ok(visited.includes(2))
    assert.ok(!visited.includes(3), 'Node 3 should remain unvisited')
  })

  it('runDFS handles disconnected and invalid edges gracefully', () => {
    const frames = runDFS(nodes, edges, 0)
    assert.ok(frames.length > 0)
    const visited = frames[frames.length - 1].stateSnapshot.visited
    assert.ok(visited.includes(0))
    assert.ok(visited.includes(2))
  })

  it('runDijkstra handles disconnected destination without crashing', () => {
    const frames = runDijkstra(nodes, edges, 0, 3)
    assert.ok(frames.length > 0)
    const lastFrame = frames[frames.length - 1]
    assert.ok(lastFrame.description.includes('No path') || lastFrame.description.includes('unreachable') || lastFrame.action === 'DONE')
  })
})

describe('N-Queens Backtracking', () => {
  it('should find all valid solutions for N=4 (2 solutions)', () => {
    const frames = runNQueens(4)
    assert.ok(frames.length > 0)
    const lastFrame = frames[frames.length - 1]
    assert.equal(lastFrame.action, 'DONE')
    assert.equal(lastFrame.stateSnapshot.solutions, 2)
  })
})
