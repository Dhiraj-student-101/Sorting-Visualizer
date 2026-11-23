import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sliders, 
  BarChart2, 
  Zap, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
  Clock,
  Database,
  Info
} from 'lucide-react';
import { 
  getBubbleSortAnimations, 
  getSelectionSortAnimations, 
  getInsertionSortAnimations, 
  getMergeSortAnimations, 
  getQuickSortAnimations, 
  getHeapSortAnimations 
} from './algorithms/sortingAlgorithms';
import { algorithmsData } from './data/algorithmsData';

export default function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(30); // in ms
  const [selectedAlgo, setSelectedAlgo] = useState('bubbleSort');
  const [isSorting, setIsSorting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Animation active highlights
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState(new Set());

  // Live Stats
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const isSortingRef = useRef(false);
  const audioCtxRef = useRef(null);

  // Generate new random array
  const generateNewArray = (size = arraySize) => {
    if (isSorting) return;
    const newArr = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 10); // numbers between 10 and 95
    }
    setArray(newArr);
    setComparingIndices([]);
    setSwappingIndices([]);
    setPivotIndex(null);
    setSortedIndices(new Set());
    setComparisons(0);
    setSwaps(0);
  };

  useEffect(() => {
    generateNewArray(arraySize);
  }, [arraySize]);

  // Audio tone generator for visualizer sound
  const playTone = (frequency) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(150 + frequency * 8, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext fallback
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Run Sorting Animation Engine
  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    isSortingRef.current = true;
    setComparingIndices([]);
    setSwappingIndices([]);
    setPivotIndex(null);
    setSortedIndices(new Set());
    setComparisons(0);
    setSwaps(0);

    let animations = [];
    if (selectedAlgo === 'bubbleSort') animations = getBubbleSortAnimations(array);
    else if (selectedAlgo === 'selectionSort') animations = getSelectionSortAnimations(array);
    else if (selectedAlgo === 'insertionSort') animations = getInsertionSortAnimations(array);
    else if (selectedAlgo === 'mergeSort') animations = getMergeSortAnimations(array);
    else if (selectedAlgo === 'quickSort') animations = getQuickSortAnimations(array);
    else if (selectedAlgo === 'heapSort') animations = getHeapSortAnimations(array);

    const arrCopy = [...array];
    let compCount = 0;
    let swapCount = 0;
    const sortedSet = new Set();

    for (let i = 0; i < animations.length; i++) {
      if (!isSortingRef.current) break; // Reset or stopped

      const anim = animations[i];

      if (anim.type === 'compare') {
        setComparingIndices(anim.indices);
        setSwappingIndices([]);
        setPivotIndex(null);
        compCount++;
        setComparisons(compCount);
        playTone(arrCopy[anim.indices[0]] || 40);
      } else if (anim.type === 'swap') {
        const [a, b] = anim.indices;
        setSwappingIndices([a, b]);
        [arrCopy[a], arrCopy[b]] = [arrCopy[b], arrCopy[a]];
        setArray([...arrCopy]);
        swapCount++;
        setSwaps(swapCount);
        playTone(arrCopy[a] || 50);
      } else if (anim.type === 'overwrite') {
        setSwappingIndices([anim.index]);
        arrCopy[anim.index] = anim.value;
        setArray([...arrCopy]);
        swapCount++;
        setSwaps(swapCount);
        playTone(anim.value);
      } else if (anim.type === 'pivot') {
        setPivotIndex(anim.index);
      } else if (anim.type === 'sorted') {
        sortedSet.add(anim.index);
        setSortedIndices(new Set(sortedSet));
        setComparingIndices([]);
        setSwappingIndices([]);
      }

      await sleep(speed);
    }

    setComparingIndices([]);
    setSwappingIndices([]);
    setPivotIndex(null);
    setIsSorting(false);
    isSortingRef.current = false;
  };

  const handleReset = () => {
    isSortingRef.current = false;
    setIsSorting(false);
    generateNewArray(arraySize);
  };

  const currentAlgoData = algorithmsData[selectedAlgo];

  // Helper function for bar color determination
  const getBarColor = (index) => {
    if (sortedIndices.has(index)) return 'bg-emerald-400 shadow-emerald-500/30';
    if (swappingIndices.includes(index)) return 'bg-rose-500 shadow-rose-500/50 scale-105';
    if (comparingIndices.includes(index)) return 'bg-amber-400 shadow-amber-500/50 scale-105';
    if (pivotIndex === index) return 'bg-purple-500 shadow-purple-500/50 scale-105';
    return 'bg-gradient-to-t from-indigo-600 to-cyan-400';
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* 1. TOP NAVBAR */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              AlgoVision — Sorting Visualizer
            </h1>
            <p className="text-xs text-slate-400">Interactive Algorithm Learning & Complexity Suite</p>
          </div>
        </div>

        {/* Algorithm Selection Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 border border-slate-800 rounded-xl">
          {Object.entries(algorithmsData).map(([key, data]) => (
            <button
              key={key}
              disabled={isSorting}
              onClick={() => setSelectedAlgo(key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedAlgo === key
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              } disabled:opacity-50`}
            >
              {data.name}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        
        {/* 2. CONTROLS BAR */}
        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 backdrop-blur shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSort}
              disabled={isSorting}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Start Sort
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition border border-slate-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Array
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                soundEnabled 
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title={soundEnabled ? "Mute Audio" : "Enable Audio Synth"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Sliders: Array Size & Speed */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400">Size: {arraySize}</span>
              <input
                type="range"
                min="10"
                max="80"
                value={arraySize}
                disabled={isSorting}
                onChange={(e) => setArraySize(Number(e.target.value))}
                className="w-28 accent-indigo-500 cursor-pointer disabled:opacity-50"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400">Delay: {speed}ms</span>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-28 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. VISUALIZER BARS STAGE */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative flex flex-col justify-end min-h-[380px] overflow-hidden">
          {/* Color Legend */}
          <div className="absolute top-4 left-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-indigo-600 to-cyan-400 inline-block"></span> Default
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block"></span> Comparing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block"></span> Swapping / Set
            </span>
            {selectedAlgo === 'quickSort' && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-purple-500 inline-block"></span> Pivot
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block"></span> Sorted
            </span>
          </div>

          {/* Bars Display */}
          <div className="flex items-end justify-center gap-1 h-[280px] w-full pt-8">
            {array.map((value, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center flex-1 h-full justify-end"
              >
                {/* Numeric value shown if bars count <= 35 */}
                {arraySize <= 35 && (
                  <span className="text-[10px] font-mono text-slate-400 mb-1">
                    {value}
                  </span>
                )}
                <div
                  style={{ height: `${value}%` }}
                  className={`w-full rounded-t-sm transition-all duration-75 ${getBarColor(idx)}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. ANALYTICS & COMPLEXITY DETAILS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Live Metrics */}
          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Zap className="w-4 h-4" /> Live Execution Metrics
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Comparisons</div>
                <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{comparisons}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Swaps / Writes</div>
                <div className="text-2xl font-mono font-bold text-rose-400 mt-1">{swaps}</div>
              </div>
            </div>
            <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
              <span>Status:</span>
              <span className={`font-semibold ${isSorting ? 'text-amber-400' : sortedIndices.size === array.length ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isSorting ? 'Sorting in progress...' : sortedIndices.size === array.length ? 'Array Sorted!' : 'Ready'}
              </span>
            </div>
          </div>

          {/* Complexity Card */}
          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Clock className="w-4 h-4" /> Time & Space Complexity
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Best</div>
                <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
                  {currentAlgoData.timeComplexity.best}
                </div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Average</div>
                <div className="text-xs font-mono font-bold text-amber-400 mt-1">
                  {currentAlgoData.timeComplexity.average}
                </div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Worst</div>
                <div className="text-xs font-mono font-bold text-rose-400 mt-1">
                  {currentAlgoData.timeComplexity.worst}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
              <span>Auxiliary Space:</span>
              <span className="font-mono font-bold text-cyan-400">{currentAlgoData.spaceComplexity}</span>
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                <Info className="w-4 h-4" /> {currentAlgoData.name} Overview
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentAlgoData.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3 mt-4">
              <span>Stable Algorithm: <b className="text-slate-200">{currentAlgoData.stable}</b></span>
              <span>In-Place: <b className="text-slate-200">{currentAlgoData.inPlace}</b></span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}