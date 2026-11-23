export const algorithmsData = {
  bubbleSort: {
    name: "Bubble Sort",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: "Yes",
    inPlace: "Yes"
  },
  selectionSort: {
    name: "Selection Sort",
    description: "Finds the minimum element from the unsorted part and places it at the beginning. Divides array into sorted and unsorted subarrays.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: "No",
    inPlace: "Yes"
  },
  insertionSort: {
    name: "Insertion Sort",
    description: "Builds the sorted array one item at a time by picking the current element and inserting it into its correct position in the sorted part.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: "Yes",
    inPlace: "Yes"
  },
  mergeSort: {
    name: "Merge Sort",
    description: "Divide and Conquer algorithm. Divides the array into two halves, recursively sorts them, and then merges the two sorted halves.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    stable: "Yes",
    inPlace: "No"
  },
  quickSort: {
    name: "Quick Sort",
    description: "Picks a pivot element and partitions the array around the pivot so that elements smaller than pivot go to the left, and greater to the right.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    stable: "No",
    inPlace: "Yes"
  },
  heapSort: {
    name: "Heap Sort",
    description: "Comparison-based sorting algorithm based on a Binary Heap data structure. Repeatedly extracts max element and rebuilds heap.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(1)",
    stable: "No",
    inPlace: "Yes"
  }
};