// Generate animation steps for all algorithms

export function generateAlgorithmSteps(operation: string, data: string): any[] {
  const numbers = data.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  
  switch (operation) {
    // ========== SORTING ALGORITHMS ==========
    case 'bubble-sort':
      return generateBubbleSort(numbers);
    case 'selection-sort':
      return generateSelectionSort(numbers);
    case 'insertion-sort':
      return generateInsertionSort(numbers);
    case 'merge-sort':
      return generateMergeSort(numbers);
    case 'quick-sort':
      return generateQuickSort(numbers);
    case 'heap-sort':
      return generateHeapSort(numbers);

    // ========== SEARCHING ALGORITHMS ==========
    case 'linear-search':
      return generateLinearSearch(numbers);
    case 'binary-search':
      return generateBinarySearch(numbers);
    case 'jump-search':
      return generateJumpSearch(numbers);

    // ========== ARRAY OPERATIONS ==========
    case 'array-access':
      return generateArrayAccess(numbers);
    case 'array-insert':
      return generateArrayInsert(numbers);
    case 'array-delete':
      return generateArrayDelete(numbers);

    // ========== STACK OPERATIONS ==========
    case 'stack-push':
      return generateStackPush(numbers);
    case 'stack-pop':
      return generateStackPop(numbers);
    case 'stack-peek':
      return generateStackPeek(numbers);

    // ========== QUEUE OPERATIONS ==========
    case 'queue-enqueue':
      return generateQueueEnqueue(numbers);
    case 'queue-dequeue':
      return generateQueueDequeue(numbers);

    // ========== LINKED LIST OPERATIONS ==========
    case 'll-insert-head':
      return generateLinkedListInsertHead(numbers);
    case 'll-insert-tail':
      return generateLinkedListInsertTail(numbers);
    case 'll-delete':
      return generateLinkedListDelete(numbers);
    case 'll-search':
      return generateLinkedListSearch(numbers);

    // ========== BST OPERATIONS ==========
    case 'bst-insert':
      return generateBSTInsert(numbers);
    case 'bst-search':
      return generateBSTSearch(numbers);
    case 'bst-delete':
      return generateBSTDelete(numbers);

    // ========== TREE OPERATIONS ==========
    case 'tree-insert':
      return generateTreeInsert(numbers);
    case 'tree-search':
      return generateTreeSearch(numbers);
    case 'tree-delete':
      return generateTreeDelete(numbers);
    case 'tree-traversal':
      return generateTreeTraversal(numbers);

    // ========== HASH TABLE OPERATIONS ==========
    case 'hash-insert':
      return generateHashInsert(numbers);
    case 'hash-search':
      return generateHashSearch(numbers);
    case 'hash-delete':
      return generateHashDelete(numbers);

    // ========== GRAPH ALGORITHMS ==========
    case 'bfs':
      return generateBFS(numbers);
    case 'dfs':
      return generateDFS(numbers);
    case 'dijkstra':
      return generateDijkstra(numbers);

    default:
      return generateDefault(operation, numbers);
  }
}

// ========== SORTING IMPLEMENTATIONS ==========
function generateBubbleSort(arr: number[]): any[] {
  const steps = [];
  const array = [...arr];
  
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        explanation: `Comparing ${array[j]} and ${array[j + 1]}`,
        pseudoCodeLine: 2
      });
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          array: [...array],
          swapped: [j, j + 1],
          explanation: `Swapped ${array[j + 1]} and ${array[j]}`,
          pseudoCodeLine: 3
        });
      }
    }
  }
  
  steps.push({
    array: [...array],
    sorted: true,
    explanation: 'Array is now sorted!',
    pseudoCodeLine: -1
  });
  
  return steps;
}

function generateSelectionSort(arr: number[]): any[] {
  const steps = [];
  const array = [...arr];
  
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    
    steps.push({
      array: [...array],
      highlighting: [i],
      explanation: `Finding minimum from position ${i}`,
      pseudoCodeLine: 1
    });
    
    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        array: [...array],
        comparing: [minIdx, j],
        explanation: `Comparing ${array[minIdx]} with ${array[j]}`,
        pseudoCodeLine: 3
      });
      
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      steps.push({
        array: [...array],
        swapped: [i, minIdx],
        explanation: `Swapped ${array[minIdx]} with ${array[i]}`,
        pseudoCodeLine: 5
      });
    }
  }
  
  steps.push({
    array: [...array],
    sorted: true,
    explanation: 'Array is sorted!',
    pseudoCodeLine: -1
  });
  
  return steps;
}

