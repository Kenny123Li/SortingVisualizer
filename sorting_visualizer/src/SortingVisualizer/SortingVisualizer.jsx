import { render } from '@testing-library/react';
import React from 'react';
import * as SortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js'
import './SortingVisualizer.css';

const BUFFER_TIME = 3;

const NUMBER_OF_ARRAY_BARS = 101;

const MIN_ARRAY_HEIGHT = 5;

const MAX_ARRAY_HEIGHT = 500;

const NORMAL_COLOR = 'chartreuse';

const IN_PROGRESS_COLOR = 'red';

const SORTED_COLOR = 'blueviolet';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array:[],
        };
    }
    componentDidMount() {
        this.resetArray();
    }
    
    resetArray(){
        const array = [];
        for(let i=0; i<NUMBER_OF_ARRAY_BARS; i++){
            let value = randomIntFromInterval(MIN_ARRAY_HEIGHT, MAX_ARRAY_HEIGHT);
            array.push(value);
        }
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i<arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = NORMAL_COLOR;
        }
        this.setState({array});
    }
    
    bubbleSort(){
        // let test_array = this.state.array;
        // let sorted_array = SortingAlgorithms.bubbleSort(this.state.array);
        // let js_sorted_array = this.state.array.slice().sort((a, b)=> a-b);
        //console.log(arraysEqual(sorted_array, js_sorted_array));

        const animations = SortingAlgorithms.bubbleSortAnimations(this.state.array.slice());
        for(let i=0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, swap_value, color_check] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const isColorChange = swap_value===0;
            const color = color_check===0 ? IN_PROGRESS_COLOR : NORMAL_COLOR;

            if(isColorChange){
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*BUFFER_TIME);
            }
            else{
                setTimeout(()=>{
                    const temp_height = barTwoStyle.height;
                    barTwoStyle.height = barOneStyle.height;
                    barOneStyle.height = temp_height;
                }, i*BUFFER_TIME)
            }
            if((i>=animations.length-1)){
                setTimeout(()=>{
                    this.sorted();
                }, (i+1)*BUFFER_TIME);
            }
        }
    }

    quickSort(){
        // let test_array = this.state.array;
        // let n = test_array.length;
        // let sorted_array = SortingAlgorithms.quickSort(this.state.array, 0, n-1);
        // let js_sorted_array = this.state.array.slice().sort((a, b)=> a-b);

        // console.log(arraysEqual(sorted_array, js_sorted_array));

        const animations = SortingAlgorithms.quickSortAnimations(this.state.array.slice());
        for(let i=0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, swap_value, color_check] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const isColorChange = swap_value===0;
            const color = color_check===0 ? IN_PROGRESS_COLOR : NORMAL_COLOR;

            if(isColorChange){
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*BUFFER_TIME);
            }
            else{
                setTimeout(()=>{
                    barOneStyle.backgroundColor = NORMAL_COLOR;
                    barTwoStyle.backgroundColor = NORMAL_COLOR;
                    const temp_height = barTwoStyle.height;
                    barTwoStyle.height = barOneStyle.height;
                    barOneStyle.height = temp_height;
                }, i*BUFFER_TIME)
            }
            if((i>=animations.length-1)){
                setTimeout(()=>{
                    this.sorted();
                }, (i+1)*BUFFER_TIME);
            }
        }
    }
    
    mergeSort(){
        // let test_array = this.state.array;
        // console.log(test_array);
        // let sorted_array = SortingAlgorithms.mergeSort(this.state.array.slice(), 0, test_array.length-1);
        // let js_sorted_array = this.state.array.slice().sort((a, b)=> a-b);

        // console.log(arraysEqual(sorted_array, js_sorted_array));
        // console.log(sorted_array);
        // console.log(js_sorted_array);

        const animations = SortingAlgorithms.mergeSortAnimation(this.state.array.slice());

        for(let i=0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, swap_value, color_check] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const isColorChange = swap_value===0;
            const color = color_check===0 ? IN_PROGRESS_COLOR : NORMAL_COLOR;

            if(isColorChange){
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*BUFFER_TIME);
            }
            else{
                setTimeout(()=>{
                    barTwoStyle.height = `${color_check}px`;
                }, i*BUFFER_TIME)
            }
            if((i>=animations.length-1)){
                setTimeout(()=>{
                    this.sorted();
                }, (i+1)*BUFFER_TIME);
            }
        }
        
    }
    
    heapSort(){
        // let test_array = this.state.array;
        // let sorted_array = SortingAlgorithms.heapSort(this.state.array);
        // let js_sorted_array = this.state.array.slice().sort((a, b)=> a-b);

        // console.log(arraysEqual(sorted_array, js_sorted_array));

        const animations = SortingAlgorithms.heapSortAnimations(this.state.array.slice());
        for(let i=0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, swap_value, color_check] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const isColorChange = swap_value===0;
            const color = color_check===0 ? IN_PROGRESS_COLOR : NORMAL_COLOR;

            if(isColorChange){
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*BUFFER_TIME);
            }
            else{
                setTimeout(()=>{
                    barOneStyle.backgroundColor = NORMAL_COLOR;
                    barTwoStyle.backgroundColor = NORMAL_COLOR;
                    const temp_height = barTwoStyle.height;
                    barTwoStyle.height = barOneStyle.height;
                    barOneStyle.height = temp_height;
                }, i*BUFFER_TIME)
            }
            if((i>=animations.length-1)){
                setTimeout(()=>{
                    this.sorted();
                }, (i+1)*BUFFER_TIME);
            }
        }
    }

    insertionSort(){
        let test_array = this.state.array;
        let sorted_array = SortingAlgorithms.insertionSort(this.state.array);
        let js_sorted_array = this.state.array.slice().sort((a, b)=> a-b);

        console.log(arraysEqual(sorted_array, js_sorted_array));
    }

    selectionSort(){}

    sorted(){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i<NUMBER_OF_ARRAY_BARS; i++){
            setTimeout(()=>{
                arrayBars[i].style.backgroundColor = SORTED_COLOR;
            }, i*BUFFER_TIME);
        }
    }

    render(){
        const {array} = this.state;
    
        return(
            <div className="array-container">
                {array.map((value, idx)=> (
                    <div className="array-bar" 
                    key={idx}
                    style = {{
                        height: `${value}px`,
                        backgroundColor: NORMAL_COLOR,
                        }}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Generate new array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                {/* <div class="slidecontainer">
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange"></input>
                </div> */}
            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function arraysEqual(first, second){
    if(first.length!==second.length){
        return false;
    }
    for(let i=0; i<first.length; i++){
        if(first[i]!==second[i]){
            return false;
        }
    }
    return true;
}