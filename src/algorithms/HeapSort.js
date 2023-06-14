import React, { useEffect, useState } from 'react';

function HeapSort({ array, startSorting }) {
  const [scanned, setScanned] = useState(null);
  const [ptr, setPtr] = useState(null);
  const [sortedArray, setSortedArray] = useState([...array]);

    useEffect(() => {
      setSortedArray([...array]);
      setScanned(null);
    }, [array]);
    
    // the main heapsort function
    const heapSort = async (arr) => {
        await heapify(arr);
        const n = arr.length;
        // while the size of the heap isn't 0 continue doing
        // the swapping and sinking operation.
        for (let i = n - 1; i > 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          setPtr(i);
          swap(arr, 0, i); // Move the largest element (root) to the end of the array
          setSortedArray([...arr]);
          await sink(arr, 0, i); // Restore heap property for the remaining elements
        }      
    }

    // the test for whether a given heap is a max heap;
    const testHeap = (heap) => {
        let passed = true;
        let size = heap.length;
        for (let i = 0; i < size; i++) {
            let left = i * 2 + 1;
            let right = i * 2 + 2;
            if (left >= size) {
              break;
            }        
            let condition;
            if (left < size) {
                if (right < size) {
                    condition = heap[i] >= heap[left] && heap[i] >= heap[right]; 
                    passed = passed && condition;
                } else {
                    condition = heap[i] >= heap[left];
                    passed = passed && condition;
                }
            }
        }
        return passed;
    }

    // converting the array into a heap (in-place)
    const heapify = async (arr) => {
      const n = arr.length;
      for (let i = n - 1; i >= 0; i--) {
        await sink(arr, i, n);
      }
    };
    

    // makes the node sinks down to its supposed position
    const sink = async (arr, parent, size) => {
      let largest = parent;
      let left = 2 * parent + 1;
      let right = 2 * parent + 2;
    
      if (left < size && arr[left] > arr[largest]) {
        largest = left;
      }
      if (right < size && arr[right] > arr[largest]) {
        largest = right;
      }
    
      if (largest !== parent) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        swap(arr, parent, largest);
        setSortedArray([...arr]);
        await sink(arr, largest, size);
      }
    };
    
    
    // swap to items in an array
    const swap = (arr, i, j) => {
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    };

    // scan the array once it's been sorted
    const scanOnce = () => {
      let i = 0;
      const scanInterval = setInterval(() => {
        setScanned(i);
        i++;
        if (i === sortedArray.length) {
          clearInterval(scanInterval);
        }
      }, 10);
    };
    
    const delay = 1; // Delay in milliseconds
    
    useEffect(() => {
      const sort = async () => {
        if (startSorting) {
          await heapSort(sortedArray);
          setPtr(null);
          scanOnce();
        }
      };
      setSortedArray([...array]);
      sort();
    }, [startSorting]);
    
    return (
        <>
        {sortedArray.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${ptr != null && index === ptr ? 'pivot': ''} ${scanned >= index && scanned !== null ? 'sorted' : ''}`}
            style={{ height: `${value}px`, width: `${100 / sortedArray.length}%` }}
          />
        ))}
        </>
    );
}

export default HeapSort;
