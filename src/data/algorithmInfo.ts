export interface AlgorithmInfo {
  title: string;
  description: string;
  detailedNotes: string;
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
    detailedNotes: `**How it Works:** Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. This process is repeated until no more swaps are needed, indicating that the list is sorted.

**Step-by-Step Process:**
1. Start at the beginning of the array
2. Compare the first two elements
3. If the first is greater than the second, swap them
4. Move to the next pair and repeat
5. After each complete pass, the largest element "bubbles up" to its correct position at the end
6. Continue until no swaps are made in a complete pass

**When to Use:**
- Educational purposes to understand sorting concepts
- Small datasets (less than 50 elements)
- Nearly sorted data (best case O(n))
- When simplicity is more important than efficiency

**Advantages:**
- Very simple to understand and implement
- Requires no additional memory space (in-place sorting)
- Stable sort (maintains relative order of equal elements)
- Adaptive - performs well on nearly sorted data

**Disadvantages:**
- Very inefficient for large datasets (O(n²) average case)
- Poor performance compared to more advanced algorithms
- Many unnecessary comparisons even with optimization

**Real-World Applications:**
- Teaching fundamental sorting concepts
- Quick sorting of very small lists
- Detecting if a list is already sorted (optimized version)`,
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
    detailedNotes: `**How it Works:** Selection Sort divides the input array into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire array. The algorithm proceeds by finding the smallest (or largest) element in the unsorted array and swapping it with the leftmost unsorted element, moving the sorted/unsorted boundary one element to the right.

**Step-by-Step Process:**
1. Set the first element as the minimum
2. Scan through the rest of the array to find the actual minimum
3. Swap the minimum with the first element
4. Move to the next position and repeat for the unsorted portion
5. Continue until the entire array is sorted

**When to Use:**
- Small datasets where simplicity is preferred
- When memory write operations are expensive (fewer swaps than bubble sort)
- When checking all elements is not costly
- Educational contexts to demonstrate selection algorithms

**Advantages:**
- Simple implementation
- In-place sorting (O(1) space complexity)
- Performs well on small lists
- Minimizes number of swaps (at most n-1 swaps)

**Disadvantages:**
- O(n²) time complexity in all cases (not adaptive)
- Not stable (relative order of equal elements may change)
- Inefficient for large datasets

**Real-World Applications:**
- Sorting small arrays where minimizing memory writes is important
- Systems with expensive write operations
- Teaching selection-based algorithm design`,
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
    detailedNotes: `**How it Works:** Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain. This is similar to how you might sort playing cards in your hands.

**Step-by-Step Process:**
1. Start with the second element (first is considered sorted)
2. Compare it with elements in the sorted portion
3. Shift larger elements one position to the right
4. Insert the current element in its correct position
5. Move to the next unsorted element and repeat
6. Continue until all elements are processed

**When to Use:**
- Small datasets (typically < 50 elements)
- Nearly sorted or partially sorted data (best case O(n))
- Online sorting (elements arrive one at a time)
- As part of more complex algorithms (like Timsort)

**Advantages:**
- Simple and intuitive implementation
- Efficient for small data sets
- Adaptive - efficient for nearly sorted data
- Stable sort (maintains relative order)
- In-place sorting (O(1) extra space)
- Online algorithm (can sort as it receives data)

**Disadvantages:**
- Inefficient for large datasets (O(n²) average case)
- Performance degrades with random or reverse-sorted data

**Real-World Applications:**
- Sorting small arrays in production systems
- Part of hybrid sorting algorithms (Timsort in Python)
- Real-time systems where data arrives incrementally
- Maintaining sorted lists with occasional insertions`,
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
    detailedNotes: `**How it Works:** Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts both halves, and then merges the two sorted halves. The merge operation is the key process that assumes that both halves are already sorted and combines them into a single sorted array.

**Step-by-Step Process:**
1. Divide the unsorted array into two halves
2. Recursively sort both halves
3. Merge the two sorted halves into one sorted array
4. The recursion ends when array size becomes 1 (base case)
5. During merging, compare elements from both halves and place smaller element first

**When to Use:**
- Large datasets requiring guaranteed O(n log n) performance
- When stable sorting is required
- External sorting (sorting data that doesn't fit in memory)
- Linked lists (no extra space needed for linked list version)
- When consistent performance is more important than space

**Advantages:**
- Guaranteed O(n log n) time complexity in all cases
- Stable sort (preserves relative order of equal elements)
- Parallelizable (divide step can be done in parallel)
- Predictable performance
- Excellent for linked lists (O(1) space)

**Disadvantages:**
- Requires O(n) extra space for arrays
- Slower than quicksort in practice for arrays
- Not in-place for arrays
- Recursive approach uses call stack space

**Real-World Applications:**
- External sorting of large files
- Sorting linked lists
- Applications requiring stable sorting
- Parallel and distributed sorting systems
- Database sorting operations`,
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
    detailedNotes: `**How it Works:** Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

**Step-by-Step Process:**
1. Choose a pivot element from the array (various strategies exist)
2. Partition: reorder array so elements smaller than pivot come before it, larger elements come after
3. Recursively apply the same process to the sub-arrays
4. Base case: arrays of size 0 or 1 are already sorted
5. No explicit merge step needed (unlike merge sort)

**When to Use:**
- General-purpose sorting for large datasets
- When average-case performance is more important than worst-case
- In-place sorting is preferred
- Cache-efficient sorting is important
- Most standard library implementations (when not requiring stability)

**Advantages:**
- Very fast in practice (O(n log n) average case)
- In-place sorting (O(log n) extra space)
- Cache-friendly due to sequential access
- Can be optimized with good pivot selection
- Often fastest sorting algorithm in practice

**Disadvantages:**
- Worst case O(n²) with poor pivot selection
- Not stable (relative order may change)
- Recursive implementation uses stack space
- Performance depends on pivot selection strategy

**Real-World Applications:**
- Standard library sorting in many languages (C, C++)
- Database query optimization
- Numerical computations
- Any application requiring fast in-place sorting
- Search engines and information retrieval systems`,
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
    detailedNotes: `**How it Works:** Heap Sort divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region. It uses the heap data structure rather than a linear-time search to find the maximum.

**Step-by-Step Process:**
1. Build a max heap from the input data
2. The largest item is stored at the root of the heap
3. Replace it with the last item of the heap
4. Reduce the heap size by 1
5. Heapify the root of tree
6. Repeat steps 2-5 while size of heap is greater than 1

**When to Use:**
- When guaranteed O(n log n) performance is needed
- Limited space is available (in-place sorting)
- Embedded systems with memory constraints
- Real-time systems requiring predictable performance
- When both time and space efficiency are critical

**Advantages:**
- Guaranteed O(n log n) in all cases
- In-place sorting (O(1) extra space)
- No worst-case scenarios like quicksort
- Not affected by input distribution
- Good for systems with limited memory

**Disadvantages:**
- Not stable (relative order not preserved)
- Slower than quicksort in practice
- Poor cache performance due to scattered memory access
- More complex implementation than simpler sorts

**Real-World Applications:**
- Priority queue implementations
- Operating system schedulers
- Embedded systems with limited memory
- Selection algorithms (finding k largest elements)
- Graph algorithms (Dijkstra's, Prim's)`,
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
    detailedNotes: `**How it Works:** Linear Search is the simplest searching algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched. It doesn't require the data to be sorted and works by comparing each element with the target value.

**Step-by-Step Process:**
1. Start from the leftmost element of array
2. Compare the target element with the current element
3. If they match, return the current index
4. If they don't match, move to the next element
5. Repeat steps 2-4 until match is found or end is reached
6. If element is not found, return -1

**When to Use:**
- Small datasets (typically < 100 elements)
- Unsorted data (sorting would be more expensive)
- One-time searches
- When data structure doesn't support faster searching
- Finding all occurrences of an element

**Advantages:**
- Simple to implement and understand
- Works on unsorted data
- No preprocessing required
- Works on any data structure (arrays, linked lists)
- Can find all occurrences easily
- Best for small datasets

**Disadvantages:**
- Inefficient for large datasets (O(n) time)
- Slower than binary search on sorted data
- Every element might need to be checked

**Real-World Applications:**
- Searching in small unsorted lists
- Finding first occurrence of a value
- Validating data existence
- Simple database queries on small tables
- Finding all instances of an element`,
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
    detailedNotes: `**How it Works:** Binary Search is an efficient algorithm for searching sorted arrays. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, narrow the interval to the lower half. Otherwise, narrow it to the upper half. This process continues until the value is found or the interval is empty.

**Step-by-Step Process:**
1. Compare target with the middle element
2. If target equals middle element, return its position
3. If target is less than middle, search the left half
4. If target is greater than middle, search the right half
5. Repeat steps 1-4 on the chosen half
6. If the interval becomes empty, target is not present

**When to Use:**
- Searching in sorted arrays
- Large datasets requiring fast searches
- When multiple searches will be performed
- Dictionary or phone book-like applications
- Database indexing

**Advantages:**
- Very efficient - O(log n) time complexity
- Faster than linear search for large datasets
- Predictable performance
- Simple iterative or recursive implementation
- Used as basis for many advanced algorithms

**Disadvantages:**
- Requires sorted data (preprocessing cost)
- Only works on data structures with random access
- Not suitable for linked lists
- Cannot find all occurrences efficiently

**Real-World Applications:**
- Database indexing and searching
- Dictionary applications
- Finding elements in sorted arrays
- Debugging (finding bug introduction point in version control)
- Finding square roots and other numerical computations`,
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
    detailedNotes: `**How it Works:** Jump Search is a searching algorithm for sorted arrays. The basic idea is to check fewer elements than linear search by jumping ahead by fixed steps. When we find an interval where the target should be, we perform a linear search in that interval.

**Step-by-Step Process:**
1. Determine the optimal jump size (usually √n)
2. Jump through the array by this step size
3. When we find an element greater than target, stop jumping
4. Perform linear search backward from current position
5. Either find the element or determine it doesn't exist

**When to Use:**
- Searching sorted arrays
- When binary search might be overkill
- Systems where jumping backward is costly
- As an alternative to binary search on sorted data
- When you need a simpler algorithm than binary search

**Advantages:**
- Better than linear search for large arrays
- Simpler than binary search
- Works well when jumping backward is expensive
- Optimal jump size of √n gives good performance
- Less number of comparisons than linear search

**Disadvantages:**
- Slower than binary search (O(√n) vs O(log n))
- Still requires sorted array
- Only works with random-access data structures
- Not commonly used in practice

**Real-World Applications:**
- Searching in systems with slow backward movement
- Alternative to binary search in some scenarios
- Educational purposes to understand search algorithms
- Specialized hardware where jumping is efficient`,
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
    detailedNotes: `**How it Works:** Breadth-First Search explores a graph level by level. Starting from a source vertex, it visits all vertices at the present depth before moving to vertices at the next depth level. It uses a queue data structure to keep track of vertices to be explored.

**Step-by-Step Process:**
1. Start at the root (or any arbitrary node)
2. Mark the starting node as visited and enqueue it
3. Dequeue a vertex and examine it
4. For each unvisited adjacent vertex, mark it as visited and enqueue it
5. Repeat steps 3-4 until queue is empty
6. All reachable vertices are now visited

**When to Use:**
- Finding shortest path in unweighted graphs
- Finding all nodes within one connected component
- Testing if a graph is bipartite
- Finding the shortest path between two nodes
- Web crawlers (crawling web pages level by level)
- Social network analysis (friends at different levels)

**Advantages:**
- Finds shortest path in unweighted graphs
- Guaranteed to find a solution if one exists
- Complete algorithm (explores all possibilities)
- Good for finding nearest neighbor
- Simple to implement

**Disadvantages:**
- Uses more memory than DFS (stores all vertices at current level)
- Not suitable for very large graphs
- May be slower than DFS for deep graphs
- Requires O(V) space for queue

**Real-World Applications:**
- GPS navigation systems (shortest route)
- Social networking (friend suggestions, degrees of separation)
- Network broadcasting
- Garbage collection (finding reachable objects)
- Solving puzzles (shortest solution)
- Web crawlers`,
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
    detailedNotes: `**How it Works:** Depth-First Search explores a graph by going as deep as possible along each branch before backtracking. It uses a stack (either explicitly or through recursion) to remember where to backtrack when it reaches a dead end.

**Step-by-Step Process:**
1. Start at the root (or arbitrary starting node)
2. Mark the current node as visited
3. Recursively visit the first unvisited adjacent node
4. When no unvisited adjacent nodes exist, backtrack
5. Repeat steps 3-4 until all reachable nodes are visited
6. If graph is disconnected, repeat for unvisited components

**When to Use:**
- Detecting cycles in graphs
- Finding connected components
- Topological sorting
- Solving mazes and puzzles
- Checking if path exists between two nodes
- Backtracking problems (N-Queens, Sudoku)

**Advantages:**
- Uses less memory than BFS
- Better for deep/sparse graphs
- Natural recursive implementation
- Good for detecting cycles
- Finds any solution quickly (not necessarily shortest)

**Disadvantages:**
- May get stuck in infinite loop if graph has cycles (need to track visited)
- Doesn't guarantee shortest path
- Can be slower for finding nearest neighbors
- Recursion can cause stack overflow for deep graphs

**Real-World Applications:**
- Solving mazes and puzzles
- Topological sorting (task scheduling)
- Detecting cycles (deadlock detection)
- Path finding (not shortest, but any path)
- Web crawling (following links deeply)
- Syntax analysis in compilers`,
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
    detailedNotes: `**How it Works:** Dijkstra's Algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights. It works by maintaining a set of visited nodes and continuously selecting the unvisited node with the smallest distance from the source.

**Step-by-Step Process:**
1. Initialize all distances to infinity except source (distance = 0)
2. Select unvisited node with smallest distance
3. For each neighbor, calculate distance through current node
4. If this path is shorter than known distance, update it
5. Mark current node as visited
6. Repeat steps 2-5 until all nodes are visited or destination is reached

**When to Use:**
- Finding shortest path in weighted graphs
- GPS navigation and route planning
- Network routing protocols
- Resource allocation problems
- Any scenario with non-negative weighted edges

**Advantages:**
- Finds optimal shortest path
- Works for graphs with non-negative weights
- Efficient with proper data structures (O((V+E) log V) with min-heap)
- Widely applicable to real-world problems
- Can find shortest path to all nodes from source

**Disadvantages:**
- Doesn't work with negative edge weights
- Can be slow for dense graphs
- Requires priority queue for efficiency
- Not suitable for dynamic graphs (weights change)

**Real-World Applications:**
- GPS and mapping applications (Google Maps)
- Network routing (OSPF protocol)
- Flight route planning
- Robotics path planning
- Telecommunications network optimization
- Social network analysis (shortest connection path)`,
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
    detailedNotes: `**How it Works:** Array access is the operation of retrieving an element from an array using its index. Arrays store elements in contiguous memory locations, allowing direct calculation of any element's memory address using the base address and index.

**Technical Details:**
- Address = Base Address + (Index × Element Size)
- CPU can directly jump to the calculated address
- No traversal or search required
- Random access capability

**When to Use:**
- When you need fast element retrieval
- Random access patterns
- When you know the index of desired element
- Implementing other data structures
- Performance-critical applications

**Advantages:**
- Constant time O(1) access
- Very fast - single memory lookup
- Cache-friendly due to contiguous storage
- Simple and intuitive
- Foundation for many algorithms

**Disadvantages:**
- Requires valid index (out of bounds errors)
- Fixed size in static arrays
- Must know index beforehand

**Real-World Applications:**
- Database record access
- Video game entity management
- Image pixel manipulation
- Scientific computing
- Any application requiring fast random access`,
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
    detailedNotes: `**How it Works:** Array insertion involves adding a new element at a specified position in the array. Elements after the insertion point must be shifted one position to the right to make room for the new element.

**Step-by-Step Process:**
1. Check if array has space (not full)
2. Start from the last element
3. Shift each element one position to the right
4. Continue until reaching the insertion position
5. Place the new element at the insertion position
6. Increase array length by 1

**When to Use:**
- Maintaining sorted order
- Inserting data at specific positions
- Dynamic array operations
- When array order matters

**Advantages:**
- Maintains array order
- Simple operation
- O(1) insertion at end
- Preserves indices of earlier elements

**Disadvantages:**
- O(n) time for arbitrary position insertion
- Expensive for large arrays
- May require array resizing
- All subsequent elements must be shifted

**Real-World Applications:**
- Maintaining sorted lists
- Inserting records in databases
- Text editor operations
- Implementing priority queues`,
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
    detailedNotes: `**How it Works:** Array deletion removes an element from a specific position and shifts all subsequent elements one position to the left to fill the gap and maintain array contiguity.

**Step-by-Step Process:**
1. Verify the index is valid
2. Start from the deletion index
3. Shift each subsequent element one position left
4. Continue until reaching the end
5. Decrease array length by 1
6. The last position is now empty/invalid

**When to Use:**
- Removing specific elements from ordered lists
- Cleaning up data structures
- Maintaining array without gaps
- Dynamic array operations

**Advantages:**
- Maintains array order
- No gaps left in array
- Simple operation
- O(1) deletion from end

**Disadvantages:**
- O(n) time for arbitrary position deletion
- Expensive for large arrays
- All subsequent elements must be shifted
- Can be slow for frequent deletions

**Real-World Applications:**
- Removing items from lists
- Database record deletion
- Undo operations in editors
- Maintaining collections`,
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
    detailedNotes: `**How it Works:** Push operation adds a new element to the top of the stack. The stack follows LIFO (Last In, First Out) principle, where the most recently added element is the first one to be removed.

**Step-by-Step Process:**
1. Check if stack is full (for fixed-size stacks)
2. Increment the top pointer
3. Place the new element at the top position
4. Stack size increases by 1

**When to Use:**
- Function call management
- Expression evaluation
- Undo/redo functionality
- Backtracking algorithms
- Managing recursive calls

**Advantages:**
- Constant time O(1) operation
- Very fast
- Simple implementation
- Fundamental operation for many algorithms

**Disadvantages:**
- Can overflow if stack is full
- LIFO access only
- No random access to middle elements

**Real-World Applications:**
- Function call stack in programming
- Browser back button
- Undo operations in applications
- Expression parsing and evaluation
- Depth-first search implementation`,
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
    detailedNotes: `**How it Works:** Pop operation removes and returns the element from the top of the stack. Following LIFO principle, this is the most recently added element.

**Step-by-Step Process:**
1. Check if stack is empty
2. Retrieve the element at top position
3. Decrement the top pointer
4. Return the retrieved element
5. Stack size decreases by 1

**When to Use:**
- Retrieving most recent item
- Implementing backtracking
- Function return operations
- Reversing sequences
- Undo operations

**Advantages:**
- Constant time O(1) operation
- Returns most recent element
- Simple and efficient
- Natural for recursive algorithms

**Disadvantages:**
- Can underflow if stack is empty
- Only accesses top element
- Lost data if not stored elsewhere

**Real-World Applications:**
- Function returns in programming
- Undo functionality
- Backtracking in games/puzzles
- Syntax parsing
- Converting recursion to iteration`,
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
    detailedNotes: `**How it Works:** Peek operation allows viewing the top element of the stack without removing it. This is useful when you need to check the top element before deciding whether to pop it.

**Step-by-Step Process:**
1. Check if stack is empty
2. Return the element at top position
3. No modification to stack structure
4. Top pointer remains unchanged

**When to Use:**
- Checking next element before processing
- Implementing algorithms that need to look ahead
- Validating stack state
- Preview operations

**Advantages:**
- Constant time O(1) operation
- Non-destructive operation
- Useful for decision making
- No side effects

**Disadvantages:**
- Limited to top element only
- Can't peek at other elements
- Returns error if stack is empty

**Real-World Applications:**
- Expression evaluation (checking next operator)
- Validating parentheses matching
- Stack-based parsers
- Game state checking`,
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
    detailedNotes: `**How it Works:** Enqueue operation adds a new element to the rear (back) of the queue. Queue follows FIFO (First In, First Out) principle, where the first element added is the first one to be removed.

**Step-by-Step Process:**
1. Check if queue is full (for fixed-size queues)
2. Increment rear pointer
3. Place new element at rear position
4. Queue size increases by 1

**When to Use:**
- Managing tasks in order of arrival
- Breadth-first search
- Buffering data streams
- Request handling systems
- Print job scheduling

**Advantages:**
- Constant time O(1) operation
- Fair ordering (FIFO)
- Natural for many real-world scenarios
- Easy to implement

**Disadvantages:**
- Can overflow if queue is full
- FIFO access only
- May waste space in array implementation

**Real-World Applications:**
- Task scheduling in operating systems
- Print queue management
- Request handling in web servers
- BFS in graphs
- Message queues in distributed systems`,
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
    detailedNotes: `**How it Works:** Dequeue operation removes and returns the element from the front of the queue. This is the oldest element in the queue, following FIFO principle.

**Step-by-Step Process:**
1. Check if queue is empty
2. Retrieve element at front position
3. Increment front pointer
4. Return the retrieved element
5. Queue size decreases by 1

**When to Use:**
- Processing tasks in order
- Implementing BFS
- Managing buffers
- Scheduling systems
- Event handling

**Advantages:**
- Constant time O(1) operation
- Fair processing order
- Predictable behavior
- Efficient for sequential processing

**Disadvantages:**
- Can underflow if queue is empty
- Only accesses front element
- May need circular array to avoid wasted space

**Real-World Applications:**
- CPU task scheduling
- Printer queue processing
- Breadth-first traversal
- Request processing in servers
- Call center queue management`,
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
    detailedNotes: `**How it Works:** Inserting at the head of a linked list involves creating a new node and making it the first node of the list. The new node's next pointer is set to the current head, and then the head pointer is updated to point to the new node.

**Step-by-Step Process:**
1. Create a new node with the data
2. Set new node's next pointer to current head
3. Update head pointer to new node
4. List size increases by 1

**When to Use:**
- Building lists from beginning
- Implementing stacks with linked lists
- When frequent insertions at start are needed
- Maintaining most recent items first

**Advantages:**
- Constant time O(1) operation
- Very fast regardless of list size
- No shifting of elements required
- Efficient for stack operations

**Disadvantages:**
- Changes list order
- Need to maintain head pointer
- Requires pointer manipulation

**Real-World Applications:**
- Implementing stacks
- Maintaining recent history
- Building lists incrementally
- Undo functionality`,
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
    detailedNotes: `**How it Works:** Inserting at the tail adds a new node at the end of the linked list. Without a tail pointer, this requires traversing the entire list to find the last node. With a tail pointer, it becomes an O(1) operation.

**Step-by-Step Process:**
1. Create a new node with the data
2. If list is empty, make it the head
3. Otherwise, traverse to the last node
4. Set last node's next pointer to new node
5. Update tail pointer if maintaining one

**When to Use:**
- Building lists in order
- Implementing queues with linked lists
- Maintaining insertion order
- Appending data sequentially

**Advantages:**
- Maintains insertion order
- O(1) with tail pointer
- Natural for queue operations
- Preserves existing nodes

**Disadvantages:**
- O(n) without tail pointer
- Requires traversal in basic implementation
- Need extra space for tail pointer optimization

**Real-World Applications:**
- Implementing queues
- Building ordered lists
- Maintaining logs in order
- Sequential data processing`,
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
    detailedNotes: `**How it Works:** Deleting a node from a linked list involves finding the node to delete, updating the previous node's next pointer to skip over the deleted node, and freeing the deleted node's memory.

**Step-by-Step Process:**
1. Handle special case if deleting head
2. Traverse list to find node before target
3. Update previous node's next pointer
4. Skip over the node to be deleted
5. Free the deleted node's memory
6. List size decreases by 1

**When to Use:**
- Removing specific data from list
- Cleaning up data structures
- Implementing list-based algorithms
- Memory management

**Advantages:**
- Efficient once node is found
- No shifting of elements
- Only pointer updates needed
- Dynamic size management

**Disadvantages:**
- O(n) time to find node
- Requires traversal
- Must handle special cases (head, tail)
- Pointer manipulation complexity

**Real-World Applications:**
- Removing items from dynamic lists
- Memory management systems
- Maintaining mutable collections
- Implementing custom data structures`,
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
    detailedNotes: `**How it Works:** Searching a linked list involves traversing from the head node and comparing each node's data with the target value until either the value is found or the end of the list is reached.

**Step-by-Step Process:**
1. Start at the head of the list
2. Compare current node's data with target
3. If match found, return the node
4. Move to next node
5. Repeat until match or end of list
6. Return null if not found

**When to Use:**
- Finding specific data in list
- Checking for existence
- Retrieving node references
- Implementing search operations

**Advantages:**
- Simple implementation
- Works with any list structure
- Can find all occurrences
- No preprocessing required

**Disadvantages:**
- O(n) time complexity
- Must traverse sequentially
- No random access
- Slower than array access

**Real-World Applications:**
- Looking up data in lists
- Validating data existence
- Finding records
- Implementing contains operations`,
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
    detailedNotes: `**How it Works:** Inserting into a Binary Search Tree maintains the BST property: left subtree contains smaller values, right subtree contains larger values. The algorithm recursively finds the correct position for the new node.

**BST Property:**
- All values in left subtree < node value
- All values in right subtree > node value
- Both subtrees are also BSTs

**Step-by-Step Process:**
1. Start at root
2. If new value < current node, go left
3. If new value > current node, go right
4. Repeat until finding empty spot
5. Insert new node at that position

**When to Use:**
- Maintaining sorted data with fast search
- Dynamic sets requiring frequent insertions
- Implementing dictionaries/maps
- Range query operations

**Advantages:**
- O(log n) average case for balanced trees
- Maintains sorted order
- Efficient search after insertion
- Simple recursive implementation

**Disadvantages:**
- Can degrade to O(n) if unbalanced
- No guarantee of balance
- Requires balancing for optimal performance

**Real-World Applications:**
- Database indexing
- File system organization
- Autocomplete systems
- Symbol tables in compilers`,
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
    detailedNotes: `**How it Works:** Searching a BST leverages the BST property to efficiently find values. At each node, the algorithm decides to go left or right based on comparing the target with the current node's value, effectively halving the search space at each step.

**Step-by-Step Process:**
1. Start at root
2. Compare target with current node
3. If equal, found the value
4. If target < current, search left subtree
5. If target > current, search right subtree
6. Repeat until found or reach null

**When to Use:**
- Fast searching in dynamic datasets
- Implementing sets and maps
- Range queries
- Finding predecessor/successor

**Advantages:**
- O(log n) average case for balanced trees
- Very efficient for searches
- No preprocessing needed
- Works on dynamic data

**Disadvantages:**
- Can degrade to O(n) if unbalanced
- Requires BST property maintenance
- Recursive implementation uses stack

**Real-World Applications:**
- Database query execution
- Spell checkers
- IP routing tables
- Priority queue implementations`,
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
    detailedNotes: `**How it Works:** Deleting from a BST is more complex than insertion or search. The algorithm must handle three cases: node with no children, one child, or two children. For two children, typically replace with inorder successor (smallest in right subtree).

**Three Cases:**
1. **Leaf node (no children):** Simply remove it
2. **One child:** Replace node with its child
3. **Two children:** Replace with inorder successor/predecessor

**Step-by-Step Process:**
1. Find the node to delete
2. Determine which case applies
3. If leaf, remove node
4. If one child, bypass node
5. If two children, find successor, replace values, delete successor
6. Maintain BST property throughout

**When to Use:**
- Removing data from sorted collections
- Maintaining dynamic BST-based structures
- Implementing mutable sets/maps

**Advantages:**
- Maintains BST property
- O(log n) average case
- Handles all delete scenarios
- Keeps tree structure optimal

**Disadvantages:**
- Complex implementation (three cases)
- Can unbalance tree
- O(n) worst case
- Requires careful pointer manipulation

**Real-World Applications:**
- Database record deletion
- Removing entries from dictionaries
- Maintaining dynamic sorted data
- File system operations`,
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
    detailedNotes: `**How it Works:** Hash table insertion uses a hash function to compute an index from the key, then stores the key-value pair at that index. Collisions (two keys mapping to same index) are handled using techniques like chaining or open addressing.

**Key Concepts:**
- **Hash Function:** Maps keys to array indices
- **Collision:** When two keys hash to same index
- **Load Factor:** Ratio of elements to table size

**Step-by-Step Process:**
1. Compute hash value from key
2. Calculate index: hash(key) % table_size
3. Check for collision at that index
4. If collision, apply collision resolution
5. Store key-value pair

**When to Use:**
- Fast key-value lookups
- Implementing caches
- Counting frequencies
- Removing duplicates
- Database indexing

**Advantages:**
- O(1) average case insertion
- Very fast for lookups
- Flexible key types
- Dynamic sizing possible

**Disadvantages:**
- O(n) worst case with collisions
- Requires good hash function
- Space overhead
- Performance depends on load factor

**Real-World Applications:**
- Database indexing
- Caching systems
- Symbol tables in compilers
- Dictionaries and maps
- Blockchain (cryptocurrency)`,
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
    detailedNotes: `**How it Works:** Hash table search uses the same hash function as insertion to compute the index where a key should be located, then retrieves the value at that index. Collision resolution must match the insertion strategy.

**Step-by-Step Process:**
1. Compute hash value from key
2. Calculate index: hash(key) % table_size
3. Access the index in hash table
4. If collision handling used, follow the chain/probe sequence
5. Return the value if key matches

**When to Use:**
- Fast data retrieval by key
- Checking existence of items
- Implementing caches
- Frequent lookup operations

**Advantages:**
- O(1) average case lookup
- Extremely fast retrieval
- Simple to use
- Works with various data types

**Disadvantages:**
- O(n) worst case with many collisions
- No ordered traversal
- Performance depends on hash function quality
- Requires memory for entire table

**Real-World Applications:**
- Database query optimization
- Web caching
- Compiler symbol resolution
- Spell checkers
- Password verification`,
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
    detailedNotes: `**How it Works:** Hash table deletion removes a key-value pair from the table. The algorithm must handle collision resolution properly - for chaining, remove from the linked list; for open addressing, mark as deleted to maintain probe sequences.

**Step-by-Step Process:**
1. Compute hash value from key
2. Calculate index
3. Find the entry (following collision resolution)
4. Remove the key-value pair
5. Handle deletion marker if using open addressing
6. May need to rehash or resize

**When to Use:**
- Removing entries from maps/dictionaries
- Cache eviction
- Cleaning up temporary data
- Maintaining dynamic collections

**Advantages:**
- O(1) average case deletion
- Efficient removal
- Simple operation
- Maintains other entries

**Disadvantages:**
- O(n) worst case
- Tombstone problem in open addressing
- May need periodic rehashing
- Complex with collision resolution

**Real-World Applications:**
- Cache management
- Session management
- Removing database entries
- Cleaning up expired data`,
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
    detailedNotes: `**How it Works:** Unlike BST, general binary tree insertion doesn't follow any ordering property. Typically, insertion happens at the next available position in level-order (breadth-first) to maintain a complete tree structure.

**Complete Binary Tree:**
- All levels filled except possibly the last
- Last level filled from left to right
- Used in heap implementation

**Step-by-Step Process:**
1. If tree is empty, create root
2. Use level-order traversal (queue)
3. Find first node with empty child
4. Insert new node as left child if available
5. Otherwise insert as right child

**When to Use:**
- Building heap structures
- Maintaining complete binary trees
- When ordering doesn't matter
- Tree-based data storage

**Advantages:**
- Maintains complete tree property
- Predictable structure
- Good for heap operations
- Simple insertion logic

**Disadvantages:**
- O(n) time to find insertion point
- No search benefit
- Requires traversal
- Not optimized for searching

**Real-World Applications:**
- Heap implementation
- Expression trees
- File system hierarchies
- Organization charts`,
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
    detailedNotes: `**How it Works:** Searching in a general binary tree requires checking all nodes since there's no ordering property. Level-order traversal (BFS) is commonly used, which searches layer by layer from root to leaves.

**Step-by-Step Process:**
1. Start at root and add to queue
2. Dequeue node and check value
3. If match found, return node
4. Enqueue left child if exists
5. Enqueue right child if exists
6. Repeat until found or queue empty

**When to Use:**
- Finding nodes in unordered trees
- When tree structure matters more than search speed
- Complete binary trees
- Expression evaluation trees

**Advantages:**
- Finds any existing node
- Level-order gives breadth-first results
- Guaranteed to find if exists
- Simple to implement

**Disadvantages:**
- O(n) time complexity
- Must check all nodes potentially
- No optimization possible
- Memory intensive (queue storage)

**Real-World Applications:**
- File system searches
- Organizational hierarchy lookups
- Expression tree evaluation
- DOM tree manipulation`,
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
    detailedNotes: `**How it Works:** Deleting from a general binary tree involves finding the node to delete, finding the deepest rightmost node, replacing the deleted node's value with the deepest node's value, then deleting the deepest node. This maintains tree structure.

**Step-by-Step Process:**
1. Find the node to be deleted
2. Find the deepest rightmost node
3. Copy deepest node's data to deleted node
4. Delete the deepest node
5. Maintain complete tree property

**When to Use:**
- Removing nodes from complete trees
- Maintaining heap property
- Tree-based data structure maintenance

**Advantages:**
- Maintains complete tree structure
- Suitable for heaps
- Preserves tree properties
- Relatively simple

**Disadvantages:**
- O(n) time complexity
- Requires full tree traversal
- More complex than simple deletion
- Not optimized for specific values

**Real-World Applications:**
- Heap removal operations
- Tree-based priority queues
- Maintaining complete binary trees
- Expression tree modification`,
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
    detailedNotes: `**How it Works:** Tree traversal is the process of visiting all nodes in a tree data structure. Different traversal orders serve different purposes:

**Traversal Types:**

1. **Inorder (Left-Root-Right):**
   - Visit left subtree
   - Visit root
   - Visit right subtree
   - Result: Sorted order for BST

2. **Preorder (Root-Left-Right):**
   - Visit root
   - Visit left subtree
   - Visit right subtree
   - Result: Useful for copying trees

3. **Postorder (Left-Right-Root):**
   - Visit left subtree
   - Visit right subtree
   - Visit root
   - Result: Useful for deletion

4. **Level-order (Breadth-First):**
   - Visit nodes level by level
   - Uses queue
   - Result: Layer-by-layer output

**When to Use:**
- **Inorder:** Sorted output from BST, expression evaluation
- **Preorder:** Tree copying, prefix expression evaluation
- **Postorder:** Tree deletion, postfix expression evaluation
- **Level-order:** Shortest path, level-based operations

**Advantages:**
- Access all nodes systematically
- Different orders for different purposes
- Foundation for many tree algorithms
- Simple recursive implementation

**Disadvantages:**
- O(n) time (must visit all nodes)
- Recursive versions use stack space
- May need extra space for iterative versions

**Real-World Applications:**
- Compiler expression evaluation
- File system traversal
- Serializing/deserializing trees
- Syntax tree processing
- DOM tree manipulation`,
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