function generateInsertionSort(arr: number[]): any[] {
  const steps = [];
  const array = [...arr];
  
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;
    
    steps.push({
      array: [...array],
      highlighting: [i],
      explanation: `Inserting ${key} into sorted portion`,
      pseudoCodeLine: 1
    });
    
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        explanation: `Shifting ${array[j]} to the right`,
        pseudoCodeLine: 4
      });
      j--;
    }
    
    array[j + 1] = key;
    steps.push({
      array: [...array],
      highlighting: [j + 1],
      explanation: `Placed ${key} at position ${j + 1}`,
      pseudoCodeLine: 6
    });
  }
  
  steps.push({
    array: [...array],
    sorted: true,
    explanation: 'Array is sorted!',
    pseudoCodeLine: -1
  });
  
  return steps;
}

function generateMergeSort(arr: number[]): any[] {
  const steps: any[] = [];
  const array = [...arr];
  
  function merge(arr: number[], left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    
    steps.push({
      array: [...arr],
      highlighting: Array.from({length: right - left + 1}, (_, idx) => left + idx),
      explanation: `Merging subarrays [${left}..${mid}] and [${mid+1}..${right}]`,
      pseudoCodeLine: 5
    });
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      steps.push({
        array: [...arr],
        highlighting: [k],
        explanation: `Placing ${arr[k]} at position ${k}`,
        pseudoCodeLine: 5
      });
      k++;
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  }
  
  function mergeSortHelper(arr: number[], left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        array: [...arr],
        highlighting: Array.from({length: right - left + 1}, (_, idx) => left + idx),
        explanation: `Dividing array at position ${mid}`,
        pseudoCodeLine: 2
      });
      
      mergeSortHelper(arr, left, mid);
      mergeSortHelper(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  }
  
  mergeSortHelper(array, 0, array.length - 1);
  
  steps.push({
    array: [...array],
    sorted: true,
    explanation: 'Merge Sort complete!',
    pseudoCodeLine: -1
  });
  
  return steps;
}

function generateQuickSort(arr: number[]): any[] {
  const steps: any[] = [];
  const array = [...arr];
  
  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    steps.push({
      array: [...arr],
      highlighting: [high],
      explanation: `Pivot selected: ${pivot}`,
      pseudoCodeLine: 2
    });
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        explanation: `Comparing ${arr[j]} with pivot ${pivot}`,
        pseudoCodeLine: 3
      });
      
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        if (i !== j) {
          steps.push({
            array: [...arr],
            swapped: [i, j],
            explanation: `Swapped ${arr[j]} and ${arr[i]}`,
            pseudoCodeLine: 4
          });
        }
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      swapped: [i + 1, high],
      explanation: `Placed pivot ${pivot} at position ${i + 1}`,
      pseudoCodeLine: 4
    });
    
    return i + 1;
  }
  
  function quickSortHelper(arr: number[], low: number, high: number) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  }
  
  quickSortHelper(array, 0, array.length - 1);
  
  steps.push({
    array: [...array],
    sorted: true,
    explanation: 'Quick Sort complete!',
    pseudoCodeLine: -1
  });
  
  return steps;
}

function generateHeapSort(arr: number[]): any[] {
  const steps: any[] = [];
  const array = [...arr];
  
  function heapify(arr: number[], n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        array: [...arr],
        swapped: [i, largest],
        explanation: `Heapifying: swapped ${arr[largest]} and ${arr[i]}`,
        pseudoCodeLine: 4
      });
      heapify(arr, n, largest);
    }
  }
  
  // Build max heap
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, array.length, i);
  }
  
  // Extract elements from heap
  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    steps.push({
      array: [...array],
      swapped: [0, i],
      explanation: `Moved ${array[i]} to sorted position`,
      pseudoCodeLine: 2
    });
    heapify(array, i, 0);
  }
  
  steps.push({
    array: [...array],
    sorted: true,
    explanation: 'Heap Sort complete!',
    pseudoCodeLine: -1
  });
  
  return steps;
}

