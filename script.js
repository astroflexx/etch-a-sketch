let container = document.querySelector('.container');
let button = document.querySelector('.btn');
let clearButton = document.querySelector('.clearButton');
let randomButton = document.querySelector('.randomButton');
let mouseButtonDown = false;
let mouseOverDiv = false;

document.body.addEventListener('mousedown', (e) => {
    mouseButtonDown = true;
});

document.body.addEventListener('mouseup', (e) => {
    mouseButtonDown = false;
})

function getColor() {

    let divColor = [];

    if (randomButton.classList.contains('randomOn')) {
        let randRed = Math.floor(Math.random() * 256);
        let randGreen = Math.floor(Math.random() * 256);
        let randBlue = Math.floor(Math.random() * 256);

        divColor = [randRed, randGreen, randBlue];
    } else {
        divColor = [0, 0, 0];
    }

    return divColor;
}

function changeColor(divElement) {
    if ((mouseButtonDown && mouseOverDiv) || (mouseButtonDown)) {
        let divColor = getColor();
        divElement.style.backgroundColor = `rgb(${divColor[0]}, ${divColor[1]}, ${divColor[2]})`;
    }
}

function changeSize(cnt) {
    let side = Math.floor(500 / cnt);
    let total = cnt * cnt;

    container.style.height = side * cnt + 'px';
    container.style.width = side * cnt + 'px';

    for (let i = 1; i <= total; i++) {
        let newDiv = document.createElement('div');
        newDiv.style.height = side + 'px';
        newDiv.style.width = side + 'px';
        newDiv.style.backgroundColor = 'white';
        newDiv.addEventListener('mouseover', () => {
            mouseOverDiv = true;
            changeColor(newDiv);
        })

        newDiv.addEventListener('mousedown', () => {
            mouseButtonDown = true;
            changeColor(newDiv);
        })

        container.appendChild(newDiv);
    }
}

function requestSize() {
    let userInput = prompt('Enter the new size of the grid (max 100)');

    while (isNaN(userInput) || parseInt(userInput) > 100) {
        alert('Please enter a number from 1 to 100');
        userInput = prompt('Enter the new size of the grid (max 100)');
    }

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    changeSize(userInput);
}

function clearGrid() {
    for (let child of container.children) {
        child.style.backgroundColor = 'white';
    }
}

function randomMode() {
    randomButton.classList.toggle('randomOn');

    if (randomButton.classList.contains('randomOn')) {
        randomButton.textContent = 'Random mode is ON';
    } else {
        randomButton.textContent = 'Random mode is OFF';
    }
}

button.addEventListener('click', requestSize);
clearButton.addEventListener('click', clearGrid);
randomButton.addEventListener('click', randomMode);

changeSize(16);