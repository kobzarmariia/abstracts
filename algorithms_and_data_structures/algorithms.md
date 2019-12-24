# Algorithms 

An algorithm is an unambiguous specification of how to solve a class of problems. It is a set of rules that precisely define a sequence of operations.

## Searches

### Linear Search

In computer science, linear search or sequential search is a 
method for finding a target value within a list. It sequentially 
checks each element of the list for the target value until a 
match is found or until all the elements have been searched.
Linear search runs in at worst linear time and makes at most `n` 
comparisons, where `n` is the length of the list. 

![Linear Search](https://www.tutorialspoint.com/data_structures_algorithms/images/linear_search.gif)

**Time Complexity**: `O(n)` - since in worst case we're checking each element exactly once.

### Binary Search (search in sorted array)

In computer science, binary search, also known as half-interval 
search, logarithmic search, or binary chop, is a search algorithm 
that finds the position of a target value within a sorted 
array. Binary search compares the target value to the middle 
element of the array; if they are unequal, the half in which 
the target cannot lie is eliminated and the search continues 
on the remaining half until it is successful. If the search 
ends with the remaining half being empty, the target is not 
in the array.

![Binary Search](https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg)

## Sorting

### Bubble Sort

Bubble sort, sometimes referred to as sinking sort, is a 
simple sorting algorithm that repeatedly steps through 
the list to be sorted, compares each pair of adjacent 
items and swaps them if they are in the wrong order 
(ascending or descending arrangement). The pass through
the list is repeated until no swaps are needed, which 
indicates that the list is sorted.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)


| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Bubble sort**       | n               | n<sup>2</sup>       | n<sup>2</sup>       | 1         | Yes       |           |

### Selection Sort

Selection sort is a sorting algorithm, specifically an 
in-place comparison sort. It has O(n2) time complexity, 
making it inefficient on large lists, and generally 
performs worse than the similar insertion sort. 
Selection sort is noted for its simplicity, and it has 
performance advantages over more complicated algorithms 
in certain situations, particularly where auxiliary 
memory is limited.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/b/b0/Selection_sort_animation.gif)

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif)

| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Selection sort**    | n<sup>2</sup>   | n<sup>2</sup>       | n<sup>2</sup>       | 1         | No        |           |

### Insertion Sort

Insertion sort is a simple sorting algorithm that builds 
the final sorted array (or list) one item at a time. 
It is much less efficient on large lists than more 
advanced algorithms such as quicksort, heapsort, or merge 
sort.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/4/42/Insertion_sort.gif)

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Insertion sort**    | n               | n<sup>2</sup>       | n<sup>2</sup>       | 1         | Yes       |           |

### Merge Sort

In computer science, merge sort (also commonly spelled 
mergesort) is an efficient, general-purpose, 
comparison-based sorting algorithm. Most implementations 
produce a stable sort, which means that the implementation 
preserves the input order of equal elements in the sorted 
output. Mergesort is a divide and conquer algorithm that 
was invented by John von Neumann in 1945.

An example of merge sort. First divide the list into 
the smallest unit (1 element), then compare each 
element with the adjacent list to sort and merge the 
two adjacent lists. Finally all the elements are sorted 
and merged.

![Merge Sort](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

A recursive merge sort algorithm used to sort an array of 7 
integer values. These are the steps a human would take to 
emulate merge sort (top-down).

![Merge Sort](https://upload.wikimedia.org/wikipedia/commons/e/e6/Merge_sort_algorithm_diagram.svg)


| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Merge sort**        | n&nbsp;log(n)   | n&nbsp;log(n)       | n&nbsp;log(n)       | n         | Yes       |           |

### Quicksort (in-place and non-in-place implementations)

Quicksort is a divide and conquer algorithm.
Quicksort first divides a large array into two smaller 
sub-arrays: the low elements and the high elements.
Quicksort can then recursively sort the sub-arrays

The steps are:

1. Pick an element, called a pivot, from the array.
2. Partitioning: reorder the array so that all elements with 
values less than the pivot come before the pivot, while all 
elements with values greater than the pivot come after it 
(equal values can go either way). After this partitioning, 
the pivot is in its final position. This is called the 
partition operation.
3. Recursively apply the above steps to the sub-array of 
elements with smaller values and separately to the 
sub-array of elements with greater values.

Animated visualization of the quicksort algorithm.
The horizontal lines are pivot values.

![Quicksort](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)


| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Quick sort**        | n&nbsp;log(n)   | n&nbsp;log(n)       | n<sup>2</sup>       | log(n)    | No        |  Quicksort is usually done in-place with O(log(n)) stack space |

### Shellsort

Shellsort, also known as Shell sort or Shell's method, 
is an in-place comparison sort. It can be seen as either a 
generalization of sorting by exchange (bubble sort) or sorting 
by insertion (insertion sort). The method starts by sorting 
pairs of elements far apart from each other, then progressively 
reducing the gap between elements to be compared. Starting 
with far apart elements, it can move some out-of-place 
elements into position faster than a simple nearest neighbor 
exchange

![Shellsort](https://upload.wikimedia.org/wikipedia/commons/d/d8/Sorting_shellsort_anim.gif)

![Shellsort](https://www.tutorialspoint.com/data_structures_algorithms/images/shell_sort_gap_4.jpg)

![Shellsort](https://www.tutorialspoint.com/data_structures_algorithms/images/shell_sort_step_1.jpg)

![Shellsort](https://www.tutorialspoint.com/data_structures_algorithms/images/shell_sort_gap_2.jpg)

![Shellsort](https://www.tutorialspoint.com/data_structures_algorithms/images/shell_sort_step_2.jpg)

| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Shell sort**        | n&nbsp;log(n)   | depends on gap sequence   | n&nbsp;(log(n))<sup>2</sup>  | 1         | No         |           
 