// ========== SEARCHING IMPLEMENTATIONS ==========
function generateLinearSearch(arr: number[]): any[] {
  const steps = [];
  const array = arr.slice(0, -1);
  const target = arr[arr.length - 1];
  
  steps.push({
    array: [...array],
    explanation: `Searching for ${target} in array`,
    pseudoCodeLine: 0
  });
  
  for (let i = 0; i < array.length; i++) {
    steps.push({
      array: [...array],
      highlighting: [i],
      explanation: `Checking position ${i}: ${array[i]} ${array[i] === target ? '==' : '!='} ${target}`,
      pseudoCodeLine: 2
    });
    
    if (array[i] === target) {
      steps.push({
        array: [...array],
        highlighting: [i],
        found: i,
        explanation: `Found ${target} at position ${i}!`,
        pseudoCodeLine: 3
      });
      return steps;
    }
  }
  
  steps.push({
    array: [...array],
    explanation: `${target} not found in array`,
    pseudoCodeLine: 4
  });
  
  return steps;
}

function generateBinarySearch(arr: number[]): any[] {
  const steps = [];
  const array = arr.slice(0, -1).sort((a, b) => a - b);
  const target = arr[arr.length - 1];
  let left = 0;
  let right = array.length - 1;
  
  steps.push({
    array: [...array],
    explanation: `Binary searching for ${target} in sorted array`,
    pseudoCodeLine: 0
  });
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      array: [...array],
      highlighting: [mid],
      searchRange: [left, right],
      explanation: `Checking middle position ${mid}: ${array[mid]}`,
      pseudoCodeLine: 3
    });
    
    if (array[mid] === target) {
      steps.push({
        array: [...array],
        highlighting: [mid],
        found: mid,
        explanation: `Found ${target} at position ${mid}!`,
        pseudoCodeLine: 4
      });
      return steps;
    } else if (array[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...array],
        searchRange: [left, right],
        explanation: `${target} > ${array[mid]}, search right half`,
        pseudoCodeLine: 5
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...array],
        searchRange: [left, right],
        explanation: `${target} < ${array[mid]}, search left half`,
        pseudoCodeLine: 6
      });
    }
  }
  
  steps.push({
    array: [...array],
    explanation: `${target} not found in array`,
    pseudoCodeLine: 7
  });
  
  return steps;
}

function generateJumpSearch(arr: number[]): any[] {
  const steps = [];
  const array = arr.slice(0, -1).sort((a, b) => a - b);
  const target = arr[arr.length - 1];
  const n = array.length;
  const jump = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  steps.push({
    array: [...array],
    explanation: `Jump searching for ${target} with step size ${jump}`,
    pseudoCodeLine: 0
  });
  
  while (array[Math.min(jump, n) - 1] < target) {
    steps.push({
      array: [...array],
      highlighting: [Math.min(jump, n) - 1],
      explanation: `Jumping to position ${Math.min(jump, n) - 1}`,
      pseudoCodeLine: 2
    });
    prev = jump;
    if (prev >= n) break;
  }
  
  for (let i = prev; i < Math.min(jump + prev, n); i++) {
    steps.push({
      array: [...array],
      highlighting: [i],
      explanation: `Linear search at position ${i}: ${array[i]}`,
      pseudoCodeLine: 5
    });
    
    if (array[i] === target) {
      steps.push({
        array: [...array],
        highlighting: [i],
        found: i,
        explanation: `Found ${target} at position ${i}!`,
        pseudoCodeLine: 5
      });
      return steps;
    }
  }
  
  steps.push({
    array: [...array],
    explanation: `${target} not found`,
    pseudoCodeLine: -1
  });
  
  return steps;
}

