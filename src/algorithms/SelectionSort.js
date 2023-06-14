import React, { useEffect, useState } from 'react';

function SelectionSort({ array, startSorting }) {
    const [pivotIdx, setPivotIdx] = useState(null);
    const [curPtr, setCurPtr] = useState(null);
    const [scanned, setScanned] = useState(null);
    const [sortedArray, setSortedArray] = useState([...array]);

    useEffect(() => {
      setSortedArray([...array]);
      setScanned(null);
    }, [array]);
    
    const selectionSort = async (arr) => {
        for (let i = 0; i < arr.length; i++) {
            setCurPtr(i);
            let min = await findMin(arr, i);
            await new Promise((resolve) => setTimeout(resolve, delay));
            swap(arr, i, min);
            setSortedArray([...arr]);
        }
    };
  
    const findMin = async (arr, i) => {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                min = j;
            }
        }
        setPivotIdx(min);
        return min;
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
    
    const delay = 5; // Delay in milliseconds
    
    useEffect(() => {
      const sort = async () => {
        if (startSorting) {
          await selectionSort(sortedArray);
          scanOnce();
          setScanned(null);
          setPivotIdx(null);
          setCurPtr(null);
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
            className={`array-bar ${curPtr === index ? 'pivot' : ''} ${pivotIdx === index ? 'smallest' : ''} ${scanned >= index && scanned !== null ? 'sorted' : ''}`}
            style={{ height: `${value}px`, width: `${100 / sortedArray.length}%` }}
          />
        ))}
        </>
    );
}

export default SelectionSort;
