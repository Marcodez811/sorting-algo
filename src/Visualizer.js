import React, { useEffect, useState } from 'react';
import QuickSort from './algorithms/QuickSort';
import SelectionSort from './algorithms/SelectionSort';
import InsertionSort from './algorithms/InsertionSort';
import BubbleSort from './algorithms/BubbleSort';
import MergeSort from './algorithms/MergeSort';
import HeapSort from './algorithms/HeapSort';

function Visualization({ array, algo, startSorting }) {
  const [arr, setArr] = useState([...array]);

  // if the original array have changed, then generate array button has been triggered
  // so stop everything and return 
  useEffect(() => {
    setArr([...array]);
  }, [array]);
  if (algo === "Quick Sort") {
    return (
      <div className="visualization">
        <QuickSort array={arr} startSorting={startSorting}/>
      </div>
    )
  }
  if (algo === "Selection Sort") {
    return (
      <div className="visualization">
        <SelectionSort array={arr} startSorting={startSorting}/>
      </div>
    )
  }
  if (algo === "Insertion Sort") {
    return (
      <div className="visualization">
        <InsertionSort array={arr} startSorting={startSorting}/>
      </div>
    )
  }
  if (algo === "Bubble Sort") {
    return (
      <div className="visualization">
        <BubbleSort array={arr} startSorting={startSorting}/>
      </div>
    )
  }
  if (algo === "Merge Sort") {
    return (
      <div className="visualization">
        <MergeSort array={arr} startSorting={startSorting}/>
      </div>
    )
  }
  if (algo === "Heap Sort") {
    return (
      <div className="visualization">
        <HeapSort array={arr} startSorting={startSorting}/>
      </div>
    )
  }
  return (
    <div className="visualization">
      {arr.map((value, index) => (
        <div
        key={index}
        className={`array-bar`}
        style={{ height: `${value}px`, width: `${100 / arr.length}%` }}
      />
      ))}
    </div>
  );
}

export default Visualization;
