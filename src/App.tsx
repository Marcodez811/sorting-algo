import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function App() {
  const [arrLength, setArrLength] = useState(100);
  const [arr, setArr] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);

  const shuffleArray = (arr: number[]) => {
      let currentIndex = arr.length, randomIndex, tempValue;
      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          tempValue = arr[currentIndex];
          arr[currentIndex] = arr[randomIndex];
          arr[randomIndex] = tempValue;
      }
      return arr;
  };

  const generateArray = () => {
      const arr = Array.from({ length: arrLength }, (_, i) => i);
      const max = arr[arr.length - 1];
      return shuffleArray(arr.map(item => (item / max) * 100));
  };
  
  useEffect(() => {
    setArr(generateArray());
  }, [arrLength]);

  const handleRegenerate = () => {
    setArr(generateArray());
  };

  const handleSliderChange = (value: number[]) => {
    setArrLength(value[0]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
      let newArr = [...arr]
      for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < newArr.length - i - 1; j++) {
          if (newArr[j] > newArr[j + 1]) {
            let temp = newArr[j]
            newArr[j] = newArr[j + 1]
            newArr[j + 1] = temp
            setArr([...newArr])
            await sleep(1)
          }
        }
      }
  }

  const quickSort = async () => {
    await quickSortAlgo(arr, 0, arr.length - 1);
  };

  const swap = (arr: number[], i: number, j: number) => {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  };

  const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
          if (arr[j] < pivot) {
              i++;
              swap(arr, i, j); 
              setArr([...arr]);
              await sleep(1);
          }
      }
      swap(arr, i + 1, high);
      setArr([...arr]);
      return i + 1
  };

  const quickSortAlgo = async (arr: number[], low: number, high: number) => {
      if (low < high) {
          const pivotIdx = await partition(arr, low, high);
          await quickSortAlgo(arr, low, pivotIdx - 1);
          await quickSortAlgo(arr, pivotIdx + 1, high);
      }
  };

  const selectionSort = async () => {
    let newArr = [...arr]
    for (let i = 0; i < newArr.length; i++) {
      let minIdx = i
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[j] < newArr[minIdx]) {
          minIdx = j
        }
      }
      let temp = newArr[i]
      newArr[i] = newArr[minIdx]
      newArr[minIdx] = temp
      setArr([...newArr])
      await sleep(1)
    }
  }

  const insertionSort = async () => {
    let newArr = [...arr]
    for (let i = 1; i < newArr.length; i++) {
      let key = newArr[i]
      let j = i - 1
      while (j >= 0 && newArr[j] > key) {
        newArr[j + 1] = newArr[j]
        j = j - 1
        setArr([...newArr])
        await sleep(1)
      }
      newArr[j + 1] = key
    }
  }

  const mergeSort = async() => {
      await mergeSortAlgo(arr, 0, arr.length - 1);
  }

  const mergeSortAlgo = async (arr, left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortAlgo(arr, left, mid);
    await mergeSortAlgo(arr, mid + 1, right);
    setArr([...arr])
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1); 
    const rightArr = arr.slice(mid + 1, right + 1); 
    let i = 0; // Index for leftArr
    let j = 0; // Index for rightArr
    let k = left; // Index for arr
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
      setArr([...arr]); // Update the state after each merge step
      await sleep(1); // Visualize the merge process (adjust timing)
    }
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
    setArr([...arr]);
  };


  const handleSort = async () => {
    setIsSorting(true)
    switch (algorithm) {
      case "bubble":
        await bubbleSort();
        break;
      case "selection":
        await selectionSort();
        break;
      case "insertion":
        await insertionSort();
        break;
      case "quick":
        await quickSort();
        break;
      case "merge":
        await mergeSort();
        break;
    }
    setIsSorting(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 dark">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 border border-green-500">
        <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">Sorting Visualizer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label htmlFor="array-length" className="block text-sm font-medium text-green-300">
              Array Length: {arrLength}
            </label>
            <Slider
              id="array-length"
              min={10}
              max={500}
              step={10}
              value={[arrLength]}
              onValueChange={handleSliderChange}
              className="w-full"
              disabled={isSorting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="algorithm" className="block text-sm font-medium text-green-300">
              Algorithm
            </label>
            <Select onValueChange={setAlgorithm} value={algorithm} disabled={isSorting}>
              <SelectTrigger id="algorithm" className="w-full bg-gray-700 border-green-500 text-green-300">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-green-500">
                <SelectItem value="bubble" className="text-green-300">Bubble Sort</SelectItem>
                <SelectItem value="selection" className="text-green-300">Selection Sort</SelectItem>
                <SelectItem value="insertion" className="text-green-300">Insertion Sort</SelectItem>
                <SelectItem value="quick" className="text-green-300">Quick Sort</SelectItem>
                <SelectItem value="merge" className="text-green-300">Merge Sort</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <Button 
            onClick={handleRegenerate} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
            disabled={isSorting}
          >
            Regenerate Array
          </Button>
          <Button 
            onClick={handleSort} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
            disabled={isSorting}
          >
            {isSorting ? 'Sorting...' : 'Sort'}
          </Button>
        </div>
        <div className="w-full h-[400px] flex items-end bg-gray-900 border border-green-500 rounded-lg shadow-inner overflow-hidden">
          {arr.map((item, index) => (
            <div
              key={index}
              className="bg-green-500 hover:bg-green-400 transition-colors"
              style={{
                width: `${100 / arrLength}%`,
                height: `${item}%`,
              }}
              title={`Value: ${item}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}