// ========== ARRAY OPERATIONS ==========
function generateArrayAccess(arr: number[]): any[] {
  const steps = [];
  const index = arr.length > 0 ? Math.floor(arr.length / 2) : 0;
  
  steps.push({
    array: [...arr],
    explanation: `Accessing element at index ${index}`,
    pseudoCodeLine: 0
  });
  
  steps.push({
    array: [...arr],
    highlighting: [index],
    explanation: `Array[${index}] = ${arr[index]}`,
    pseudoCodeLine: 3
  });
  
  return steps;
}

function generateArrayInsert(arr: number[]): any[] {
  const steps = [];
  const array = [...arr];
  const newElement = Math.max(...array) + 1;
  const insertPos = Math.floor(array.length / 2);
  
  steps.push({
    array: [...array],
    explanation: `Inserting ${newElement} at position ${insertPos}`,
    pseudoCodeLine: 0
  });
  
  for (let i = array.length; i > insertPos; i--) {
    steps.push({
      array: [...array],
      highlighting: [i - 1, i],
      explanation: `Shifting element from position ${i-1} to ${i}`,
      pseudoCodeLine: 1
    });
  }
  
  array.splice(insertPos, 0, newElement);
  
  steps.push({
    array: [...array],
    highlighting: [insertPos],
    explanation: `Inserted ${newElement} at position ${insertPos}`,
    pseudoCodeLine: 2
  });
  
  return steps;
}

function generateArrayDelete(arr: number[]): any[] {
  const steps = [];
  const array = [...arr];
  const deletePos = Math.floor(array.length / 2);
  const deletedElement = array[deletePos];
  
  steps.push({
    array: [...array],
    highlighting: [deletePos],
    explanation: `Deleting element ${deletedElement} from position ${deletePos}`,
    pseudoCodeLine: 0
  });
  
  array.splice(deletePos, 1);
  
  steps.push({
    array: [...array],
    explanation: `Shifted remaining elements left`,
    pseudoCodeLine: 2
  });
  
  return steps;
}

// ========== STACK OPERATIONS ==========
function generateStackPush(arr: number[]): any[] {
  const steps = [];
  const stack = arr.slice(0, 3);
  const newElement = arr[arr.length - 1] || 99;
  
  steps.push({
    stack: [...stack],
    explanation: `Pushing ${newElement} onto stack`,
    pseudoCodeLine: 0,
    operation: 'push'
  });
  
  stack.push(newElement);
  
  steps.push({
    stack: [...stack],
    highlighting: [stack.length - 1],
    explanation: `${newElement} pushed to top of stack`,
    pseudoCodeLine: 3,
    operation: 'push'
  });
  
  return steps;
}

function generateStackPop(arr: number[]): any[] {
  const steps = [];
  const stack = [...arr];
  
  if (stack.length === 0) {
    return [{
      stack: [],
      explanation: 'Stack is empty, cannot pop',
      pseudoCodeLine: 1,
      operation: 'pop'
    }];
  }
  
  steps.push({
    stack: [...stack],
    highlighting: [stack.length - 1],
    explanation: `Popping ${stack[stack.length - 1]} from stack`,
    pseudoCodeLine: 0,
    operation: 'pop'
  });
  
  const popped = stack.pop();
  
  steps.push({
    stack: [...stack],
    explanation: `Popped ${popped} from stack`,
    pseudoCodeLine: 4,
    operation: 'pop'
  });
  
  return steps;
}

function generateStackPeek(arr: number[]): any[] {
  const steps = [];
  const stack = [...arr];
  
  if (stack.length === 0) {
    return [{
      stack: [],
      explanation: 'Stack is empty',
      pseudoCodeLine: 1,
      operation: 'peek'
    }];
  }
  
  steps.push({
    stack: [...stack],
    highlighting: [stack.length - 1],
    explanation: `Top element is ${stack[stack.length - 1]}`,
    pseudoCodeLine: 2,
    operation: 'peek'
  });
  
  return steps;
}

// ========== QUEUE OPERATIONS ==========
function generateQueueEnqueue(arr: number[]): any[] {
  const steps = [];
  const queue = arr.slice(0, 3);
  const newElement = arr[arr.length - 1] || 99;
  
  steps.push({
    queue: [...queue],
    explanation: `Enqueuing ${newElement} to queue`,
    pseudoCodeLine: 0,
    operation: 'enqueue'
  });
  
  queue.push(newElement);
  
  steps.push({
    queue: [...queue],
    highlighting: [queue.length - 1],
    explanation: `${newElement} added to rear of queue`,
    pseudoCodeLine: 3,
    operation: 'enqueue'
  });
  
  return steps;
}

