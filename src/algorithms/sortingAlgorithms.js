// ==========================================
// 1. BUBBLE SORT
// ==========================================
export function getBubbleSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        animations.push({ type: 'swap', indices: [j, j + 1] });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    animations.push({ type: 'sorted', index: n - i - 1 });
  }
  animations.push({ type: 'sorted', index: 0 });
  return animations;
}

// ==========================================
// 2. SELECTION SORT
// ==========================================
export function getSelectionSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: 'compare', indices: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push({ type: 'swap', indices: [i, minIdx] });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    animations.push({ type: 'sorted', index: i });
  }
  animations.push({ type: 'sorted', index: n - 1 });
  return animations;
}

// ==========================================
// 3. INSERTION SORT
// ==========================================
export function getInsertionSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      animations.push({ type: 'compare', indices: [j - 1, j] });
      if (arr[j] < arr[j - 1]) {
        animations.push({ type: 'swap', indices: [j - 1, j] });
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        j--;
      } else {
        break;
      }
    }
  }
  for (let i = 0; i < n; i++) {
    animations.push({ type: 'sorted', index: i });
  }
  return animations;
}

// ==========================================
// 4. MERGE SORT
// ==========================================
export function getMergeSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const aux = [...array];
  mergeSortHelper(arr, 0, arr.length - 1, aux, animations);
  for (let i = 0; i < arr.length; i++) {
    animations.push({ type: 'sorted', index: i });
  }
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: 'compare', indices: [i, j] });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[i] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[i] });
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'overwrite', index: k, value: auxiliaryArray[j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// ==========================================
// 5. QUICK SORT
// ==========================================
export function getQuickSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  quickSortHelper(arr, 0, arr.length - 1, animations);
  for (let i = 0; i < arr.length; i++) {
    animations.push({ type: 'sorted', index: i });
  }
  return animations;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    const pi = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  animations.push({ type: 'pivot', index: high });
  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push({ type: 'compare', indices: [j, high] });
    if (arr[j] < pivot) {
      i++;
      animations.push({ type: 'swap', indices: [i, j] });
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  animations.push({ type: 'swap', indices: [i + 1, high] });
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// ==========================================
// 6. HEAP SORT
// ==========================================
export function getHeapSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: 'swap', indices: [0, i] });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    animations.push({ type: 'sorted', index: i });
    heapify(arr, i, 0, animations);
  }
  animations.push({ type: 'sorted', index: 0 });
  return animations;
}

function heapify(arr, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    animations.push({ type: 'compare', indices: [left, largest] });
    if (arr[left] > arr[largest]) largest = left;
  }

  if (right < n) {
    animations.push({ type: 'compare', indices: [right, largest] });
    if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== i) {
    animations.push({ type: 'swap', indices: [i, largest] });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
}