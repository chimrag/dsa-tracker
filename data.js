// ─── DSA TOPICS DATA ───────────────────────────────────────────────────────
// Edit this file to add topics, questions, or update content.
// Each topic has: id, name, prereq (topic id or null), why, sections[]
// Each section has: title, questions[]
// Each question has: name, tag ("easy"|"medium"|"hard"), concept, leetcode (url)

const TOPICS = [
  {
    id: "arrays",
    name: "Arrays & Strings",
    icon: "▦",
    prereq: null,
    why: "Foundation of everything. Most interview questions involve arrays in some form — master this first.",
    sections: [
      {
        title: "Core mechanics",
        questions: [
          { name: "Two Sum", tag: "easy", leetcode: "https://leetcode.com/problems/two-sum/", concept: "Hash map for O(n) lookup. For each element, check if complement exists in map. Key pattern: store index alongside value." },
          { name: "Best Time to Buy & Sell Stock", tag: "easy", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", concept: "Track running minimum and maximum profit in one pass. No nested loops needed." },
          { name: "Contains Duplicate", tag: "easy", leetcode: "https://leetcode.com/problems/contains-duplicate/", concept: "Hash set: add elements one by one, return true if element already exists." },
          { name: "Maximum Subarray (Kadane's)", tag: "medium", leetcode: "https://leetcode.com/problems/maximum-subarray/", concept: "dp[i] = max(nums[i], dp[i-1] + nums[i]). If previous sum is negative, restart from current element." },
          { name: "Product of Array Except Self", tag: "medium", leetcode: "https://leetcode.com/problems/product-of-array-except-self/", concept: "Two-pass prefix+suffix product. First pass: prefix products. Second: multiply by suffix running product. No division needed." }
        ]
      },
      {
        title: "Two pointer & sliding window",
        questions: [
          { name: "Longest Substring Without Repeating", tag: "medium", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", concept: "Sliding window + hash map storing last seen index. Move left pointer to lastSeen[char]+1 when duplicate found." },
          { name: "3Sum", tag: "medium", leetcode: "https://leetcode.com/problems/3sum/", concept: "Sort first. Fix one element, use two pointers from both ends. Skip duplicates to avoid repeated triplets." },
          { name: "Container With Most Water", tag: "medium", leetcode: "https://leetcode.com/problems/container-with-most-water/", concept: "Two pointer: always move the shorter side inward — moving the taller side can never increase area." },
          { name: "Minimum Window Substring", tag: "hard", leetcode: "https://leetcode.com/problems/minimum-window-substring/", concept: "Sliding window with character frequency matching. Expand right, shrink left only when window is valid. Track 'have' vs 'need' counts." },
          { name: "Trapping Rain Water", tag: "hard", leetcode: "https://leetcode.com/problems/trapping-rain-water/", concept: "Two pointer: maintain maxLeft and maxRight. Water at index i = min(maxL, maxR) - height[i]. Move the lower-max pointer inward." }
        ]
      },
      {
        title: "Mastery check",
        questions: [
          { name: "Rotate Array", tag: "medium", leetcode: "https://leetcode.com/problems/rotate-array/", concept: "Reverse trick: reverse entire array, reverse first k elements, reverse remaining. O(1) space." },
          { name: "Find Minimum in Rotated Sorted Array", tag: "medium", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", concept: "Binary search: if mid > right, minimum is in right half. Otherwise in left half including mid." }
        ]
      }
    ]
  },
  {
    id: "hashing",
    name: "Hashing",
    icon: "⬡",
    prereq: "arrays",
    why: "Reduces O(n²) brute force to O(n). Almost every optimised solution uses a hash map or set.",
    sections: [
      {
        title: "Core mechanics",
        questions: [
          { name: "Valid Anagram", tag: "easy", leetcode: "https://leetcode.com/problems/valid-anagram/", concept: "Character frequency count. Two strings are anagrams if all 26 character counts match." },
          { name: "Group Anagrams", tag: "medium", leetcode: "https://leetcode.com/problems/group-anagrams/", concept: "Use sorted word as hash key. All anagrams share the same sorted representation." },
          { name: "Top K Frequent Elements", tag: "medium", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/", concept: "Frequency map + bucket sort by frequency. Bucket index = frequency, collect from top." },
          { name: "Subarray Sum Equals K", tag: "medium", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/", concept: "Prefix sum + map. count[prefixSum - k] = number of subarrays ending here with sum k." }
        ]
      },
      {
        title: "Design",
        questions: [
          { name: "Design HashMap", tag: "medium", leetcode: "https://leetcode.com/problems/design-hashmap/", concept: "Array of linked lists for chaining. Hash function: key % capacity. Resize at high load factor." },
          { name: "LRU Cache", tag: "hard", leetcode: "https://leetcode.com/problems/lru-cache/", concept: "Doubly linked list + hash map. O(1) get and put. Dummy head/tail simplify edge cases." },
          { name: "Two Sum II (sorted array)", tag: "medium", leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", concept: "Two pointers: if sum > target move right left, if sum < target move left right." }
        ]
      }
    ]
  },
  {
    id: "stacks",
    name: "Stacks",
    icon: "⬆",
    prereq: "arrays",
    why: "Essential for parsing, undo operations, expression evaluation, and monotonic problems.",
    sections: [
      {
        title: "Core mechanics",
        questions: [
          { name: "Valid Parentheses", tag: "easy", leetcode: "https://leetcode.com/problems/valid-parentheses/", concept: "Push open brackets. On close bracket, pop and check match. Stack empty at end = valid." },
          { name: "Min Stack", tag: "medium", leetcode: "https://leetcode.com/problems/min-stack/", concept: "Parallel stack tracking minimums. On push: append min(val, current_min) to min_stack." },
          { name: "Evaluate Reverse Polish Notation", tag: "medium", leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", concept: "Push numbers. On operator, pop two operands and push result. Watch division truncation direction." },
          { name: "Daily Temperatures", tag: "medium", leetcode: "https://leetcode.com/problems/daily-temperatures/", concept: "Monotonic decreasing stack of indices. Pop and compute answer when warmer temperature found." }
        ]
      },
      {
        title: "Monotonic stack",
        questions: [
          { name: "Next Greater Element I", tag: "easy", leetcode: "https://leetcode.com/problems/next-greater-element-i/", concept: "Monotonic stack on nums2, store results in hash map, lookup for nums1 elements." },
          { name: "Car Fleet", tag: "medium", leetcode: "https://leetcode.com/problems/car-fleet/", concept: "Sort by position desc. Compute time to target. If a car catches up to the one ahead, same fleet (pop)." },
          { name: "Largest Rectangle in Histogram", tag: "hard", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/", concept: "Monotonic increasing stack of indices. Pop when shorter bar found, compute area with popped height and distance to new top." },
          { name: "Decode String", tag: "medium", leetcode: "https://leetcode.com/problems/decode-string/", concept: "Two stacks: one for repeat counts, one for built strings. Push on '[', build and multiply on ']'." }
        ]
      },
      {
        title: "Mastery check",
        questions: [
          { name: "Asteroid Collision", tag: "medium", leetcode: "https://leetcode.com/problems/asteroid-collision/", concept: "Positive asteroids always pushed. Negative collides with stack top. Resolve until stable or add." },
          { name: "Remove K Digits", tag: "medium", leetcode: "https://leetcode.com/problems/remove-k-digits/", concept: "Monotonic increasing stack. When current digit < top and k > 0, pop. Handle leading zeros and leftover k." }
        ]
      }
    ]
  },
  {
    id: "queues",
    name: "Queues & Deques",
    icon: "↔",
    prereq: "stacks",
    why: "Core for BFS, level-order traversal, scheduling, and sliding window maximum.",
    sections: [
      {
        title: "Core mechanics",
        questions: [
          { name: "Implement Queue using Stacks", tag: "easy", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/", concept: "Two stacks: inbox and outbox. Transfer inbox→outbox only when outbox empty. Amortised O(1)." },
          { name: "Implement Stack using Queues", tag: "easy", leetcode: "https://leetcode.com/problems/implement-stack-using-queues/", concept: "On every push, rotate queue so new element is at front. O(n) push, O(1) pop." },
          { name: "Number of Recent Calls", tag: "easy", leetcode: "https://leetcode.com/problems/number-of-recent-calls/", concept: "Deque as sliding window. Remove calls with timestamp < t-3000. Return deque size." }
        ]
      },
      {
        title: "BFS patterns",
        questions: [
          { name: "Binary Tree Level Order Traversal", tag: "medium", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/", concept: "BFS with queue. Snapshot queue.size() at start of each level loop — that's your level boundary." },
          { name: "Rotting Oranges", tag: "medium", leetcode: "https://leetcode.com/problems/rotting-oranges/", concept: "Multi-source BFS: seed queue with ALL rotten oranges first. Spread in waves, count minutes." },
          { name: "Walls and Gates", tag: "medium", leetcode: "https://leetcode.com/problems/walls-and-gates/", concept: "Multi-source BFS from all gates simultaneously. Each cell gets shortest distance to any gate." },
          { name: "Sliding Window Maximum", tag: "hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/", concept: "Monotonic deque of indices (decreasing values). Remove out-of-window indices from front, smaller values from back." }
        ]
      }
    ]
  },
  {
    id: "linked-lists",
    name: "Linked Lists",
    icon: "⟶",
    prereq: "arrays",
    why: "Tests pointer manipulation. Teaches memory concepts that matter in systems design.",
    sections: [
      {
        title: "Core mechanics",
        questions: [
          { name: "Reverse Linked List", tag: "easy", leetcode: "https://leetcode.com/problems/reverse-linked-list/", concept: "Three pointers: prev=None, curr=head. Save next, point curr→prev, advance both. Return prev." },
          { name: "Merge Two Sorted Lists", tag: "easy", leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/", concept: "Dummy head simplifies edge cases. Compare heads, advance the smaller one. Attach remainder." },
          { name: "Linked List Cycle", tag: "easy", leetcode: "https://leetcode.com/problems/linked-list-cycle/", concept: "Floyd's algorithm: slow moves 1, fast moves 2. They meet only if cycle exists." },
          { name: "Remove Nth Node From End", tag: "medium", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", concept: "Two pointers n apart. When fast reaches end, slow.next is the target. Dummy head handles edge case." }
        ]
      },
      {
        title: "Advanced pointer work",
        questions: [
          { name: "Reorder List", tag: "medium", leetcode: "https://leetcode.com/problems/reorder-list/", concept: "3 steps: find middle (slow/fast), reverse second half, merge alternating from both halves." },
          { name: "Copy List with Random Pointer", tag: "medium", leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/", concept: "Hash map old→new nodes in pass 1. Wire next and random in pass 2." },
          { name: "Find Duplicate Number", tag: "medium", leetcode: "https://leetcode.com/problems/find-the-duplicate-number/", concept: "Floyd's cycle detection on values as pointers. Phase 1: find intersection. Phase 2: find cycle entry." },
          { name: "Merge K Sorted Lists", tag: "hard", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/", concept: "Min-heap: push head of each list. Pop minimum, push its next. Or divide & conquer: merge pairs." }
        ]
      }
    ]
  },
  {
    id: "binary-search",
    name: "Binary Search",
    icon: "⌖",
    prereq: "arrays",
    why: "O(log n) search on sorted data. Appears in 'find optimal value' problems disguised as non-search problems.",
    sections: [
      {
        title: "Core template",
        questions: [
          { name: "Binary Search", tag: "easy", leetcode: "https://leetcode.com/problems/binary-search/", concept: "lo=0, hi=n-1. mid = lo+(hi-lo)//2 to avoid overflow. Adjust lo or hi based on comparison." },
          { name: "Search a 2D Matrix", tag: "medium", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/", concept: "Treat m×n matrix as flat sorted array. Index to row/col: row=mid//n, col=mid%n." },
          { name: "Koko Eating Bananas", tag: "medium", leetcode: "https://leetcode.com/problems/koko-eating-bananas/", concept: "Binary search on answer (speed k). Check feasibility: sum(ceil(pile/k)) <= h." },
          { name: "Search in Rotated Sorted Array", tag: "medium", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/", concept: "One half is always sorted. Check which half is sorted, decide which half target must be in." }
        ]
      },
      {
        title: "Advanced",
        questions: [
          { name: "Time Based Key-Value Store", tag: "medium", leetcode: "https://leetcode.com/problems/time-based-key-value-store/", concept: "Binary search on timestamps for each key. Find rightmost timestamp <= given time." },
          { name: "Median of Two Sorted Arrays", tag: "hard", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/", concept: "Binary search on partition of smaller array. Ensure maxLeft1 <= minRight2 and maxLeft2 <= minRight1." },
          { name: "Find Peak Element", tag: "medium", leetcode: "https://leetcode.com/problems/find-peak-element/", concept: "If nums[mid] < nums[mid+1], peak is to the right. Otherwise to the left or at mid." }
        ]
      }
    ]
  },
  {
    id: "trees",
    name: "Trees & BSTs",
    icon: "⬡",
    prereq: "linked-lists",
    why: "DFS, recursion, and tree DP are interview staples. Foundation for graphs.",
    sections: [
      {
        title: "Tree traversal",
        questions: [
          { name: "Invert Binary Tree", tag: "easy", leetcode: "https://leetcode.com/problems/invert-binary-tree/", concept: "Swap left and right at every node recursively. One line in Python: root.left, root.right = invert(root.right), invert(root.left)." },
          { name: "Maximum Depth of Binary Tree", tag: "easy", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", concept: "1 + max(depth(left), depth(right)). Base case: null → 0." },
          { name: "Diameter of Binary Tree", tag: "easy", leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/", concept: "At each node: candidate diameter = left_height + right_height. Track global max. Return height not diameter." },
          { name: "Binary Tree Level Order", tag: "medium", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/", concept: "BFS with queue. Snapshot size at level start. Process exactly that many nodes per level." },
          { name: "Path Sum II", tag: "medium", leetcode: "https://leetcode.com/problems/path-sum-ii/", concept: "DFS with backtracking. Add node to path, recurse, pop on return. Record path at leaf when sum matches." }
        ]
      },
      {
        title: "BST properties",
        questions: [
          { name: "Validate Binary Search Tree", tag: "medium", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/", concept: "Pass min/max bounds down recursively. Each node must satisfy min < val < max. Don't just check parent." },
          { name: "Lowest Common Ancestor (BST)", tag: "medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", concept: "If both p,q < root → go left. Both > root → go right. Otherwise current node is LCA." },
          { name: "Kth Smallest in BST", tag: "medium", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", concept: "In-order traversal gives sorted order. Stop at kth element. Iterative with stack avoids full traversal." },
          { name: "Construct Tree from Pre+Inorder", tag: "medium", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", concept: "Root = preorder[0]. Find root in inorder to determine left/right subtree sizes. Recurse." }
        ]
      },
      {
        title: "Mastery check",
        questions: [
          { name: "Binary Tree Maximum Path Sum", tag: "hard", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", concept: "At each node: gain = val + max(0,left) + max(0,right). Update global max. Return val + max(0, max(left,right)) — can't branch upward." },
          { name: "Serialize and Deserialize Tree", tag: "hard", leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", concept: "BFS or pre-order with null markers. Deserialize by reading markers back using queue." }
        ]
      }
    ]
  },
  {
    id: "heaps",
    name: "Heaps & Priority Queues",
    icon: "△",
    prereq: "trees",
    why: "For 'top K' problems and anything needing dynamic min/max. Very frequent in interviews.",
    sections: [
      {
        title: "Core usage",
        questions: [
          { name: "Kth Largest Element in Array", tag: "medium", leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/", concept: "Min-heap of size k. Push each element; if heap > k, pop. Heap top is kth largest." },
          { name: "Last Stone Weight", tag: "easy", leetcode: "https://leetcode.com/problems/last-stone-weight/", concept: "Max-heap. Smash two heaviest stones repeatedly. Push remainder if not equal." },
          { name: "K Closest Points to Origin", tag: "medium", leetcode: "https://leetcode.com/problems/k-closest-points-to-origin/", concept: "Max-heap of size k on distances. Evict farthest when size exceeds k." },
          { name: "Find Median from Data Stream", tag: "hard", leetcode: "https://leetcode.com/problems/find-median-from-data-stream/", concept: "Two heaps: max-heap for lower half, min-heap for upper half. Balance sizes to keep median accessible." }
        ]
      },
      {
        title: "Advanced",
        questions: [
          { name: "Task Scheduler", tag: "medium", leetcode: "https://leetcode.com/problems/task-scheduler/", concept: "Max-heap by frequency. Greedy: always schedule most frequent available task. Fill cooldown with next best." },
          { name: "Merge K Sorted Lists (heap)", tag: "hard", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/", concept: "Min-heap seeded with head of each list. Pop min, push its next pointer. O(N log k)." }
        ]
      }
    ]
  },
  {
    id: "graphs",
    name: "Graphs",
    icon: "◎",
    prereq: "trees",
    why: "Covers DFS, BFS, Union-Find, topological sort, Dijkstra — tested at every top company.",
    sections: [
      {
        title: "DFS & BFS on grids",
        questions: [
          { name: "Number of Islands", tag: "medium", leetcode: "https://leetcode.com/problems/number-of-islands/", concept: "DFS flood-fill from each unvisited '1'. Mark '0' in-place to avoid revisiting." },
          { name: "Max Area of Island", tag: "medium", leetcode: "https://leetcode.com/problems/max-area-of-island/", concept: "DFS returning cell count. Track global max. Mark visited in-place." },
          { name: "Pacific Atlantic Water Flow", tag: "medium", leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow/", concept: "Reverse BFS from both coasts (cells water can flow from). Answer = intersection of two reachable sets." },
          { name: "Word Search", tag: "medium", leetcode: "https://leetcode.com/problems/word-search/", concept: "DFS with backtracking on grid. Mark cell visited with '#', restore on return." }
        ]
      },
      {
        title: "Topological sort & Union-Find",
        questions: [
          { name: "Course Schedule (Cycle Detection)", tag: "medium", leetcode: "https://leetcode.com/problems/course-schedule/", concept: "DFS 3-state: 0=unvisited, 1=visiting, 2=done. Back edge (1→1) means cycle." },
          { name: "Course Schedule II", tag: "medium", leetcode: "https://leetcode.com/problems/course-schedule-ii/", concept: "Topological sort via Kahn's BFS (in-degree array). Or DFS post-order, reverse result." },
          { name: "Number of Connected Components", tag: "medium", leetcode: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", concept: "Union-Find with path compression. Each union reduces component count by 1 if different sets." },
          { name: "Redundant Connection", tag: "medium", leetcode: "https://leetcode.com/problems/redundant-connection/", concept: "Union-Find: if both endpoints already in same set, this edge is redundant." }
        ]
      },
      {
        title: "Shortest paths",
        questions: [
          { name: "Network Delay Time", tag: "medium", leetcode: "https://leetcode.com/problems/network-delay-time/", concept: "Dijkstra with min-heap. Relax edges by updating distance[neighbor] if better path found." },
          { name: "Cheapest Flights Within K Stops", tag: "medium", leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", concept: "Modified Bellman-Ford: run exactly k+1 relaxation rounds. Use copy of dist array to avoid using same-round updates." },
          { name: "Swim in Rising Water", tag: "hard", leetcode: "https://leetcode.com/problems/swim-in-rising-water/", concept: "Dijkstra variant: min-heap, cost = max(current_cost, elevation). Minimize maximum elevation traversed." }
        ]
      }
    ]
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    icon: "⬚",
    prereq: "arrays",
    why: "Optimization problems. Often the deciding factor between intern and full-time offers at top companies.",
    sections: [
      {
        title: "1D DP",
        questions: [
          { name: "Climbing Stairs", tag: "easy", leetcode: "https://leetcode.com/problems/climbing-stairs/", concept: "dp[i] = dp[i-1] + dp[i-2]. Fibonacci. Can optimise to two variables." },
          { name: "House Robber", tag: "medium", leetcode: "https://leetcode.com/problems/house-robber/", concept: "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Cannot rob adjacent houses." },
          { name: "Longest Increasing Subsequence", tag: "medium", leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/", concept: "O(n²): dp[i] = max(dp[j]+1) for j<i where nums[j]<nums[i]. O(n log n): patience sorting with binary search." },
          { name: "Word Break", tag: "medium", leetcode: "https://leetcode.com/problems/word-break/", concept: "dp[i] = true if any dp[j] is true and s[j:i] in wordDict. Build from index 0." }
        ]
      },
      {
        title: "2D DP",
        questions: [
          { name: "Unique Paths", tag: "medium", leetcode: "https://leetcode.com/problems/unique-paths/", concept: "dp[i][j] = dp[i-1][j] + dp[i][j-1]. Optimise to 1D array by updating in-place." },
          { name: "Longest Common Subsequence", tag: "medium", leetcode: "https://leetcode.com/problems/longest-common-subsequence/", concept: "dp[i][j] = dp[i-1][j-1]+1 if chars match, else max(dp[i-1][j], dp[i][j-1])." },
          { name: "Edit Distance", tag: "hard", leetcode: "https://leetcode.com/problems/edit-distance/", concept: "dp[i][j] = min(insert, delete, replace). Replace cost: dp[i-1][j-1] + (chars equal ? 0 : 1)." },
          { name: "Coin Change", tag: "medium", leetcode: "https://leetcode.com/problems/coin-change/", concept: "dp[amount] = min coins. For each amount i: dp[i] = min(dp[i-coin]+1) for all coins. Init with Infinity." }
        ]
      },
      {
        title: "Mastery check",
        questions: [
          { name: "0/1 Knapsack", tag: "medium", leetcode: "https://leetcode.com/problems/partition-equal-subset-sum/", concept: "dp[i][w] = max value using first i items with weight limit w. Optimise to 1D by iterating w backwards." },
          { name: "Longest Palindromic Substring", tag: "medium", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/", concept: "Expand around every center (n centers for odd, n-1 for even). O(n²) time, O(1) space." },
          { name: "Burst Balloons", tag: "hard", leetcode: "https://leetcode.com/problems/burst-balloons/", concept: "Interval DP: think of k as the LAST balloon burst in range [l,r]. dp[l][r] = max(nums[l-1]*nums[k]*nums[r+1] + dp[l][k-1] + dp[k+1][r])." }
        ]
      }
    ]
  }
];