function generateQueueDequeue(arr: number[]): any[] {
  const steps = [];
  const queue = [...arr];
  
  if (queue.length === 0) {
    return [{
      queue: [],
      explanation: 'Queue is empty, cannot dequeue',
      pseudoCodeLine: 1,
      operation: 'dequeue'
    }];
  }
  
  steps.push({
    queue: [...queue],
    highlighting: [0],
    explanation: `Dequeuing ${queue[0]} from front`,
    pseudoCodeLine: 0,
    operation: 'dequeue'
  });
  
  const dequeued = queue.shift();
  
  steps.push({
    queue: [...queue],
    explanation: `Removed ${dequeued} from queue`,
    pseudoCodeLine: 4,
    operation: 'dequeue'
  });
  
  return steps;
}

// ========== LINKED LIST OPERATIONS ==========
function generateLinkedListInsertHead(arr: number[]): any[] {
  const steps = [];
  const list = arr.slice(0, 4);
  const newElement = arr[arr.length - 1] || 99;
  
  steps.push({
    linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
    explanation: `Inserting ${newElement} at head`,
    pseudoCodeLine: 0,
    operation: 'insert-head'
  });
  
  list.unshift(newElement);
  
  steps.push({
    linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
    highlighting: [0],
    explanation: `${newElement} is now the head`,
    pseudoCodeLine: 3,
    operation: 'insert-head'
  });
  
  return steps;
}

function generateLinkedListInsertTail(arr: number[]): any[] {
  const steps = [];
  const list = arr.slice(0, 4);
  const newElement = arr[arr.length - 1] || 99;
  
  steps.push({
    linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
    explanation: `Inserting ${newElement} at tail`,
    pseudoCodeLine: 0,
    operation: 'insert-tail'
  });
  
  list.push(newElement);
  
  steps.push({
    linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
    highlighting: [list.length - 1],
    explanation: `${newElement} added at tail`,
    pseudoCodeLine: 6,
    operation: 'insert-tail'
  });
  
  return steps;
}

function generateLinkedListDelete(arr: number[]): any[] {
  const steps = [];
  const list = [...arr];
  const target = list[Math.floor(list.length / 2)];
  
  steps.push({
    linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
    explanation: `Deleting node with value ${target}`,
    pseudoCodeLine: 0,
    operation: 'delete'
  });
  
  const targetIdx = list.indexOf(target);
  list.splice(targetIdx, 1);
  
  steps.push({
    linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
    explanation: `Node with value ${target} deleted`,
    pseudoCodeLine: 7,
    operation: 'delete'
  });
  
  return steps;
}

function generateLinkedListSearch(arr: number[]): any[] {
  const steps = [];
  const list = [...arr];
  const target = list[list.length - 1];
  
  steps.push({
    linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
    explanation: `Searching for ${target}`,
    pseudoCodeLine: 0,
    operation: 'search'
  });
  
  for (let i = 0; i < list.length; i++) {
    steps.push({
      linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
      highlighting: [i],
      explanation: `Checking node ${i}: ${list[i]}`,
      pseudoCodeLine: 2,
      operation: 'search'
    });
    
    if (list[i] === target) {
      steps.push({
        linkedList: list.map((val, idx) => ({ value: val, next: idx < list.length - 1 ? idx + 1 : null })),
        highlighting: [i],
        found: i,
        explanation: `Found ${target} at position ${i}`,
        pseudoCodeLine: 3,
        operation: 'search'
      });
      return steps;
    }
  }
  
  return steps;
}

