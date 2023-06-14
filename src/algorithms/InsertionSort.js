import React, { useEffect, useState } from 'react';

function InsertionSort({ array, startSorting }) {
    const [iPtr, setIptr] = useState(null);
    const [jPtr, setJptr] = useState(null);
    const [scanned, setScanned] = useState(null);
    const [sortedArray, setSortedArray] = useState([...array]);

    useEffect(() => {
      setSortedArray([...array]);
      setScanned(null);
    }, [array]);
    
    const insertionSort = async (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let j = i;
            setIptr(i);
            while (j !== 0) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                if (arr[j] >= arr[j - 1]) {
                    break;
                }
                swap(arr, j, j - 1);
                j--;
                setJptr(j);
            }
            setSortedArray([...sortedArray]);
        }
        setSortedArray([...sortedArray]);
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
          await insertionSort(sortedArray);
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
            className={`array-bar ${jPtr === index ? 'smallest' : ''} ${iPtr === index ? 'pivot' : ''} ${scanned >= index && scanned !== null ? 'sorted' : ''}`}
            style={{ height: `${value}px`, width: `${100 / sortedArray.length}%` }}
          />
        ))}
        </>
    );
}

export default InsertionSort;
