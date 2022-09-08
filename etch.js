let mode = "Black";
let gridLines = true;
let currentSize = 32;
let clickedToAddColor = false;

const grid = document.getElementById('grid');
const colorPicker = document.getElementById("color");
const blackButton = document.getElementById("blackButton");
const colorfulButton = document.getElementById("colorfulButton");
const eraseButton = document.getElementById("eraseButton");
const toggleGridButton = document.getElementById("toggleGridButton")
const clearGridButton = document.getElementById("clearButton");
const sliderText = document.getElementById("sizeText");
const slider = document.getElementById("myRange");

colorPicker.addEventListener('change', (e) => chooseMode(e.target.value))
blackButton.addEventListener('click', () => chooseMode('Black'));
colorfulButton.addEventListener('click', () => chooseMode('Colorful'));
eraseButton.addEventListener('click', () => chooseMode('Erase'));
toggleGridButton.addEventListener('click', () => toggleGridLines());
clearGridButton.addEventListener('click', () => changeGridSize(currentSize));

slider.oninput = (e) => {updateSizeValue(e.target.value)};
slider.onchange = (e) => {changeGridSize(parseInt(e.target.value))}


// Functions
const clearGrid = () => {
    grid.innerHTML = '';
    clickedToAddColor = false;
}

const updateSizeValue = (new_val) => {
    currentSize = new_val;
    sliderText.textContent = `${new_val} by ${new_val}`;
}

const setupGrid = (new_size) => {
    grid.style.gridTemplateColumns = `repeat(${new_size} , 1fr)`;
    grid.style.gridTemplateRows = `repeat(${new_size} , 1fr)`;


    for (let i = 0; i < new_size * new_size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.className = "gridSquare";
        gridSquare.addEventListener('click', (e) => {clickedToAddColor = !clickedToAddColor;});
        gridSquare.addEventListener('mouseleave', (e) => addColor(e.target));
        grid.appendChild(gridSquare);
    }
}

const chooseMode = (new_mode) => {
    clickedToAddColor = false;
    if (new_mode === "Black") {
        mode = new_mode
        blackButton.classList.add("active");
        colorfulButton.classList.remove("active");
        eraseButton.classList.remove("active");

    }
    else if (new_mode === 'Colorful') {
        mode = new_mode;
        colorfulButton.classList.add("active");
        blackButton.classList.remove("active");
        eraseButton.classList.remove("active");

    }
    else if (new_mode === 'Erase') {
        mode = new_mode;
        eraseButton.classList.add("active");
        colorfulButton.classList.remove("active");
        blackButton.classList.remove("active");
    }
    else {
        mode = new_mode;
        blackButton.classList.remove("active");
        colorfulButton.classList.remove("active");
        eraseButton.classList.remove("active");

    }
}


const addColor = (gridSquare) => {
    if (clickedToAddColor) {
        if (mode === "Black") {
            gridSquare.style.backgroundColor = "black";
            gridSquare.style.border = "none";
        }
        else if (mode === "Colorful") {
            var x = Math.floor(Math.random() * 256);
            var y = Math.floor(Math.random() * 256);
            var z = Math.floor(Math.random() * 256);
            var RGBColor = "rgb(" + x + "," + y + "," + z + ")";
            gridSquare.style.backgroundColor = RGBColor;
            gridSquare.style.border = "none";
        }
        else if (mode === "Erase") {
            gridSquare.style.backgroundColor = "white";
            gridSquare.style.border =  "1px dotted lightgray";

        }
        else {
            // mode was set by the colorpicker, mode is set to a hex code value
            gridSquare.style.backgroundColor = mode;
            gridSquare.style.border = "none";
        }
    }
}

const changeGridSize = (new_size) => {
    clearGrid();
    setupGrid(new_size);
}

const toggleGridLines = () => {
    let gridItems = document.querySelectorAll('.gridSquare');

    gridItems.forEach(gridItem => {
        if (gridLines) {
            gridItem.style.border = "none";
        }
        else {
            gridItem.style.border = "1px dotted lightgray";
        }
    })
    gridLines = !gridLines;

}

window.onload = () => {
    setupGrid(32);
    chooseMode("Black");
  }