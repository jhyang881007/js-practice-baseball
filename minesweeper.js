var tbody = document.querySelector('#table tbody');
var dataset = [];
var flag = false;
var openTd = 0;
var codeList = {
    openedBox: -1,
    unopenedBox: 0,
    mine: 1,
    questionMarkMine: 2,
    exclamationMarkMine: 3,
    exclamationBox: 4,
    questionMarkBox: 5
}
document.querySelector('#exec').addEventListener('click', function(){
    // initialization
    tbody.innerHTML = '';
    dataset = [];
    document.querySelector('#result').textContent = '';
    flag= false;
    openTd = 0;
    var ver = parseInt(document.querySelector('#ver').value);
    var hor = parseInt(document.querySelector('#hor').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(ver, hor, mine);
    //create numbers
    // 0-99
    var numbers = Array(hor * ver)
        .fill()
        .map(function(x, index){
        return index + 1;
    });

    //draw mine locations
    var shuffle = [];
    while(numbers.length > 80){
        var shuffledNumbers = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
        shuffle.push(shuffledNumbers);
    }
    shuffle.sort();

    console.log(shuffle);


    //create mine table
    for (var i= 0; i < ver; i++){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for(var j=0; j < hor; j++){
            arr.push(0);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (flag) {
                    return;
                }
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                //right click options for '!', '?', and back to '' or 'X'
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    if (e.currentTarget.textContent === 'X') {
                        e.currentTarget.textContent = '!';
                        dataset[row][col] = codeList.exclamationMarkMine;
                    } else {
                        e.currentTarget.textContent = '!';
                        dataset[row][col] = codeList.exclamationBox;
                    }
                }else if (e.currentTarget.textContent === '!') {
                    if (dataset[row][col] === codeList.exclamationMarkMine) {
                        e.currentTarget.textContent = '?';
                        dataset[row][col] = codeList.questionMarkMine;
                    } else {
                        e.currentTarget.textContent = '?';
                        dataset[row][col] = codeList.questionMarkBox;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    if (dataset[row][col] === codeList.questionMarkMine) {
                        e.currentTarget.textContent = 'X';
                        dataset[row][col] = codeList.mine;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[row][col] = codeList.unopenedBox;
                    }
                }

            });

            td.addEventListener('click', function(e){
                if (flag){
                    return;
                }
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if([codeList.questionMarkMine, codeList.exclamationMarkMine, codeList.exclamationBox, codeList.questionMarkBox, codeList.openedBox].includes(dataset[row][col])) {
                    return;
                }
                e.currentTarget.classList.add('opened');
                if(dataset[row][col] === codeList.unopenedBox){
                openTd += 1;}
                //if user click 'X' then game over
                if (dataset[row][col] === codeList.mine){
                    e.currentTarget.textContent = 'BOOM!';
                    document.querySelector('#result').textContent = 'failed..';
                    flag = true;
                } else {
                    /*count number of mines of near position position of current position*/
                    dataset[row][col] = codeList.openedBox;
                    var arrayCountX = [dataset[row][col-1],dataset[row][col+1]];

                    if(dataset[row-1]) {
                        // arrayCountX = arrayCountX.concat(dataset[row-1][col-1], dataset[row-1][col],dataset[row-1][col+1]);
                        arrayCountX.push(dataset[row-1][col-1], dataset[row-1][col],dataset[row-1][col+1]);
                    }
                    if(dataset[row+1]){
                        // arrayCountX = arrayCountX.concat(dataset[row+1][col-1],dataset[row+1][col],dataset[row+1][col+1]);
                        arrayCountX.push(dataset[row+1][col-1],dataset[row+1][col],dataset[row+1][col+1]);
                    }

                    var nearMineNumbers = arrayCountX.filter(function (v){
                        return v === codeList.mine;
                    }).length;

                    /*if the near td's of current position does not have
                     any mines then open the 8 near tds of the current position */
                    e.currentTarget.textContent = nearMineNumbers || ''; //clears the following values: false, '', 0, null, undefined, NaN
                    if (nearMineNumbers === 0){
                        var nearCol = ([tbody.children[row].children[col-1], tbody.children[row].children[col+1]]);
                        if(tbody.children[row-1]){
                            nearCol = nearCol.concat([tbody.children[row-1].children[col - 1],
                                tbody.children[row-1].children[col],
                                tbody.children[row-1].children[col+1]]);
                        }

                        if(tbody.children[row+1]){
                            nearCol = nearCol.concat([tbody.children[row+1].children[col - 1],
                                tbody.children[row+1].children[col],
                                tbody.children[row+1].children[col+1]]);
                        }
                        console.log(nearCol);
                        nearCol.filter(function (v){ return !!v}) //remove undefined or null values from array
                            .forEach(function(nearTds){
                            var parentTr = nearTds.parentNode;
                            var parentTbody = nearTds.parentNode.parentNode;
                            var colNear = Array.prototype.indexOf.call(parentTr.children, nearTds);
                            var rowNear = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            if (dataset[rowNear][colNear] !== codeList.openedBox) {
                                nearTds.click();
                            }
                        });
                    }
                }
                console.log(openTd);
                if (openTd === hor * ver - mine) {
                    flag = true;
                    document.querySelector('#result').textContent = 'You Win!';
                }
            });
            tr.appendChild(td);

        }
        tbody.appendChild(tr);
    }

    //implement mines
    for (var k=0; k < shuffle.length; k++){
        var vertical;
        var horizontal;
        var verticalTemp;
        var horizontalTemp;

        verticalTemp = Math.floor(shuffle[k] / 10);
        horizontalTemp = Math.floor(shuffle[k] % 10);
        if(horizontalTemp === 0){
            vertical = verticalTemp - 1;
            horizontal = 9;
        }else if(verticalTemp === -1){
            vertical = 0;
            horizontal = horizontalTemp - 1;
        }else{
            vertical = verticalTemp;
            horizontal = horizontalTemp - 1;
        }

        tbody.children[vertical].children[horizontal].textContent = 'X';
        dataset[vertical][horizontal] = codeList.mine;
    }

});

