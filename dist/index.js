"use strict";
const data = loadJSON("../DO_NOT_TOUCH/data.json"); //Don't delete this line. All your data is here. It does take a few seconds for Replit to load the data because it's so large.
//b02d0fa4c2ad
// LOADING HTML ELEMENTS
const filterDiv = document.getElementById("filterDiv");
// PRICE FILTERS
const lowPrice = document.getElementById("lowPriceBound");
const highPrice = document.getElementById("highPriceBound");
// REVIEW FILTERS
const lowReview = document.getElementById("lowReviewBound");
const highReview = document.getElementById("highReviewBound");
// FILTER BUTTONS
const priceButton = document.getElementById("filterPrice");
const reviewButton = document.getElementById("filterReview");
// FILTERS
const chinese = document.getElementById('Chinese');
const burger = document.getElementById('Burger');
const mexican = document.getElementById('Mexican');
const korean = document.getElementById('Korean');
const japanese = document.getElementById('Japanese');
const coffee = document.getElementById('Coffee');
const italian = document.getElementById('Italian');
const indian = document.getElementById('Indian');
const pizza = document.getElementById('Pizza');
// array that allows iteration through all filter buttons
let filtersArray = [chinese, burger, mexican, korean, japanese, coffee, italian, indian, pizza];
// INPUTS FOR CATEGORY SORTING
const restaurantSort = document.getElementById("Restaurant");
const costSort = document.getElementById("Cost");
const xSort = document.getElementById("X-Coordinate");
const ySort = document.getElementById("Y-Coordinate");
const reviewSort = document.getElementById('Review');
const mapDisplay = document.getElementById("map-display");
const frugalMapDisplay = document.getElementById("frugal-display");
const timeDisplay = document.getElementById("restaurant-list-time-display");
const cellSize = 20;
// Offset for drawing
const OFFSET_X = 25;
const OFFSET_Y = 10;
const scaleX = 2200 / mapDisplay.offsetWidth;
const scaleY = 2200 / mapDisplay.offsetHeight;
let filterRestaurantDisplayStart = 0;
let restaurantDisplayStart = 0;
// initializing array of the filtered indexes
let filteredItems = [];
// original indexes for array display
let displayValues = [];
for (let i = 0; i < data.x.length; i++) {
    displayValues[displayValues.length] = i;
}
function onPageLoad() {
    loadRestaurants(displayValues);
    drawRestaurants(displayValues);
}
// loading values at page load
window.onload = (event) => onPageLoad();
function loadRestaurants(arr) {
    for (let i = 0; i < 5; i++) {
        let index = i + restaurantDisplayStart;
        if (data.storeName[arr[index]] !== undefined) {
            // for the header
            let restaurantHeader = document.getElementById("restaurant-header-" + (i + 1));
            restaurantHeader.innerHTML = data.storeName[arr[index]];
            // displaying rating
            let restaurantRating = document.getElementById("restaurant-rating-" + (i + 1));
            restaurantRating.innerHTML = String(data.review[arr[index]]);
            // displaying rating as a percentage bar
            restaurantRating.style.width = 2 * data.review[arr[index]] * 10 + "%";
            // displaying the price
            let restaurantPrice = document.getElementById("restaurant-price-" + (i + 1));
            restaurantPrice.innerHTML = "$" + String(data.cost[arr[index]]) + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + data.x[arr[index]] * 20 + "m, " + data.y[arr[index]] * 20 + "m";
            // displaying cuisine
            let restaurantCuisine = document.getElementById("restaurant-cuisine-" + (i + 1));
            restaurantCuisine.innerHTML = data.type[arr[index]];
        }
    }
}
function drawRestaurants(arr) {
    for (let i = 0; i < 5; i++) {
        const index = i + restaurantDisplayStart;
        // setting the position based on the data value scaled to the size of the map
        const posX = (data.x[arr[index]] / scaleX) + OFFSET_X;
        const posY = (data.y[arr[index]] / scaleY) + OFFSET_Y;
        const newLocationPing = document.getElementById("restaurant-location-information-" + i);
        newLocationPing.style.left = "" + posX;
        newLocationPing.style.top = "" + posY;
        const newLocationPingName = document.getElementById("restaurant-name-" + i);
        newLocationPingName.innerText = data.storeName[arr[index]];
        const newLocationPingInfo = document.getElementById("restaurant-info-" + i);
        newLocationPingInfo.innerText = data.type[arr[index]] +
            "\n$" + data.cost[arr[index]]
            + "\n" + data.x[arr[index]] + ", " + data.y[arr[index]];
    }
}
function next() {
    // will not allow exceeding the list of restaurants
    if (restaurantDisplayStart >= displayValues.length)
        return;
    // skips to next 5 restaurants on the list
    restaurantDisplayStart += 5;
    onPageLoad(); // reloading restaurants
    // displaying time
    displayTime(0, 0);
}
function last() {
    // will not allow Stack underflow
    if (restaurantDisplayStart === 0)
        return;
    restaurantDisplayStart -= 5;
    onPageLoad(); // reloading filtered restaurants
    // displaying time
    displayTime(0, 0);
}
function displayTime(time, time2) {
    timeDisplay.innerText = "Displayed in " + time + " ms, sorted in " + time2 + " ms";
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for sorting 
// MERGE FUNCTIONS (O(n))
// SORT FUNCTIONS O(log n)
// TOTAL (O(n log n))
function merge(arr1, arr2, arr3, arr4, arr5, arr6, arr7, left, mid, right) {
    // calculation for the array size of the sorted array
    const arraySize = right - left + 1;
    // Temporary arrays for storing merged results
    const sortArr1 = new Array(arraySize);
    const sortArr2 = new Array(arraySize);
    const sortArr3 = new Array(arraySize);
    const sortArr4 = new Array(arraySize);
    const sortArr5 = new Array(arraySize);
    const sortArr6 = new Array(arraySize);
    const sortArr7 = new Array(arraySize);
    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
        let index = k - left;
        if (i > mid) {
            //If left is empty
            sortArr1[index] = arr1[j]; //dump in the values from right
            sortArr2[index] = arr2[j];
            sortArr3[index] = arr3[j];
            sortArr4[index] = arr4[j];
            sortArr5[index] = arr5[j];
            sortArr6[index] = arr6[j];
            sortArr7[index] = arr7[j];
            j++;
        }
        else if (j > right) {
            //If right is empty
            sortArr1[index] = arr1[i]; // dump in values from the left 
            sortArr2[index] = arr2[i]; // dump in values from the left 
            sortArr3[index] = arr3[i]; // dump in values from the left 
            sortArr4[index] = arr4[i]; // dump in values from the left 
            sortArr5[index] = arr5[i]; // dump in values from the left 
            sortArr6[index] = arr6[i]; // dump in values from the left 
            sortArr7[index] = arr7[i]; // dump in values from the left 
            i++;
        }
        // insert lower value out of arr1[i] and arr1[j]
        else if (arr1[i] <= arr1[j]) {
            sortArr1[index] = arr1[i];
            sortArr2[index] = arr2[i];
            sortArr3[index] = arr3[i];
            sortArr4[index] = arr4[i];
            sortArr5[index] = arr5[i];
            sortArr6[index] = arr6[i];
            sortArr7[index] = arr7[i];
            i++;
        }
        else {
            sortArr1[index] = arr1[j];
            sortArr2[index] = arr2[j];
            sortArr3[index] = arr3[j];
            sortArr4[index] = arr4[j];
            sortArr5[index] = arr5[j];
            sortArr6[index] = arr6[j];
            sortArr7[index] = arr7[j];
            j++;
        }
    }
    // merge sorted array back into original array
    for (let k = 0; k < sortArr1.length; k++) {
        arr1[left + k] = sortArr1[k];
        arr2[left + k] = sortArr2[k];
        arr3[left + k] = sortArr3[k];
        arr4[left + k] = sortArr4[k];
        arr5[left + k] = sortArr5[k];
        arr6[left + k] = sortArr6[k];
        arr7[left + k] = sortArr7[k];
    }
    return [arr1, arr2, arr3, arr4, arr5, arr6, arr7];
}
/* l is for left index and r is right index
of the sub-array of arr to be sorted */
function sortAscending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, l = 0, r = arr1.length - 1) {
    if (l === r)
        return [arr1, arr2, arr3, arr4, arr5, arr6, arr7]; // array length is 1
    let mid = Math.floor((r + l) / 2);
    // Sort first and second halves
    sortAscending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, l, mid);
    sortAscending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, mid + 1, r);
    // merge first and second halves
    return merge(arr1, arr2, arr3, arr4, arr5, arr6, arr7, l, mid, r);
}
// SORTING IN DESCENDING ORDER
function mergeDescending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, left, mid, right) {
    const arraySize = right - left + 1;
    // Temporary arrays for storing merged results
    const sortArr1 = new Array(arraySize);
    const sortArr2 = new Array(arraySize);
    const sortArr3 = new Array(arraySize);
    const sortArr4 = new Array(arraySize);
    const sortArr5 = new Array(arraySize);
    const sortArr6 = new Array(arraySize);
    const sortArr7 = new Array(arraySize);
    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
        let index = k - left;
        if (i > mid) {
            //If left is empty
            sortArr1[index] = arr1[j]; //Dump in the values from right
            sortArr2[index] = arr2[j]; //Dump in the values from right
            sortArr3[index] = arr3[j]; //Dump in the values from right
            sortArr4[index] = arr4[j]; //Dump in the values from right
            sortArr5[index] = arr5[j]; //Dump in the values from right
            sortArr6[index] = arr6[j]; //Dump in the values from right
            sortArr7[index] = arr7[j]; //Dump in the values from right
            j++;
        }
        else if (j > right) {
            //If right is empty, dump in values from the left
            sortArr1[index] = arr1[i];
            sortArr2[index] = arr2[i];
            sortArr3[index] = arr3[i];
            sortArr4[index] = arr4[i];
            sortArr5[index] = arr5[i];
            sortArr6[index] = arr6[i];
            sortArr7[index] = arr7[i];
            i++;
        }
        // insert lower value out of arr1[i] and arr1[j]
        else if (arr1[i] >= arr1[j]) {
            sortArr1[index] = arr1[i];
            sortArr2[index] = arr2[i];
            sortArr3[index] = arr3[i];
            sortArr4[index] = arr4[i];
            sortArr5[index] = arr5[i];
            sortArr6[index] = arr6[i];
            sortArr7[index] = arr7[i];
            i++;
        }
        else {
            sortArr1[index] = arr1[j];
            sortArr2[index] = arr2[j];
            sortArr3[index] = arr3[j];
            sortArr4[index] = arr4[j];
            sortArr5[index] = arr5[j];
            sortArr6[index] = arr6[j];
            sortArr7[index] = arr7[j];
            j++;
        }
    }
    // integrate sorted array back into original array
    for (let k = 0; k < sortArr1.length; k++) {
        arr1[left + k] = sortArr1[k];
        arr2[left + k] = sortArr2[k];
        arr3[left + k] = sortArr3[k];
        arr4[left + k] = sortArr4[k];
        arr5[left + k] = sortArr5[k];
        arr6[left + k] = sortArr6[k];
        arr7[left + k] = sortArr7[k];
    }
    return [arr1, arr2, arr3, arr4, arr5, arr6, arr7];
}
/* l is for left index and r is right index
of the sub-array of arr to be sorted */
function sortDescending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, l = 0, r = arr1.length - 1) {
    if (l === r)
        return [arr1, arr2, arr3, arr4, arr5, arr6, arr7]; // array length is 1
    let mid = Math.floor((r + l) / 2);
    // Sort first and second halves
    sortDescending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, l, mid);
    sortDescending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, mid + 1, r);
    // merge halves
    return mergeDescending(arr1, arr2, arr3, arr4, arr5, arr6, arr7, l, mid, r);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SEARCH FUNCTION
