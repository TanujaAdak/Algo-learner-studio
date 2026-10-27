<div align="center">

# 🎓 Algo Learner Studio

**An interactive studio for mastering Data Structures & Algorithms.**  
Step-by-step visual animations, synchronized pseudocode execution, real-time audio synthesis, and deep complexity analysis.

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-algo--learner--studio.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://algo-learner-studio.vercel.app)

<br />

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tests](https://img.shields.io/badge/Tests-14%20Passing-22c55e?style=flat-square)](test/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## 🌟 Key Features

* **🎬 Interactive Playback Engine:** Play, pause, step forward/backward, and scrub with granular speed control (**0.25× to 2.0×**).
* **🎨 4 Developer Themes:** Instant toggle between **GitHub Dark**, **Tokyo Night**, **Catppuccin Mocha**, and **Nord Frost**.
* **🔊 Web Audio Synthesizer:** Real-time audio feedback with pitch-scaled chimes for comparisons, swaps, and tree rotations.
* **🧠 Synced Pseudocode:** Dynamic line-by-line highlight linked directly to the running algorithm step.
* **📊 Live Big-O Complexity:** Instant breakdown of Time (Best/Avg/Worst) and Space complexity.
* **🔬 State Inspector:** Real-time inspection of active variables, pointers, and call stack frames.
* **⌨️ Keyboard First:** Complete keyboard navigation for seamless learning without touching a mouse.

---

## 📚 Supported Algorithms & Data Structures

| Category | Algorithms / Structures | Key Highlights |
| :--- | :--- | :--- |
| **🌳 Trees & Indexes** | BST, AVL Tree, Min/Max Heap, Trie, B-Tree | Animated rotations (LL, RR, LR, RL), dual tree+array heap views, and database indexing |
| **⚡ Sorting** | Bubble, Selection, Insertion, Merge, Quick, Heap | Compare Sorts (side-by-side race mode), real-time swap/comparison telemetry |
| **🕸️ Graphs** | BFS, DFS, Dijkstra's Algorithm | Shortest path relaxation, frontier expansion, and live distance table |
| **🧩 Dynamic Programming** | Fibonacci, Longest Common Subsequence (LCS) | Memoization vs. tabulation, 2D matrix backtracks |
| **🔗 Lists & Stacks** | Singly Linked List, Stack, Queue | Pointer manipulation, LIFO and FIFO visualizations |
| **#️⃣ Hashing & Backtracking** | Hash Table, N-Queens Problem | Separate chaining, linear probing, and conflict resolution |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
| :--- | :--- |
| <kbd>Space</kbd> | Play / Pause animation |
| <kbd>→</kbd> / <kbd>←</kbd> | Step forward / backward by 1 frame |
| <kbd>Shift</kbd> + <kbd>→</kbd> / <kbd>←</kbd> | Jump to end / beginning |
| <kbd>M</kbd> | Toggle sound audio on / off |
| <kbd>?</kbd> | Open Keyboard Shortcuts & Help overlay |
| <kbd>Esc</kbd> | Close overlay / Return to Dashboard |

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/TanujaAdak/Algo-learner-studio.git
cd Algo-learner-studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open **http://localhost:5173/** in your browser.

### 4. Run tests
```bash
npm test
```

---

## 🛠️ Built With

* **Frontend:** [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
* **Styling:** Vanilla CSS Design System with custom design tokens & smooth micro-animations
* **Audio Engine:** Web Audio API (real-time zero-dependency sound synthesis)
* **Testing:** Native Node.js test runner (`node:test`, `node:assert/strict`)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
