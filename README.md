# AlgoVision — Interactive Sorting & Complexity Engine 📊

A modern, high-performance algorithm visualizer designed to demystify sorting mechanics, pointer movements, and asymptotic complexity analysis through interactive audio-visual feedback.

🔗 Live Demo: Coming Soon 

---

##  Overview

Sorting algorithms are fundamental to computer science, but abstract Big-O notation often masks how these algorithms behave in real time. **AlgoVision** bridges the gap between theoretical data structures and visual intuition by rendering real-time comparisons, swaps, partitions, and heap reconstructions with dynamic audio-frequency telemetry.

---

##  Algorithm & Complexity Matrix

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | In-Place? | Key Paradigm |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes | Sinking / Comparison |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | No | Yes | Minimum Element Selection |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes | Yes | Incremental Insertion |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes | No | Divide & Conquer |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No | Yes | Lomuto Partitioning |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No | Yes | Complete Binary Heap |

---

## ⚙️ Engineering & Architecture Decisions

1. **Decoupled Animation Engine:**  
   Algorithmic computation is completely separated from React's render lifecycle. Algorithms act as pure functions that return an ordered queue of animation events (`compare`, `swap`, `overwrite`, `pivot`, `sorted`), preventing UI thrashing and memory leaks.
2. **Non-Blocking Async Playback:**  
   Visual step iterations run through an asynchronous dispatch loop managed by mutable React refs (`useRef`). This ensures instantaneous cancellation on reset or array re-generation without stale state artifacts.
3. **Multimodal Audio Telemetry:**  
   Integrated with the native **Web Audio API** (`OscillatorNode` & `GainNode`). Each element magnitude maps dynamically to audio frequencies ($150\text{Hz} - 900\text{Hz}$), enabling auditory verification of sort progression.
4. **Adaptive Bar Layout:**  
   Responsive bar scaling with automatic numeric labels when sample size $\le 35$, transitioning to dense visual bars for higher data volumes.

---

## ✨ Features

- **6 Core Sorting Algorithms:** Comprehensive coverage of both quadratic $O(n^2)$ and sub-quadratic $O(n \log n)$ algorithms.
- **Color-Coded Visual States:**
  -  **Default:** Unsorted elements
  -  **Comparing:** Active comparison operations
  -  **Swapping / Overwrite:** In-place element exchange
  -  **Pivot:** Quick Sort partition anchor
  -  **Sorted:** Formally locked sorted positions
- **Live Execution Analytics:** Real-time metrics counting total comparisons and swaps performed.
- **Granular Controls:** Real-time array size slider (10 to 80 elements) and execution speed adjuster (5ms to 120ms).

---

##  Tech Stack

- **Frontend:** React 19 (Vite)
- **Styling:** Tailwind CSS v4
- **Audio Synthesis:** Web Audio API
- **Icons:** Lucide React

---

##  Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Dhiraj-student-101/sorting-visualizer.git
cd sorting-visualizer

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

##  Project Roadmap

-  Sorting Algorithm Suite
-  (Bubble, Selection, Insertion, Merge, Quick, Heap)



## 👨‍💻 Author

**Dhiraj Kumar**  
- **GitHub:** [@Dhiraj-student-101](https://github.com/Dhiraj-student-101)  
- **LinkedIn:** [dhiraj-kumar](https://linkedin.com/in/dhiraj-kumar)
