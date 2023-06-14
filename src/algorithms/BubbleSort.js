import React, { useState, useEffect } from 'react';

function BubbleSort({ array, startSorting }) {
  const [iPtr, setIptr] = useState(null);
  const [jPtr, setJptr] = useState(null);
  const [scanned, setScanned] = useState(null);
  const [sortedArray, setSortedArray] = useState([...array]);

  useEffect(() => {
    setSortedArray([...array]);
    setScanned(null);
  }, [array]);

  const bubbleSort = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (arr[j] > arr[j + 1]) {
          setIptr(j + 1);
          setJptr(j);
          swap(arr, j, j + 1);
        }
        setSortedArray([...sortedArray])
      }
    }
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
        await bubbleSort(sortedArray);
        scanOnce();
        setScanned(null);
        setIptr(null);
        setJptr(null);
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
          className={`array-bar ${jPtr === index ? 'pivot' : ''} ${
            iPtr === index ? 'smallest' : ''
          } ${
            scanned >= index && scanned !== null ? 'sorted' : ''
          }`}
          style={{ height: `${value}px`, width: `${100 / sortedArray.length}%` }}
        />
      ))}
    </>
  );
}

export default BubbleSort;
