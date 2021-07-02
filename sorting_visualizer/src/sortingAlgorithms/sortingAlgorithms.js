export const bubbleSort = array => {
    //sorts it from smallest to biggest
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length-i-1; j++){
            if(array[j]>array[j+1]){
                swap(array, j, j+1);
            }
        }
    }
    return array;
}

export function bubbleSortAnimations(array){
    //this will be called in SortingVisualizer.jsx
    const animation = [];
    if(array.length<=1){
        return array;
    }
    bubbleSorthelper(animation, array);
    return animation;
}

function bubbleSorthelper(animation, array){
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length-i-1; j++){
            //push twice to color (last 0) and uncolot (last 1)
            animation.push([j, j+1, 0, 0]);
            animation.push([j, j+1, 0, 1]);
            if(array[j]>array[j+1]){
                //1 means swap
                animation.push([j, j+1, 1]);
                swap(array, j, j+1);
            }
        }
    }
}

const swap = (array, x, y) => {
    if(x===y){
        return;
    }
    let temp = array[x];
    array[x] = array[y];
    array[y] = temp;
}

export function heapSortAnimations(array){
    //will be called in main and return animations
    const animation = [];
    if(array.length<=1){
        return array;
    }
    heapSorthelper(array, animation);
    return animation;
}

function heapSorthelper(array, animation){
    //does heap sort
    let n = array.length;

    for(let i=Math.floor(n/2)-1; i>=0; i--){
        heapifyhelper(array, n, i, animation);
    }

    for(let i=n-1; i>=0; i--){
        //largest value goes to the end of the array
        animation.push([i, 0, 1, 0]);
        swap(array, i, 0);
        //rebuild max heap so that largest value at beginning of array
        //use i instead of n because the heap gets smaller as we sort more
        heapifyhelper(array, i, 0, animation);
    }
}

function heapifyhelper(array, n, i, animation){
    //indexes
    let biggest = i;
    let l = 2*i+1;
    let r = 2*i+2;

    //build a max heap
    if(l<n && array[l] > array[biggest]){
        //comparing to the left and right child in heapify
        animation.push([i, l, 0, 0]);
        //push all animations twice to uncolor it
        animation.push([i, l, 0, 1]);
        biggest = l;
    }
    
    if(r<n && array[r] > array[biggest]){
        //comparing to the left and right child in heapify
        animation.push([i, r, 0, 0]);
        //push all animations twice to uncolor it (the last 1 is to uncolor)
        animation.push([i, l, 0, 1]);
        biggest = r;
    }

    if(biggest !== i){
        animation.push([i, biggest, 1, 0]);
        swap(array, i, biggest);
        //must recursively call heapify
        heapifyhelper(array, n, biggest, animation);
    }
}

export function heapSort(array) {
    let n = array.length;

    //building a max heap
    for(let i=Math.floor(n/2)-1; i>=0; i--){
        heapify(array, n, i);
    }

    for(let i=n-1; i>=0; i--){
        //largest value goes to the end of the array
        swap(array, i, 0);
        //rebuild max heap so that largest value at beginning of array
        //use i instead of n because the heap gets smaller as we sort more
        heapify(array, i, 0);
    }

    return array;
}


//n is the size of the array
function heapify(array, n, i){
    //indexes
    let biggest = i;
    let l = 2*i+1;
    let r = 2*i+2;

    //build a max heap
    if(l<n && array[l] > array[biggest]){
        biggest = l;
    }
    
    if(r<n && array[r] > array[biggest]){
        biggest = r;
    }

    if(biggest !== i){
        swap(array, i, biggest);
        //must recursively call heapify
        heapify(array, n, biggest);
    }
}

export function quickSortAnimations(array){
    const animation = [];
    let n = array.length;
    if(n<=1){
        return array;
    }
    quickSortHelper(array, animation, 0, n-1);
    return animation;
}

function quickSortHelper(array, animation, lo, hi){
    //lo = starting index
    //hi = last index
    //pivot should always be initialized to hi
    if(lo<hi){
        let pi = partitionHelper(array, animation, lo, hi);
        quickSortHelper(array, animation, lo, pi-1);
        quickSortHelper(array, animation, pi+1, hi);
    }
    return array;
}

