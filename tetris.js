var table = document.querySelector('#table');
var blockArr = [
    ['red', true, [
        [1, 1],
        [1, 1],
    ]],
    ['blue', true, [
        [0, 2, 0],
        [2, 2, 2],
    ]],
    ['orange', true, [
        [3, 3, 0],
        [0, 3, 3],
    ]],
    ['skyblue', true, [
        [0, 4, 4],
        [4, 4, 0],
    ]],
    ['yellowgreen', true, [
        [5, 5, 5],
        [5, 0, 0],
    ]],
    ['pink', true, [
        [6, 6, 6],
        [0, 0, 6],
    ]],
    ['yellow', true, [
        [7, 7, 7, 7],
    ]],
];
var blockDictionary = {
    0: ['white', false, []],
    1: ['red', true, [
        [1, 1],
        [1, 1],
    ]],
    2: ['blue', true, [
        [0, 1, 0],
        [1, 1, 1],
    ]],
    3: ['orange', true, [
        [1, 1, 0],
        [0, 1, 1],
    ]],
    4: ['skyblue', true, [
        [0, 1, 1],
        [1, 1, 0],
    ]],
    5: ['yellowgreen', true, [
        [1, 1, 1],
        [1, 0, 0],
    ]],
    6: ['pink', true, [
        [1, 1, 1],
        [0, 0, 1],
    ]],
    7: ['yellow', true, [
        [1, 1, 1, 1],
    ]],
    10: ['red', false, []],
    20: ['blue', false, []],
    30: ['orange', false, []],
    40: ['skyblue', false, []],
    50: ['yellowgreen', false, []],
    60: ['pink', false, []],
    70: ['yellow', false, []],
}
var tetrisData = [];
var stopDown = false;

function tableSetting(){
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < 20; i++){
        var tr = document.createElement('tr');
        var arr = [];
        tetrisData.push(arr);
        fragment.appendChild(tr);
        for(var j = 0; j < 10; j++){
            var td = document.createElement('td');
            tr.appendChild(td);
            arr.push(0);
        }
    }
    table.appendChild(fragment);
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
function drawScreen() {
    tetrisData.forEach(function (tr, i){
        tr.forEach(function(td, j){
            table.children[i].children[j].className = blockDictionary[td][0];
            console.log(table.children[i].children[j]);
        });
    });
}
function blockGenerator(){
  var block = blockArr[Math.floor(Math.random() * 7)][2];
  console.log(block);
  block.forEach(function (tr, i){
      tr.forEach(function (td, j){
          //TODO: if block stacked full then game end
          tetrisData[i][j + 3] = td;
          console.log(tetrisData[i][j+3]);
      });
    });
  drawScreen();
}

// function blockDown(){
//     for(var i = tetrisData.length - 1; i >= 0; i--){
//         tetrisData[i].forEach(function(td, j){
//             if ( td > 0 && td < 10){
//                 if(tetrisData[i+1] && !stopDown){
//                     tetrisData[i + 1][j] = td;
//                     tetrisData[i][j] = 0;
//                 } else{
//                     stopDown = true;
//                     tetrisData[i][j] = td * 10;
//                 }
//             }
//         });
//     }
//     drawScreen();
// }

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
blockGenerator();
// setInterval(blockDown, 100);