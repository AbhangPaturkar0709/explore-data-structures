export interface AlgorithmInfo {
  title: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  pseudoCode: string[];
}

export const algorithmInfo: Record<string, AlgorithmInfo> = {
  // ========== SORTING ALGORITHMS ==========
  'bubble-sort': {
    title: 'Bubble Sort',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if in wrong order.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'for i = 0 to n-2 do',
      '  for j = 0 to n-2-i do',
      '    if array[j] > array[j+1] then',
      '      swap(array[j], array[j+1])',
      '  end for',
      'end for'
    ]
  },
  'selection-sort': {
    title: 'Selection Sort',
    description: 'Divides array into sorted and unsorted regions, repeatedly finds minimum element from unsorted region.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'for i = 0 to n-1 do',
      '  minIndex = i',
      '  for j = i+1 to n do',
      '    if array[j] < array[minIndex] then',
      '      minIndex = j',
      '  swap(array[i], array[minIndex])',
      'end for'
    ]
  },
  'insertion-sort': {
    title: 'Insertion Sort',
    description: 'Builds sorted array one element at a time by inserting elements into their correct position.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'for i = 1 to n do',
      '  key = array[i]',
      '  j = i - 1',
      '  while j >= 0 and array[j] > key do',
      '    array[j+1] = array[j]',
      '    j = j - 1',
      '  array[j+1] = key',
      'end for'
    ]
  },
  'merge-sort': {
    title: 'Merge Sort',
    description: 'Divide-and-conquer algorithm that divides array into halves, sorts them and merges back together.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    pseudoCode: [
      'function mergeSort(array, left, right)',
      '  if left < right then',
      '    mid = (left + right) / 2',
      '    mergeSort(array, left, mid)',
      '    mergeSort(array, mid+1, right)',
      '    merge(array, left, mid, right)',
      'end function'
    ]
  },
  'quick-sort': {
    title: 'Quick Sort',
    description: 'Picks pivot element and partitions array around it, recursively sorting sub-arrays.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    pseudoCode: [
      'function quickSort(array, low, high)',
      '  if low < high then',
      '    pivot = partition(array, low, high)',
      '    quickSort(array, low, pivot-1)',
      '    quickSort(array, pivot+1, high)',
      'end function'
    ]
  },
  'heap-sort': {
    title: 'Heap Sort',
    description: 'Uses heap data structure to sort elements. Builds max heap then extracts elements one by one.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'buildMaxHeap(array)',
      'for i = n-1 down to 1 do',
      '  swap(array[0], array[i])',
      '  heapSize = heapSize - 1',
      '  maxHeapify(array, 0)',
      'end for'
    ]
  },

  // ========== SEARCHING ALGORITHMS ==========
  'linear-search': {
    title: 'Linear Search',
    description: 'Sequential search that checks each element one by one until target is found.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function linearSearch(array, target)',
      '  for i = 0 to n-1 do',
      '    if array[i] == target then',
      '      return i',
      '  return -1',
      'end function'
    ]
  },
  'binary-search': {
    title: 'Binary Search',
    description: 'Efficient algorithm for searching sorted array by repeatedly dividing search interval in half.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function binarySearch(array, target)',
      '  left = 0, right = n - 1',
      '  while left <= right do',
      '    mid = (left + right) / 2',
      '    if array[mid] == target then return mid',
      '    else if array[mid] < target then left = mid + 1',
      '    else right = mid - 1',
      '  return -1'
    ]
  },
  'jump-search': {
    title: 'Jump Search',
    description: 'Searches sorted array by jumping ahead by fixed steps then performing linear search.',
    timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'step = sqrt(n)',
      'prev = 0',
      'while array[min(step, n)-1] < target',
      '  prev = step',
      '  step += sqrt(n)',
      'linear search in [prev, step]'
    ]
  },

  // ========== GRAPH ALGORITHMS ==========
  'bfs': {
    title: 'Breadth-First Search',
    description: 'Explores graph level by level using a queue. Visits all neighbors before going deeper.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    pseudoCode: [
      'queue.enqueue(startNode)',
      'visited[startNode] = true',
      'while queue is not empty do',
      '  node = queue.dequeue()',
      '  for each neighbor of node do',
      '    if not visited[neighbor] then',
      '      visited[neighbor] = true',
      '      queue.enqueue(neighbor)'
    ]
  },
  'dfs': {
    title: 'Depth-First Search',
    description: 'Explores graph by going as deep as possible along each branch before backtracking.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    pseudoCode: [
      'function dfs(node)',
      '  visited[node] = true',
      '  for each neighbor of node do',
      '    if not visited[neighbor] then',
      '      dfs(neighbor)',
      'end function'
    ]
  },
  'dijkstra': {
    title: "Dijkstra's Algorithm",
    description: 'Finds shortest path from source to all vertices in weighted graph with non-negative weights.',
    timeComplexity: { best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
    spaceComplexity: 'O(V)',
    pseudoCode: [
      'distance[source] = 0',
      'for all other vertices v',
      '  distance[v] = infinity',
      'while unvisited vertices exist',
      '  u = vertex with min distance',
      '  for each neighbor v of u',
      '    alt = distance[u] + weight(u, v)',
      '    if alt < distance[v] then distance[v] = alt'
    ]
  },

  // ========== DATA STRUCTURE OPERATIONS ==========
  'array-access': {
    title: 'Array Access',
    description: 'Direct access to array element using index. O(1) operation due to contiguous memory.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function access(array, index)',
      '  if index < 0 or index >= length then',
      '    return error',
      '  return array[index]',
      'end function'
    ]
  },
  'array-insert': {
    title: 'Array Insertion',
    description: 'Insert element at specific position, shifting existing elements to make room.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'for i = length down to index do',
      '  array[i+1] = array[i]',
      'array[index] = element',
      'length = length + 1'
    ]
  },
  'array-delete': {
    title: 'Array Deletion',
    description: 'Remove element from array and shift remaining elements to fill the gap.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'for i = index to length-2 do',
      '  array[i] = array[i+1]',
      'length = length - 1'
    ]
  },

  // Stack Operations
  'stack-push': {
    title: 'Stack Push',
    description: 'Add element to top of stack. O(1) operation.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function push(element)',
      '  if top >= maxSize then',
      '    return overflow',
      '  top = top + 1',
      '  stack[top] = element'
    ]
  },
  'stack-pop': {
    title: 'Stack Pop',
    description: 'Remove and return element from top of stack. O(1) operation.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function pop()',
      '  if top < 0 then',
      '    return underflow',
      '  element = stack[top]',
      '  top = top - 1',
      '  return element'
    ]
  },
  'stack-peek': {
    title: 'Stack Peek',
    description: 'View top element without removing it. O(1) operation.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function peek()',
      '  if top < 0 then',
      '    return empty',
      '  return stack[top]'
    ]
  },

  // Queue Operations
  'queue-enqueue': {
    title: 'Queue Enqueue',
    description: 'Add element to rear of queue. O(1) operation.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function enqueue(element)',
      '  if rear >= maxSize then',
      '    return overflow',
      '  rear = rear + 1',
      '  queue[rear] = element'
    ]
  },
  'queue-dequeue': {
    title: 'Queue Dequeue',
    description: 'Remove and return element from front of queue. O(1) operation.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function dequeue()',
      '  if front > rear then',
      '    return underflow',
      '  element = queue[front]',
      '  front = front + 1',
      '  return element'
    ]
  },

  // Linked List Operations
  'll-insert-head': {
    title: 'Insert at Head',
    description: 'Insert new node at beginning of linked list. O(1) operation.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function insertHead(data)',
      '  newNode = createNode(data)',
      '  newNode.next = head',
      '  head = newNode'
    ]
  },
  'll-insert-tail': {
    title: 'Insert at Tail',
    description: 'Insert new node at end of linked list. O(n) without tail pointer.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function insertTail(data)',
      '  newNode = createNode(data)',
      '  if head == null then head = newNode',
      '  else',
      '    current = head',
      '    while current.next != null',
      '      current = current.next',
      '    current.next = newNode'
    ]
  },
  'll-delete': {
    title: 'Delete Node',
    description: 'Remove node with specific value from linked list.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function delete(value)',
      '  if head.data == value then',
      '    head = head.next',
      '  else',
      '    current = head',
      '    while current.next != null',
      '      if current.next.data == value',
      '        current.next = current.next.next',
      '        return',
      '      current = current.next'
    ]
  },
  'll-search': {
    title: 'Search Linked List',
    description: 'Find node with specific value in linked list.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function search(value)',
      '  current = head',
      '  while current != null',
      '    if current.data == value',
      '      return current',
      '    current = current.next',
      '  return null'
    ]
  },

  // BST Operations
  'bst-insert': {
    title: 'BST Insert',
    description: 'Insert node in Binary Search Tree maintaining BST property.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(log n)',
    pseudoCode: [
      'function insert(root, value)',
      '  if root == null then',
      '    return newNode(value)',
      '  if value < root.data then',
      '    root.left = insert(root.left, value)',
      '  else',
      '    root.right = insert(root.right, value)',
      '  return root'
    ]
  },
  'bst-search': {
    title: 'BST Search',
    description: 'Search for value in Binary Search Tree using BST property.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(log n)',
    pseudoCode: [
      'function search(root, value)',
      '  if root == null or root.data == value',
      '    return root',
      '  if value < root.data',
      '    return search(root.left, value)',
      '  return search(root.right, value)'
    ]
  },
  'bst-delete': {
    title: 'BST Delete',
    description: 'Delete node from Binary Search Tree maintaining BST property.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(log n)',
    pseudoCode: [
      'function delete(root, value)',
      '  if root == null return null',
      '  if value < root.data',
      '    root.left = delete(root.left, value)',
      '  else if value > root.data',
      '    root.right = delete(root.right, value)',
      '  else // node found',
      '    if one or no child: return child',
      '    else: replace with inorder successor'
    ]
  },

  // Hash Table Operations
  'hash-insert': {
    title: 'Hash Table Insert',
    description: 'Insert key-value pair into hash table using hash function.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function insert(key, value)',
      '  index = hash(key) % size',
      '  if collision then',
      '    handle collision (chaining/probing)',
      '  table[index] = {key, value}'
    ]
  },
  'hash-search': {
    title: 'Hash Table Search',
    description: 'Search for value in hash table using key.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function search(key)',
      '  index = hash(key) % size',
      '  if collision handled',
      '    search chain/probe sequence',
      '  return table[index].value'
    ]
  },
  'hash-delete': {
    title: 'Hash Table Delete',
    description: 'Delete key-value pair from hash table.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function delete(key)',
      '  index = hash(key) % size',
      '  if collision handled',
      '    search and remove from chain/sequence',
      '  table[index] = null'
    ]
  },

  // Tree Operations
  'tree-insert': {
    title: 'Binary Tree Insert',
    description: 'Insert node in binary tree at next available position (level-order).',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudoCode: [
      'function insert(root, value)',
      '  if root == null return newNode(value)',
      '  queue.enqueue(root)',
      '  while queue not empty',
      '    node = queue.dequeue()',
      '    if node.left == null',
      '      node.left = newNode(value)',
      '      return',
      '    else queue.enqueue(node.left)',
      '    if node.right == null',
      '      node.right = newNode(value)',
      '      return',
      '    else queue.enqueue(node.right)'
    ]
  },
  'tree-search': {
    title: 'Binary Tree Search',
    description: 'Search for value in binary tree using level-order traversal.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudoCode: [
      'function search(root, value)',
      '  if root == null return null',
      '  queue.enqueue(root)',
      '  while queue not empty',
      '    node = queue.dequeue()',
      '    if node.data == value return node',
      '    if node.left enqueue(node.left)',
      '    if node.right enqueue(node.right)',
      '  return null'
    ]
  },
  'tree-delete': {
    title: 'Binary Tree Delete',
    description: 'Delete node from binary tree and replace with deepest rightmost node.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudoCode: [
      'function delete(root, key)',
      '  find node to delete',
      '  find deepest rightmost node',
      '  replace deleted node with deepest',
      '  delete deepest node'
    ]
  },
  'tree-traversal': {
    title: 'Tree Traversal',
    description: 'Visit all nodes in tree: Inorder, Preorder, Postorder, Level-order.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudoCode: [
      'Inorder: left, root, right',
      'Preorder: root, left, right',
      'Postorder: left, right, root',
      'Level-order: BFS using queue'
    ]
  }
};
