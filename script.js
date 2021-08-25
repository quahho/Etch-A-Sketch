let drawMode = false;
let eraseMode = false;
let actionStarted = false;
let gridActivated = false;
let colorChosen = '#8E8B82';

const grid = document.querySelector('#grid');

function fillGrid(size) {
    const gridLength = 420;
    const unitLength = +(gridLength) / size;

    grid.style.cssText = `grid-template-columns: repeat(${size}, ${unitLength}px); \
                            grid-template-rows: repeat(${size}, ${unitLength}px)`;

    const total = size * size;
    for (let i = 0; i < total; i++) {
        const div = document.createElement('div');
        div.classList.add('unit');
        div.setAttribute("style", `width: ${unitLength}px; height: ${unitLength}px`);
        div.style.width = unitLength;
        div.style.height = unitLength;
        grid.appendChild(div);
    }

    if (drawMode) {
        activateDraw();
    }

    if (eraseMode) {
        activateErase();
    }

    if (gridActivated) {
        toggleGridLines();
    }
}

const picker = document.querySelector('#picker');

picker.addEventListener('input', () => {
    colorChosen = picker.value;
});

function drawSquare(e) {
    if (actionStarted) {
        e.target.style.backgroundColor = colorChosen;
    }
}

function eraseSquare(e) {
    if (actionStarted) {
        e.target.style.backgroundColor = 'white';
    }
}

grid.addEventListener('mousedown', () => {
    if (!actionStarted) {
        actionStarted = true;
    }
    else {
        actionStarted = false;
    }
})

const draw = document.querySelector('#draw');

function activateDraw() {
    drawMode = true;
    draw.classList.add('toggle');

    const squares = document.querySelectorAll('.unit');

    squares.forEach(square => {
        square.addEventListener('mouseover', drawSquare);
    });
}

function deactivateDraw() {
    drawMode = false;
    draw.classList.remove('toggle');

    const squares = document.querySelectorAll('.unit');

    squares.forEach(square => {
        square.removeEventListener('mouseover', drawSquare);
    });
}

draw.addEventListener('click', () => {
    if (!drawMode) {
        activateDraw();
        deactivateErase();
    }
});

const erase = document.querySelector('#erase');

function activateErase() {
    eraseMode = true;
    erase.classList.add('toggle');

    const squares = document.querySelectorAll('.unit');

    squares.forEach(square => {
        square.addEventListener('mouseover', eraseSquare);
    });
}

function deactivateErase() {
    eraseMode = false;
    erase.classList.remove('toggle');

    const squares = document.querySelectorAll('.unit');

    squares.forEach(square => {
        square.removeEventListener('mouseover', eraseSquare);
    });
}

erase.addEventListener('click', () => {
    if (!eraseMode) {
        activateErase();
        deactivateDraw();
    }
});

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.unit');
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    });
})

function toggleGridLines() {
    const squares = document.querySelectorAll('.unit');
    squares.forEach(square => {
        square.classList.toggle('grid-lines');
    });
}

const hash = document.querySelector('.hash');

hash.addEventListener('click', () => {
    toggleGridLines();

    if (!gridActivated) {
        gridActivated = true;
        hash.classList.add('toggle');
    }
    else {
        gridActivated = false;
        hash.classList.remove('toggle');
    }
});

const slider = document.querySelector('#slider');
const outputs = document.querySelectorAll('.size');

slider.addEventListener('input', () => {
    outputs.forEach(output => {
        output.textContent = slider.value;
    });
});

function clearGrid(grid) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

slider.addEventListener('change', () => {
    clearGrid(grid);
    fillGrid(slider.value);
});

fillGrid(16);
activateDraw();