function binarySearch(arr, target) {
    // initializing left and right pointers
    let l = 0;
    let r = arr.length - 1;
    while (l <= r) {
        // calculating the middle
        let mid = Math.floor((l + r) / 2);
        if (arr[mid] === target)
            return mid;
        else if (arr[mid] < target)
            l = mid + 1; // target is before arr[mid]
        else
            r = mid - 1; // if target is after arr[mid]
    }
    // if nothing is found
    return -1;
}
// setting search category
let searchCategory = "Restaurant";
function setSearchCategory(category) {
    // fetch button name to be changed on search category change
    const buttonName = document.getElementById("dropdown-button");
    // fetch search value
    let searchInput = document.getElementById("search-input");
    // clears the search value when a category is chosen
    searchInput.value = "";
    buttonName.innerHTML = category;
    searchCategory = category;
}
// O(1)
function search() {
    // fetch search value
    let searchInput = document.getElementById("search-input");
    let searchValue = searchInput.value;
    // sort array
    let array;
    // declaring time stamps
    let sortTimeStamp0 = 0;
    let sortTimeStamp1 = 0;
    let timeStamps = [0, 0];
    let searchTimeStamp0 = 0;
    let searchTimeStamp1 = 0;
    let result = -1; // index where search value will be stored
    // removing all filters
    onSort(null);
    ////////////////////
    // creating search result based on specific search category
    if (searchCategory === "Restaurant") {
        timeStamps = ascendingRestaurant();
        searchTimeStamp0 = performance.now();
        result = binarySearch(data.storeName, searchValue);
        searchTimeStamp1 = performance.now();
    }
    else if (searchCategory === "ID") {
        timeStamps = ascendingID();
        searchTimeStamp0 = performance.now();
        result = binarySearch(data.ID, searchValue);
        searchTimeStamp1 = performance.now();
    }
    else if (searchCategory === "X Location") {
        timeStamps = ascendingX();
        searchTimeStamp0 = performance.now();
        result = binarySearch(data.x, Number(searchValue));
        searchTimeStamp1 = performance.now();
    }
    else if (searchCategory === "Y Location") {
        timeStamps = ascendingY();
        searchTimeStamp0 = performance.now();
        result = binarySearch(data.y, Number(searchValue));
        searchTimeStamp1 = performance.now();
    }
    if (result !== -1) {
        restaurantDisplayStart = result;
        // resets display values to values from original array
        displayValues = Array.from(Array(100000).keys());
        onPageLoad();
        displayTime(searchTimeStamp1 - searchTimeStamp0, timeStamps[1] - timeStamps[0]);
    }
    else {
        alert("Search result not found" + "\n" + "Search Time: " + (searchTimeStamp1 - searchTimeStamp0));
        displayTime(0, 0);
    }
    return result;
}
// resets display for each search
function onSort(buttonID) {
    // removing filters
    removeFilters();
    // array of buttons
    let sortButtonIDs = ["ascendingRestaurant", "ascendingCost", "ascendingReview", "ascendingX", "ascendingY",
        "descendingRestaurant", "descendingCost", "descendingReview", "descendingX", "descendingY"];
    for (let i = 0; i < sortButtonIDs.length; i++) {
        // making all other checkboxes white
        const newID = sortButtonIDs[i];
        const newButton = document.getElementById(newID);
        newButton.style.backgroundColor = "white";
    }
    // change the clicked button to red to indicate that it has been selected
    if (buttonID !== null) {
        const clickedButton = document.getElementById(buttonID);
        clickedButton.style.backgroundColor = "red";
    }
}
// SORTING FUNCTIONS --> all O(1) time complexity (excluding the sorting algorithm function calls)
function ascendingID() {
    let t0 = performance.now();
    let array = sortAscending(data.ID, data.storeName, data.type, data.x, data.y, data.review, data.cost);
    let t1 = performance.now();
    data.ID = array[0];
    data.storeName = array[1];
    data.type = array[2];
    data.x = array[3];
    data.y = array[4];
    data.review = array[5];
    data.cost = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    onSort(null);
    // resetting display
    onPageLoad();
    displayTime(0, t1 - t0);
    return [t0, t1];
}
function ascendingRestaurant() {
    let t0 = performance.now();
    let array = sortAscending(data.storeName, data.ID, data.type, data.x, data.y, data.review, data.cost);
    let t1 = performance.now();
    data.storeName = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.x = array[3];
    data.y = array[4];
    data.review = array[5];
    data.cost = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    onSort("ascendingRestaurant");
    // resetting display
    onPageLoad();
    displayTime(0, t1 - t0);
    return [t0, t1];
}
function ascendingCost() {
    let t0 = performance.now();
    let array = sortAscending(data.cost, data.ID, data.type, data.x, data.y, data.review, data.storeName);
    let t1 = performance.now();
    data.cost = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.x = array[3];
    data.y = array[4];
    data.review = array[5];
    data.storeName = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("ascendingCost");
    onPageLoad();
    displayTime(0, t1 - t0);
    return [t0, t1];
}
function ascendingX() {
    let t0 = performance.now();
    let array = sortAscending(data.x, data.ID, data.type, data.cost, data.y, data.review, data.storeName);
    let t1 = performance.now();
    data.x = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.cost = array[3];
    data.y = array[4];
    data.review = array[5];
    data.storeName = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("ascendingX");
    onPageLoad();
    displayTime(0, t1 - t0);
    return [t0, t1];
}
function ascendingY() {
    let t0 = performance.now();
    let array = sortAscending(data.y, data.ID, data.type, data.cost, data.x, data.review, data.storeName);
    let t1 = performance.now();
    data.y = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.cost = array[3];
    data.x = array[4];
    data.review = array[5];
    data.storeName = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("ascendingY");
    onPageLoad();
    displayTime(0, t1 - t0);
    return [t0, t1];
}
function ascendingReview() {
    let t0 = performance.now();
    let array = sortAscending(data.review, data.ID, data.type, data.cost, data.x, data.y, data.storeName);
    let t1 = performance.now();
    data.review = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.cost = array[3];
    data.x = array[4];
    data.y = array[5];
    data.storeName = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("ascendingReview");
    onPageLoad();
    displayTime(0, t1 - t0);
}
function descendingRestaurant() {
    let t0 = performance.now();
    let array = sortDescending(data.storeName, data.ID, data.type, data.x, data.cost, data.review, data.y);
    let t1 = performance.now();
    // updating each sorted array
    data.storeName = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.x = array[3];
    data.cost = array[4];
    data.review = array[5];
    data.y = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("descendingRestaurant");
    onPageLoad();
    displayTime(0, t1 - t0);
}
function descendingCost() {
    let t0 = performance.now();
    let array = sortDescending(data.cost, data.ID, data.type, data.x, data.y, data.review, data.storeName);
    let t1 = performance.now();
    // updating each sorted array
    data.cost = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.x = array[3];
    data.y = array[4];
    data.review = array[5];
    data.storeName = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("descendingCost");
    onPageLoad();
    displayTime(0, t1 - t0);
}
function descendingX() {
    let t0 = performance.now();
    let array = sortDescending(data.x, data.ID, data.type, data.y, data.cost, data.review, data.storeName);
    let t1 = performance.now();
    // updating each sorted array
    data.x = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.y = array[3];
    data.cost = array[4];
    data.review = array[5];
    data.storeName = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("descendingX");
    onPageLoad();
    displayTime(0, t1 - t0);
}
// Function to sort data based on y-coordinates in descending order
function descendingY() {
    // Start timing the performance
    let t0 = performance.now();
    // Call sortDescending function with data sorted by y-coordinates
    let sortedByRestaurant = sortDescending(data.y, data.ID, data.type, data.x, data.cost, data.review, data.storeName);
    // End timing the performance
    let t1 = performance.now();
    // Updating each property in the data object with the sorted arrays
    data.y = sortedByRestaurant[0];
    data.ID = sortedByRestaurant[1];
    data.type = sortedByRestaurant[2];
    data.x = sortedByRestaurant[3];
    data.cost = sortedByRestaurant[4];
    data.review = sortedByRestaurant[5];
    data.storeName = sortedByRestaurant[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("descendingY");
    // Reload the page to reflect sorted data
    onPageLoad();
    displayTime(0, t1 - t0);
}
// Function to sort data based on reviews in descending order
function descendingReview() {
    // Start timing the performance
    let t0 = performance.now();
    // Call sortDescending function with data sorted by review
    let array = sortDescending(data.review, data.ID, data.type, data.x, data.cost, data.storeName, data.y);
    // End timing the performance
    let t1 = performance.now();
    // Updating each property in the data object with the sorted arrays
    data.review = array[0];
    data.ID = array[1];
    data.type = array[2];
    data.x = array[3];
    data.cost = array[4];
    data.storeName = array[5];
    data.y = array[6];
    // resetting the display values and reloading page
    restaurantDisplayStart = 0;
    // removing filters
    onSort("descendingReview");
    // Reload the page to reflect sorted data
    onPageLoad();
    displayTime(0, t1 - t0);
}
function addFilter(filter, button) {
    for (let i = 0; i < filtersArray.length; i++) {
        if (filtersArray[i].style.backgroundColor === "red") {
            alert("You must remove the previous filters first!");
            return;
        }
    }
    // Initialize an empty array to hold the indices of matching items for chosen filters
    let cuisines = [];
    for (let i = 0; i < displayValues.length; i++) {
        if (data.type[displayValues[i]] === filter) {
            cuisines[cuisines.length] = displayValues[i];
        }
    }
    // changing the background color to indicate the filter has been selected
    button.style.backgroundColor = "red";
    if (cuisines.length > 0)
        displayValues = cuisines;
    else
        alert("No results match your filtered results!");
    // resetting display
    restaurantDisplayStart = 0;
    onPageLoad();
}
function removeFilters() {
    // resets display values to all of the values
    for (let i = 0; i < 100000; i++) {
        displayValues[i] = i;
    }
    // resetting background colour
    for (let i = 0; i < filtersArray.length; i++) {
        filtersArray[i].style.backgroundColor = "white";
    }
    // cleaing price and review filter sections
    lowPrice.value = "";
    highPrice.value = "";
    priceButton.removeAttribute("disabled");
    priceButton.style.backgroundColor = "#04AA6D";
    lowReview.value = "";
    highReview.value = "";
    reviewButton.removeAttribute("disabled");
    reviewButton.style.backgroundColor = "#04AA6D";
    // reloading page
    restaurantDisplayStart = 0;
    onPageLoad();
}
function priceFilter() {
    let priceFilterIndexes = [];
    for (let i = 0; i < data.cost.length; i++) {
        if (Number(lowPrice.value) < data.cost[i] && Number(highPrice.value) > data.cost[i]) {
            priceFilterIndexes[priceFilterIndexes.length] = i;
        }
    }
    intersections(priceFilterIndexes, displayValues, priceButton);
}
function reviewFilter() {
    reviewButton.disabled = true;
    reviewButton.style.backgroundColor = "red";
    let reviewFilterIndexes = [];
    for (let i = 0; i < data.review.length; i++) {
        if (Number(lowReview.value) < data.review[i] && Number(highReview.value) > data.review[i]) {
            reviewFilterIndexes[reviewFilterIndexes.length] = i;
        }
    }
    intersections(reviewFilterIndexes, displayValues, reviewButton);
}
function singleArrayMerge(arr, left, mid, right) {
    let sorted = new Array(right - left + 1);
    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
        let index = k - left;
        // if left array is empty
        if (i > mid) {
            sorted[index] = arr[j]; // dump in values from the right
            j++;
        }
        else if (j > right) {
            // if right array is empty, dump in values from the left
            sorted[index] = arr[i];
            i++;
        }
        // insert the lower value out of arr[i] and arr[j]
        else if (arr[i] <= arr[j]) {
            sorted[index] = arr[i];
            i++;
        }
        else {
            sorted[index] = arr[j];
            j++;
        }
    }
    // readd the sorted array to the original array
    for (let k = 0; k < sorted.length; k++) {
        arr[left + k] = sorted[k];
    }
    return arr;
}
function singleArrayMergeSort(arr, l = 0, r = arr.length - 1) {
    if (arr.length === 0)
        return arr; // handling bad inputs
    if (l === r)
        return arr; // base case for recursion
    let mid = Math.floor((r + l) / 2);
    // sort first and second halves
    singleArrayMergeSort(arr, l, mid);
    singleArrayMergeSort(arr, mid + 1, r);
    // merge halves
    return singleArrayMerge(arr, l, mid, r);
}
// finds the intersections of the display value array and price filter array
function intersections(arr1, arr2, button) {
    let p1 = 0; // iterate through nums1 (slow pointer)
    let p2 = 0; // iterate through nums2 (fast pointer)
    // sorting the arrays
    arr1 = singleArrayMergeSort(arr1);
    arr2 = singleArrayMergeSort(arr2);
    let r = [];
    // iterating through both arrays using the pointers
    while (p1 < arr1.length && p2 < arr2.length) {
        if (arr1[p1] === arr2[p2]) {
            // if they are equal, add both to the r array
            r[r.length] = arr1[p1];
            p1++;
            p2++;
        }
        else if (arr1[p1] < arr2[p2]) {
            p1++;
        }
        else
            p2++;
    }
    // no results found for intersections between price filter and the display values
    if (r.length === 0) {
        alert("Error: No results match your search!");
    }
    else {
        // resetting display
        displayValues = r;
        restaurantDisplayStart = 0;
        // disabling the button
        button.disabled = true;
        button.style.backgroundColor = "red";
        onPageLoad();
    }
}
// FOR BONUS 3
// initializing the points that the user will click
let userPing = 0;
// coordinates of the clicked points
let frugalCoords = [];
frugalMapDisplay.addEventListener("click", (e) => {
    if (userPing < 2) {
        // drawing the point where the user clicks
        const newPing = document.getElementById("travel-ping-" + userPing);
        newPing.removeAttribute("hidden");
        newPing.style.left = "" + (e.offsetX + frugalMapDisplay.offsetLeft - 12);
        newPing.style.top = "" + (e.offsetY + frugalMapDisplay.offsetTop - 12);
        frugalCoords[frugalCoords.length] = [Math.floor(e.offsetX), Math.floor(e.offsetY)];
        if (userPing === 1) {
            let allPoints = createPoints(data.x, data.y);
            let path = findRestaurantsOnPath(allPoints, frugalCoords[0], frugalCoords[1]);
            for (let i = 0; i < 4; i++) {
                const posX = path[i][0];
                const posY = path[i][1];
                const indexOfPoint = path[i + 4][0];
                const newRestaurant = document.getElementById("frugal-location-information-" + i);
                // changing the x and y value based on the locations of pos and posY
                newRestaurant.style.left = "" + (posX + frugalMapDisplay.offsetLeft);
                newRestaurant.style.top = "" + (posY + frugalMapDisplay.offsetTop);
                // changing the information of the restaurant
                const newLocationPingName = document.getElementById("frugal-name-" + i);
                newLocationPingName.innerText = data.storeName[indexOfPoint];
                const newLocationPingInfo = document.getElementById("frugal-info-" + i);
                newLocationPingInfo.innerText = data.type[indexOfPoint] +
                    "\n$" + data.cost[indexOfPoint]
                    + "\n" + data.x[indexOfPoint] + ", " + data.y[indexOfPoint];
                const newRestaurantPing = document.getElementById("frugal-ping-" + i);
                // revealing the points
                newRestaurantPing.removeAttribute("hidden");
            }
            console.log(frugalCoords);
        }
        userPing++;
    }
});
// removes the points on the map
function removeMapPoints() {
    // resets the ping counts
    userPing = 0;
    // iterates through the two pings, hides them
    for (let i = 0; i < 2; i++) {
        const newPing = document.getElementById("travel-ping-" + i);
        newPing.hidden = true;
    }
    // iterating through the four red location pings and hides them
    for (let i = 0; i < 4; i++) {
        const newRestaurantPing = document.getElementById("frugal-ping-" + i);
        newRestaurantPing.hidden = true;
    }
    // resetting the clicked point values
    frugalCoords = [];
}
function createPoints(xValues, yValues) {
    // adding all points given into a double array of coordinates
    let points = [];
    for (let i = 0; i < data.x.length; i++) {
        points[points.length] = [xValues[i], yValues[i]];
    }
    return points;
}
function distance(points1, points2) {
    const dx = points2[0] - points1[0]; // Difference in x coordinates
    const dy = points2[1] - points1[1]; // Difference in y coordinates
    return Math.sqrt(dx * dx + dy * dy); // Return the Euclidean distance
}
function findRestaurantsOnPath(points, start, end) {
    // to store the path
    let path = [];
    // finding total distance between start and end points
    const distanceOfPoints = distance(start, end);
    let i = 0;
    let pathLen = 0;
    // stores points and the index
    while (path.length < 8) {
        if (distance(points[i], start) < distanceOfPoints && distance(points[i], end) < distanceOfPoints) {
            path[pathLen] = points[i];
            path[pathLen + 4] = [i];
            pathLen++;
        }
        i++;
    }
    return path;
}
//# sourceMappingURL=index.js.map