// ========== BST/TREE OPERATIONS ==========
function generateBSTInsert(arr: number[]): any[] {
  const steps = [];
  const tree: any = { nodes: [], edges: [] };
  
  arr.forEach((val, idx) => {
    steps.push({
      tree: JSON.parse(JSON.stringify(tree)),
      explanation: `Inserting ${val} into BST`,
      pseudoCodeLine: idx === 0 ? 1 : 3,
      operation: 'bst-insert',
      highlighting: [tree.nodes.length]
    });
    
    tree.nodes.push({ id: idx, value: val, x: 0, y: 0 });
    
    if (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      tree.edges.push({ from: parent, to: idx });
    }
    
    steps.push({
      tree: JSON.parse(JSON.stringify(tree)),
      explanation: `${val} inserted into BST`,
      pseudoCodeLine: 6,
      operation: 'bst-insert',
      highlighting: [idx]
    });
  });
  
  return steps;
}

function generateBSTSearch(arr: number[]): any[] {
  const steps = [];
  const tree: any = { nodes: arr.slice(0, -1).map((val, idx) => ({ id: idx, value: val })), edges: [] };
  const target = arr[arr.length - 1];
  
  for (let i = 0; i < tree.nodes.length; i++) {
    if (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      tree.edges.push({ from: parent, to: i });
    }
  }
  
  steps.push({
    tree: tree,
    explanation: `Searching for ${target} in BST`,
    pseudoCodeLine: 0,
    operation: 'bst-search'
  });
  
  for (let i = 0; i < tree.nodes.length; i++) {
    steps.push({
      tree: tree,
      highlighting: [i],
      explanation: `Checking node ${tree.nodes[i].value}`,
      pseudoCodeLine: 1,
      operation: 'bst-search'
    });
    
    if (tree.nodes[i].value === target) {
      steps.push({
        tree: tree,
        highlighting: [i],
        found: i,
        explanation: `Found ${target}!`,
        pseudoCodeLine: 2,
        operation: 'bst-search'
      });
      return steps;
    }
  }
  
  steps.push({
    tree: tree,
    explanation: `${target} not found`,
    pseudoCodeLine: 5,
    operation: 'bst-search'
  });
  
  return steps;
}

function generateBSTDelete(arr: number[]): any[] {
  return generateTreeDelete(arr);
}

function generateTreeInsert(arr: number[]): any[] {
  return generateBSTInsert(arr);
}

function generateTreeSearch(arr: number[]): any[] {
  return generateBSTSearch(arr);
}

function generateTreeDelete(arr: number[]): any[] {
  const steps = [];
  const tree: any = { nodes: arr.map((val, idx) => ({ id: idx, value: val })), edges: [] };
  const target = arr[Math.floor(arr.length / 2)];
  
  for (let i = 0; i < tree.nodes.length; i++) {
    if (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      tree.edges.push({ from: parent, to: i });
    }
  }
  
  steps.push({
    tree: tree,
    explanation: `Deleting node ${target} from tree`,
    pseudoCodeLine: 0,
    operation: 'tree-delete'
  });
  
  const targetIdx = arr.indexOf(target);
  const newTree = { ...tree };
  newTree.nodes = tree.nodes.filter((n: any) => n.value !== target);
  
  steps.push({
    tree: newTree,
    explanation: `Node ${target} deleted`,
    pseudoCodeLine: 3,
    operation: 'tree-delete'
  });
  
  return steps;
}

function generateTreeTraversal(arr: number[]): any[] {
  const steps = [];
  const tree: any = { nodes: arr.map((val, idx) => ({ id: idx, value: val })), edges: [] };
  
  for (let i = 0; i < tree.nodes.length; i++) {
    if (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      tree.edges.push({ from: parent, to: i });
    }
  }
  
  steps.push({
    tree: tree,
    explanation: 'Starting tree traversal (In-order)',
    pseudoCodeLine: 0,
    operation: 'tree-traversal'
  });
  
  arr.forEach((val, idx) => {
    steps.push({
      tree: tree,
      highlighting: [idx],
      explanation: `Visiting node ${val}`,
      pseudoCodeLine: 0,
      operation: 'tree-traversal'
    });
  });
  
  return steps;
}

