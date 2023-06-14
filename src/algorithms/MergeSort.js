import React, { useState, useEffect } from 'react';

function MergeSort({ array, startSorting }) {
  const [sortedArray, setSortedArray] = useState([...array]);
  const [scanned, setScanned] = useState(null);
  const [curPtr, setCurPtr] = useState(null);

  useEffect(() => {
    setSortedArray([...array]);
  }, [array]);

  const mergeSort = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
      setCurPtr(k);
      setSortedArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
      setCurPtr(k);
      setSortedArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
      setCurPtr(k);
      setSortedArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
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
        await mergeSort(sortedArray, 0, sortedArray.length - 1);
        scanOnce();
        setScanned(null);
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
        className={`array-bar ${curPtr === index ? 'pivot' : ''} ${scanned >= index && scanned !== null ? 'sorted' : ''}`}
        style={{ height: `${value}px`, width: `${100 / sortedArray.length}%` }}
      />
    ))}
    </>
);
}

export default MergeSort;