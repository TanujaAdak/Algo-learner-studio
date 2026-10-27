# 🎓 Algo Learner Studio

> **Your interactive studio for mastering Data Structures & Algorithms.**  
> Step-by-step animations, synchronized pseudocode execution, real-time audio feedback, and deep complexity analysis.

[![Live Demo on Vercel](https://img.shields.io/badge/Live%20Demo-Visit%20Studio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://algo-learner-studio.vercel.app)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![CSS3](https://img.shields.io/badge/CSS3-Design%20System-blueviolet?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-14%20Passing-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

🌐 **Live Demo:** [https://algo-learner-studio.vercel.app](https://algo-learner-studio.vercel.app)

---

## 🌟 Highlights & Features

* 🎬 **Interactive Playback Engine:** Play, pause, step forward/backward, and scrub through algorithm execution. Granular speed multipliers from **0.25× to 2.0×** with calibrated pacing (**900ms** base delay).
* 🎨 **Multi-Theme Design System:** Switch instantly between 4 developer-grade dark themes in the TopBar:
  * **GitHub Dark** *(Emerald Mint accent)*
  * **Tokyo Night** *(Electric Cyan & Indigo)*
  * **Catppuccin Mocha** *(Warm Espresso & Mauve)*
  * **Nord Frost** *(Arctic Slates & Glacier Blue)*  
  *(Preferences automatically saved to `localStorage`)*
* 🔊 **Web Audio Synthesizer:** Real-time programmatic sound synthesis with zero external audio assets. Produces pitch-scaled sine/triangle chimes for comparisons, harmonic swaps, balancing rotations, and completion fanfares. Toggle anytime with the **🔊/🔇 button** or press **`M`**.
* 🧠 **Synchronized Pseudocode Execution:** The exact line of pseudocode currently executing is highlighted in real-time alongside the visualization without layout shifts.
* 📊 **Big-O Complexity Cards:** Instant breakdown of Best, Average, Worst Time Complexity, and Space Complexity for every algorithm.
* 🔬 **State Inspector:** Live inspection of variable pointers, recursion states, partition ranges, and active memory frames.
* ⚡ **Fluid Micro-Animations:** Dynamic spring transforms, illuminated pulsing halos, smooth SVG edge morphing, and bouncing pieces built purely in CSS.
* ⌨️ **Full Keyboard Navigation:** Control the entire studio from your keyboard without touching your mouse.

---

## 📚 Algorithms Covered

### 🌳 Trees & Indexes
| Algorithm | Key Visual Features |
|---|---|
| **Binary Search Tree (BST)** | Insertion, Search, Deletion with subtree preservation, Inorder traversal |
| **AVL Tree** | Self-balancing tree with animated **LL, RR, LR, and RL** rotations and live balance factors |
| **Min / Max Heap** | Heapify-up & Heapify-down with dual tree + array mapping |
| **Trie (Prefix Tree)** | Prefix insertion, word search, and deletion with active path lighting |
| **B-Tree (Database Index)** | Database index visualization with node splitting and block traversal |

### ⚡ Sorting Algorithms
| Algorithm | Key Visual Features |
|---|---|
| **Bubble Sort** | Adjacent comparisons, springy lift transforms, and trailing sorted markers |
| **Selection Sort** | Unsorted range scanning, minimum element tracker, and placement |
| **Insertion Sort** | Subarray shifting, insertion position search, and clean insertion |
| **Merge Sort** | Divide-and-conquer recursion tree, auxiliary array buffer, and merging |
| **Quick Sort** | Pivot selection, partition pointers ($i, j$), and recursive divide |
| **Heap Sort** | Max-heap building, root extraction, and array shrinking |
| **⚔️ Compare Sorts (Race)** | Run algorithms side-by-side on the exact same array with live swap/comparison counters |

### 🕸️ Graph Algorithms
| Algorithm | Key Visual Features |
|---|---|
| **Breadth-First Search (BFS)** | Layer-by-layer frontier expansion, queue state, visited node rings |
| **Depth-First Search (DFS)** | Deep branch exploration, recursion call-stack tracking, backtrack paths |
| **Dijkstra's Algorithm** | Shortest path relaxation, priority queue tracking, live distance table |

### 🧩 Dynamic Programming
| Algorithm | Key Visual Features |
|---|---|
| **Fibonacci Sequence** | Memoization vs. bottom-up tabulation with cell dependency pointers |
| **Longest Common Subsequence (LCS)** | 2D dynamic programming grid matrix with match/mismatch backtracking |

### 🔗 Lists, Stacks & Queues
| Structure | Key Visual Features |
|---|---|
| **Singly Linked List** | Head pointer, node insertion, deletion, and pointer link updates |
| **Stack** | LIFO (Last-In, First-Out) push and pop animations |
| **Queue** | FIFO (First-In, First-Out) enqueue and dequeue animations |

### #️⃣ Hashing & Backtracking
| Structure / Problem | Key Visual Features |
|---|---|
| **Hash Table** | Separate Chaining (overflow buckets) and Open Addressing (linear probing) |
| **N-Queens Problem** | Backtracking chessboard with animated queen drops, threat detection, and conflict wobbles |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| <kbd>Space</kbd> | Toggle Play / Pause |
| <kbd>→</kbd> | Step Forward (1 frame) |
| <kbd>←</kbd> | Step Backward (1 frame) |
| <kbd>Shift</kbd> + <kbd>→</kbd> | Jump to End |
| <kbd>Shift</kbd> + <kbd>←</kbd> | Jump to Beginning |
| <kbd>M</kbd> | Toggle Audio Sound (Mute / Unmute) |
| <kbd>?</kbd> | Open Shortcuts & Help Overlay |
| <kbd>Esc</kbd> | Close Help Modal / Return to Dashboard |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* [npm](https://www.npmjs.com/)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TanujaAdak/algo-learner-studio.git
   cd algo-learner-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at **http://localhost:5173/**.

4. **Run automated test suite:**
   ```bash
   npm test
   ```
   Runs native Node.js tests verifying algorithms, sound synthesizer, and multi-theme design tokens.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React 18, Vite 5
* **Styling:** Pure Vanilla CSS Design System with customized CSS variables, HSL color tokens, and spring physics (Zero Tailwind / Zero runtime CSS overhead)
* **Audio:** Web Audio API (`SoundEngine.js`)
* **Testing:** Native Node.js test runner (`node:test`, `node:assert/strict`)
* **Bundle:** Super-fast build in ~500ms producing optimized gzipped assets

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