// ========== HASH TABLE OPERATIONS ==========
function generateHashInsert(arr: number[]): any[] {
  const steps = [];
  const hashTable: any[] = new Array(7).fill(null).map(() => []);
  
  arr.forEach(val => {
    const hash = val % 7;
    
    steps.push({
      hashTable: JSON.parse(JSON.stringify(hashTable)),
      explanation: `Hashing ${val}: ${val} % 7 = ${hash}`,
      pseudoCodeLine: 1,
      operation: 'hash-insert',
      highlighting: [hash]
    });
    
    hashTable[hash].push(val);
    
    steps.push({
      hashTable: JSON.parse(JSON.stringify(hashTable)),
      explanation: `Inserted ${val} at bucket ${hash}`,
      pseudoCodeLine: 3,
      operation: 'hash-insert',
      highlighting: [hash]
    });
  });
  
  return steps;
}

function generateHashSearch(arr: number[]): any[] {
  const steps = [];
  const hashTable: any[] = new Array(7).fill(null).map(() => []);
  const target = arr[arr.length - 1];
  
  arr.slice(0, -1).forEach(val => {
    hashTable[val % 7].push(val);
  });
  
  const hash = target % 7;
  
  steps.push({
    hashTable: JSON.parse(JSON.stringify(hashTable)),
    explanation: `Searching for ${target}: hash = ${target} % 7 = ${hash}`,
    pseudoCodeLine: 1,
    operation: 'hash-search',
    highlighting: [hash]
  });
  
  if (hashTable[hash].includes(target)) {
    steps.push({
      hashTable: JSON.parse(JSON.stringify(hashTable)),
      explanation: `Found ${target} in bucket ${hash}`,
      pseudoCodeLine: 3,
      operation: 'hash-search',
      found: hash,
      highlighting: [hash]
    });
  } else {
    steps.push({
      hashTable: JSON.parse(JSON.stringify(hashTable)),
      explanation: `${target} not found`,
      pseudoCodeLine: 3,
      operation: 'hash-search'
    });
  }
  
  return steps;
}

function generateHashDelete(arr: number[]): any[] {
  const steps = [];
  const hashTable: any[] = new Array(7).fill(null).map(() => []);
  const target = arr[Math.floor(arr.length / 2)];
  
  arr.forEach(val => {
    hashTable[val % 7].push(val);
  });
  
  const hash = target % 7;
  
  steps.push({
    hashTable: JSON.parse(JSON.stringify(hashTable)),
    explanation: `Deleting ${target}: hash = ${hash}`,
    pseudoCodeLine: 1,
    operation: 'hash-delete',
    highlighting: [hash]
  });
  
  hashTable[hash] = hashTable[hash].filter(v => v !== target);
  
  steps.push({
    hashTable: JSON.parse(JSON.stringify(hashTable)),
    explanation: `Deleted ${target} from bucket ${hash}`,
    pseudoCodeLine: 3,
    operation: 'hash-delete',
    highlighting: [hash]
  });
  
  return steps;
}

// ========== GRAPH ALGORITHMS ==========
function generateBFS(arr: number[]): any[] {
  const steps = [];
  const graph: any = {
    nodes: arr.slice(0, 6).map((val, idx) => ({ id: idx, value: val })),
    edges: [
      { from: 0, to: 1 }, { from: 0, to: 2 },
      { from: 1, to: 3 }, { from: 1, to: 4 },
      { from: 2, to: 5 }
    ]
  };
  
  const visited = new Set<number>();
  const queue = [0];
  visited.add(0);
  
  steps.push({
    graph: graph,
    visited: Array.from(visited),
    queue: [...queue],
    explanation: 'Starting BFS from node 0',
    pseudoCodeLine: 0,
    operation: 'bfs'
  });
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    
    steps.push({
      graph: graph,
      visited: Array.from(visited),
      queue: [...queue],
      highlighting: [node],
      explanation: `Visiting node ${node}`,
      pseudoCodeLine: 3,
      operation: 'bfs'
    });
    
    const neighbors = graph.edges.filter((e: any) => e.from === node).map((e: any) => e.to);
    
    neighbors.forEach((neighbor: number) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        
        steps.push({
          graph: graph,
          visited: Array.from(visited),
          queue: [...queue],
          explanation: `Added node ${neighbor} to queue`,
          pseudoCodeLine: 7,
          operation: 'bfs'
        });
      }
    });
  }
  
  steps.push({
    graph: graph,
    visited: Array.from(visited),
    queue: [],
    explanation: 'BFS complete!',
    pseudoCodeLine: -1,
    operation: 'bfs'
  });
  
  return steps;
}

