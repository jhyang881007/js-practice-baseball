var table = document.querySelector('#table');
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0, 3];
var blocks = [
    {
        name: 's', //square-shape
        center: false,
        numCode: 1,
        color: 'red',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [0, 1, 1],

            ]
        ]
    },
    {
        name: 't', //T-shape
        center: true,
        numCode: 2,
        color: 'blue',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],

            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],

            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],

            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],

            ],
        ]
    },

    {
        name: 'z', //z-shape
        center: true,
        numCode:3,
        color: 'orange',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],

            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],

            ],
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],

            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],

            ],
        ]
    },

    {
        name: 'cr', //counter z-shape
        center: true,
        numCode: 4,
        color: 'skyblue',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],

            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],

            ],
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],

            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],

            ],
        ]
    },

    {
        name: 'l', //L-shape
        center: true,
        numCode: 5,
        color: 'yellowgreen',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],

            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],

            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],

            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],

            ],
        ]
    },

    {
        name: 'cl', //counter L-shape
        center: true,
        numCode: 6,
        color: 'pink',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],

            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],

            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],

            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],

            ],
        ]
    },

    {
        name: 'i', //T-shape
        center: true,
        numCode: 7,
        color: 'yellow',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
        ]
    },
];

const colors = ['red', 'blue', 'orange', 'skyblue', 'yellowgreen','pink', 'yellow'];
const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function tableSetting(){
    const fragment = document.createDocumentFragment();
    [...Array(20).keys()].forEach((col, i) =>{
    const tr = document.createElement('tr');
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach((row,j) =>{
        const td = document.createElement('td');
        tr.appendChild(td);
    });
    const column = [...Array(10)].fill(0);
    tetrisData.push(column);
    });
    table.appendChild(fragment);
}

function drawNextBlock() { //generate a tetris block
    const nextTable = document.getElementById('next-table');
    nextTable.querySelectorAll('tr').forEach((col,i) => {
        Array.from(col.children).forEach((row, j) => {
           if(nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0){
               nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
           }else{
               nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
           }
        });
});
}

function draw(){
    tetrisData.forEach((col, i ) => {
        col.forEach((row,j) => {
            if(row > 0) {
                table.children[i].children[j].className = colors[tetrisData[i][j] - 1];
                console.log(colors[tetrisData[i][j] - 1]);
            }else {
                table.children[i].children[j].className = '';
            }
        });
    });
}

function generate() {
    if(!currentBlock){
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    }else{
        currentBlock = nextBlock;
    }
    currentBlock.currentShapeIndex = 0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)]; //generate next block
    drawNextBlock();
    currentTopLeft = [-1,3];
    let isGameOver = false;

    /*make decision if game is over or not*/
    currentBlock.shape[0].slice(1).forEach((col,i) => {
        col.forEach((row,j)=>{
            if(row && tetrisData[i][j+3]){
                isGameOver = true;
            }
        });
    });

    /*generate block data*/
    currentBlock.shape[0].slice(1).forEach((col,i) => {
        col.forEach((row,j)=>{
            if(row){
                tetrisData[i][j+3] = currentBlock.numCode;
            }
        });
    });
    if(isGameOver){
        clearInterval(int);
        draw();
        alert('game over');
    }else {
        draw();
    }

tick();
}

function tick() {
    const nextTopLeft= [currentTopLeft[0] + 1, currentTopLeft[1]];
    const activeBlocks = [];
    let canGoDown = true;
    let currentBlockShape = currentBlock.shape[0];
    for(let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++){
       // console.log(currentTopLeft[0]);
        if(i < 0 || i >= 20 ) continue;
        for(let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++){
            //console.log(i,j);
            console.log(tetrisData[i], tetrisData[i+1],  tetrisData[i][j]);
            console.log(isInvalidBlock(tetrisData[i]));
            console.log(isActiveBlock(tetrisData[i][j]));

        }
    }
    //console.log(currentBlockShape, currentBlockShape.length, currentTopLeft[0]);
}

window.addEventListener('keydown', function(e){
    switch(e.code){
        case 'ArrowRight': // move to right
            break;
        case 'ArrowLeft': //move to left
            break;
        case 'ArrowDown': // move down
            break;
        default:
            break;
    }
});



window.addEventListener('keyup', function(e){
    switch(e.code){
        case 'Space': //keep down the block;
            break;
        case 'ArrowUp': // change direction
            break;
        default:
            break;
    }
});

tableSetting();
generate();
// setInterval(blockDown, 100);