function partitionHelper(array, animation, lo, hi){
    let pivot = array[hi];
    let i = (lo - 1);//i is the location of the smaller elements

    for(let j = lo; j<hi; j++){
        //pushing comparisons twice to color and uncolor
        animation.push([j, hi, 0, 0]);//colors
        animation.push([j, hi, 0, 1]);//uncolors
        if(array[j]<pivot){
            i++;
            //push a swap animation
            animation.push([i, j, 1, 0]);
            swap(array, i, j);
        }
    }
    //push a swap animation
    animation.push([i+1, hi, 1, 0]);
    swap(array, i+1, hi);
    return (i+1);
}

export function quickSort(array, lo, hi){
    //lo = starting index
    //hi = last index
    //pivot should always be initialized to hi
    if(lo<hi){
        let pi = partition(array, lo, hi);
        quickSort(array, lo, pi-1);
        quickSort(array, pi+1, hi);
    }
    return array;
}

function partition(array, lo, hi){
    let pivot = array[hi];
    let i = (lo - 1);//i is the location of the smaller elements

    for(let j = lo; j<hi; j++){
        if(array[j]<pivot){
            i++;
            swap(array, i, j);
        }
    }
    swap(array, i+1, hi);
    return (i+1);
}

export function mergeSortAnimation(array){
    const animation = [];
    if(array.length<=1){
        return array;
    }
    mergeSortHelper(animation, array, 0, array.length-1);
    return animation;

}

function mergeSortHelper(animation, array, l, r){
    //l = start index, initialized at 0
    //r should be max index, initialized at length-1
    if(l===r){
        return;
    }
    if(l<r){
        let m = Math.floor((r-l)/2+l);
        mergeSortHelper(animation, array, l, m);
        mergeSortHelper(animation, array, m+1, r);
        mergeHelper(animation, array, l, m, r);
    }
}

function mergeHelper(animation, array, l, m, r){
    const l_array = [];
    const r_array = [];
    let n1 = m-l+1;
    let n2 = r-m;

    for(let i=0; i<n1; i++){
        l_array.push(array[l + i]);
    }

    for(let j=0; j<n2; j++){
        r_array.push(array[m + 1 + j]);
    }

    let i=0;
    let j=0;
    let k=l;

    while((i<n1)&&(j<n2)){
        animation.push([l+i, m+1+j, 0, 0]);
        animation.push([l+i, m+1+j, 0, 1]);
        if(l_array[i]<=r_array[j]){
            animation.push([l+i, k, 1, l_array[i]]);
            array[k] = l_array[i];
            i++;
        }
        else{
            animation.push([m+1+j, k, 1, r_array[j]]);
            array[k] = r_array[j];
            j++;
        }
        k++;
    }

    while(i<n1){
        animation.push([l+i, k, 0, 0]);
        animation.push([l+i, k, 0, 1]);


        animation.push([l+i, k, 1, l_array[i]]);
        array[k] = l_array[i];
        i++;
        k++;
    }
    
    while(j<n2){
        animation.push([m+1+j, k, 0, 0]);
        animation.push([m+1+j, k, 0, 1]);

        animation.push([m+1+j, k, 1, r_array[j]]);
        array[k] = r_array[j];
        j++;
        k++;
    }
}

export function mergeSort(array, l, r){
    //l = start index, initialized at 0
    //r should be max index, initialized at length-1
    if(l<r){
        let m = Math.floor((r-l)/2+l);
        mergeSort(array, l, m);
        mergeSort(array, m+1, r);
        merge(array, l, m, r);
    }
    return array;
}

function merge(array, l, m, r){
    const l_array = [];
    const r_array = [];
    let n1 = m-l+1;
    let n2 = r-m;

    for(let i=0; i<n1; i++){
        l_array.push(array[l + i]);
    }

    for(let j=0; j<n2; j++){
        r_array.push(array[m + 1 + j]);
    }

    let i=0;
    let j=0;
    let k=l;

    while((i<n1)&&(j<n2)){
        if(l_array[i]<=r_array[j]){
            array[k] = l_array[i];
            i++;
        }
        else{
            array[k] = r_array[j];
            j++;
        }
        k++;
    }

    while(i<n1){
        array[k] = l_array[i];
        i++;
        k++;
    }
    
    while(j<n2){
        array[k] = r_array[j];
        j++;
        k++;
    }
}


export function insertionSort(array){
    
    return array;
}

export function insertionSortAnimations(array){
    if(array.length<=1){
        return array;
    }
    const animation = [];
}