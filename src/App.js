import React, { useState, useEffect } from 'react';
import "./styles.css";
import Visualization from './Visualizer';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [array, setArray] = useState(Array.from({ length: 100 }, () => Math.floor(Math.random() * 500) + 1));
  const [start, setStart] = useState(false);
  const generateArray = () => {
    // Generate a new random array
    const newArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500) + 1);
    setArray(newArray);
    setStart(false);
  };
  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    generateArray();
    setStart(false);
  };

  useEffect(() => {
    setStart(false); // Reset the start state when the selected algorithm changes
  }, [selectedAlgorithm, array]);

  return (
    <div className="app">
      <h1 className="app-title">{"Sorting Visualizer".toUpperCase()}</h1>
      <div className="algorithm-selector">
        <button onClick={() => handleAlgorithmSelect('Bubble Sort')}
                style={{ backgroundColor: selectedAlgorithm === 'Bubble Sort' ? '#0056b3' : '' }}>
          Bubble Sort
        </button>
        <button onClick={() => handleAlgorithmSelect('Merge Sort')}
                style={{ backgroundColor: selectedAlgorithm === 'Merge Sort' ? '#0056b3' : '' }}>
          Merge Sort
        </button>
        <button onClick={() => handleAlgorithmSelect('Quick Sort')}
                style={{ backgroundColor: selectedAlgorithm === 'Quick Sort' ? '#0056b3' : '' }}>
          Quick Sort
        </button>
        <button onClick={() => handleAlgorithmSelect('Heap Sort')}
                style={{ backgroundColor: selectedAlgorithm === 'Heap Sort' ? '#0056b3' : '' }}>
          Heap Sort
        </button>
        <button onClick={() => handleAlgorithmSelect('Selection Sort')}
                style={{ backgroundColor: selectedAlgorithm === 'Selection Sort' ? '#0056b3' : '' }}>
          Selection Sort
        </button>
        <button onClick={() => handleAlgorithmSelect('Insertion Sort')}
                style={{ backgroundColor: selectedAlgorithm === 'Insertion Sort' ? '#0056b3' : '' }}>
          Insertion Sort
        </button>
      </div>
      <div className="visualization-container">
        <div className="algo-settings">
          <div className="array-regenerator">
            <button className="regenerate-button" onClick={generateArray}>Generate Array</button>
          </div>
          <div className="algo-init">
            <button className="init-button" onClick={() => setStart(true)}>Start</button>
          </div>
        </div>
        <div className="visualization">
          <Visualization array={array} algo={selectedAlgorithm} startSorting={start}/>
        </div>
      </div>
    </div>
  );
}

export default App;