function generateDFS(arr: number[]): any[] {
  const steps = [];
  const graph: any = {
    nodes: arr.slice(0, 6).map((val, idx) => ({ id: idx, value: val })),
    edges: [
      { from: 0, to: 1 }, { from: 0, to: 2 },
      { from: 1, to: 3 }, { from: 1, to: 4 },
      { from: 2, to: 5 }
    ]
  };
  
  const visited = new Set<number>();
  
  function dfsHelper(node: number) {
    visited.add(node);
    
    steps.push({
      graph: graph,
      visited: Array.from(visited),
      highlighting: [node],
      explanation: `Visiting node ${node}`,
      pseudoCodeLine: 1,
      operation: 'dfs'
    });
    
    const neighbors = graph.edges.filter((e: any) => e.from === node).map((e: any) => e.to);
    
    neighbors.forEach((neighbor: number) => {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    });
  }
  
  steps.push({
    graph: graph,
    visited: [],
    explanation: 'Starting DFS from node 0',
    pseudoCodeLine: 0,
    operation: 'dfs'
  });
  
  dfsHelper(0);
  
  steps.push({
    graph: graph,
    visited: Array.from(visited),
    explanation: 'DFS complete!',
    pseudoCodeLine: -1,
    operation: 'dfs'
  });
  
  return steps;
}

function generateDijkstra(arr: number[]): any[] {
  const steps = [];
  const graph: any = {
    nodes: arr.slice(0, 5).map((val, idx) => ({ id: idx, value: val, distance: idx === 0 ? 0 : Infinity })),
    edges: [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 2, weight: 1 },
      { from: 2, to: 1, weight: 2 },
      { from: 1, to: 3, weight: 1 },
      { from: 2, to: 3, weight: 5 },
      { from: 3, to: 4, weight: 3 }
    ]
  };
  
  steps.push({
    graph: graph,
    explanation: "Starting Dijkstra's algorithm from node 0",
    pseudoCodeLine: 0,
    operation: 'dijkstra'
  });
  
  const visited = new Set<number>();
  
  for (let i = 0; i < graph.nodes.length; i++) {
    let minDist = Infinity;
    let minNode = -1;
    
    for (let j = 0; j < graph.nodes.length; j++) {
      if (!visited.has(j) && graph.nodes[j].distance < minDist) {
        minDist = graph.nodes[j].distance;
        minNode = j;
      }
    }
    
    if (minNode === -1) break;
    
    visited.add(minNode);
    
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      visited: Array.from(visited),
      highlighting: [minNode],
      explanation: `Visiting node ${minNode} with distance ${graph.nodes[minNode].distance}`,
      pseudoCodeLine: 4,
      operation: 'dijkstra'
    });
    
    const edges = graph.edges.filter((e: any) => e.from === minNode);
    
    edges.forEach((edge: any) => {
      const newDist = graph.nodes[minNode].distance + edge.weight;
      if (newDist < graph.nodes[edge.to].distance) {
        graph.nodes[edge.to].distance = newDist;
        
        steps.push({
          graph: JSON.parse(JSON.stringify(graph)),
          visited: Array.from(visited),
          highlighting: [edge.to],
          explanation: `Updated distance to node ${edge.to}: ${newDist}`,
          pseudoCodeLine: 7,
          operation: 'dijkstra'
        });
      }
    });
  }
  
  steps.push({
    graph: graph,
    visited: Array.from(visited),
    explanation: "Dijkstra's algorithm complete!",
    pseudoCodeLine: -1,
    operation: 'dijkstra'
  });
  
  return steps;
}

// ========== DEFAULT ==========
function generateDefault(operation: string, numbers: number[]): any[] {
  return [
    { 
      array: numbers, 
      explanation: `${operation} - Implementation coming soon!`,
      pseudoCodeLine: 0 
    }
  ];
}
