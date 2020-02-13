var table = document.getElementById('table');
var tableData = [];

function initialization() {
    var fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
        var tr = document.createElement('tr');
        var rowData = [];
        tableData.push(rowData);
        [1, 2, 3, 4].forEach(function () {
            rowData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function randomGenerate(){
    var emptyArray = [];
    tableData.forEach(function(rowData, i){
        rowData.forEach(function(colData, j){
            if (!colData){
                emptyArray.push([i,j]);
            }
        });
    });
    console.log(emptyArray);
    var randomTd = emptyArray[Math.floor(Math.random() * emptyArray.length)];
    tableData[randomTd[0]][randomTd[1]] = 2;
    draw();
}

function draw (){
    tableData.forEach(function(rowData, i){
       rowData.forEach(function(colData, j){
           if(colData > 0){
               table.children[i].children[j].textContent = colData;
           }else {
               table.children[i].children[j].textContent = '';
           }

       });
    });
}

initialization();
randomGenerate();
draw();

var startDrag = false;
var draging = false;
var startCoordination;
var endCoordination;
window.addEventListener('mousedown', function(event){
    startDrag = true;
    startCoordination = [event.clientX, event.clientY];
});
window.addEventListener('mousemove', function(event){
    if(startDrag){
        draging = true;
    }
});
window.addEventListener('mouseup', function(event){
    endCoordination = [event.clientX,event.clientY];
    if(draging) {
        var direction;
        var xDiff = endCoordination[0] - startCoordination[0];
        var yDiff = endCoordination[1] - startCoordination[1];
        if(xDiff < 0 && Math.abs(xDiff)/ Math.abs(yDiff) > 1){
            direction = 'left';
        }else if(xDiff > 0 && Math.abs(xDiff)/ Math.abs(yDiff) > 1){
            direction = 'right';
        }else if(yDiff > 0 && Math.abs(xDiff)/ Math.abs(yDiff) < 1){
            direction = 'down';
        }else if (yDiff < 0 && Math.abs(xDiff)/ Math.abs(yDiff) < 1){
            direction = 'up';
        }
        console.log(direction);
    }
    startDrag = false;
    draging = false;
});