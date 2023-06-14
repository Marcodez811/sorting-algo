import React, { useEffect, useState } from 'react';

function QuickSort({ array, startSorting }) {
    const [pivotIdx, setPivotIdx] = useState(null);
    const [scanned, setScanned] = useState(null);
    const [sortedArray, setSortedArray] = useState([...array]);

    useEffect(() => {
      setSortedArray([...array]);
      setScanned(null);
    }, [array]);
    
    const quickSort = async (arr, l, h) => {
      if (h > l) {
        let m = await partition(arr, l, h);
        await quickSort(arr, l, m - 1);
        await quickSort(arr, m + 1, h);
      }
    };
  
    const partition = async (arr, l, h) => {
      let newPivotIdx = Math.floor(Math.random() * (h - l + 1)) + l;
      const pivot = arr[newPivotIdx];
      swap(arr, newPivotIdx, l);
      let i = l;
      for (let j = i + 1; j <= h; j++) {
        if (arr[j] < pivot) {
          swap(arr, i + 1, j);
          setPivotIdx(i);
          setSortedArray([...arr]);
          i++; 
        }
        await new Promise((resolve) => setTimeout(resolve, delay)); // Introduce a delay here
      }
      await new Promise((resolve) => setTimeout(resolve, delay)); // Introduce a delay here
      swap(arr, l, i);
      setSortedArray([...arr]);
      return i;
    };
    
    const swap = (arr, i, j) => {
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    };

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
          await quickSort(sortedArray, 0, sortedArray.length - 1);
          scanOnce();
          setScanned(null);
          setPivotIdx(null);
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
            className={`array-bar ${pivotIdx === index ? 'pivot' : ''} ${scanned >= index && scanned !== null ? 'sorted' : ''}`}
            style={{ height: `${value}px`, width: `${100 / sortedArray.length}%` }}
          />
        ))}
        </>
    );
}

export default QuickSort;
