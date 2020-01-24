var tbody = document.querySelector('#table tbody');
var dataset = [];
document.querySelector('#exec').addEventListener('click', function(){
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
            arr.push(1);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function (e){
                e.preventDefault();
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                console.log(parentTr, parentTbody, e.currentTarget, col, row);

                //right click options for '!', '?', and back to '' or 'X'
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                }else if(e.currentTarget.textContent === '?'){
                    if(dataset[row][col] === 'X'){
                        e.currentTarget.textContent = 'X';
                    }else{
                    e.currentTarget.textContent = '';
                    }
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

        console.log(vertical, horizontal);
        tbody.children[vertical].children[horizontal].textContent = 'X';
        dataset[vertical][horizontal] = 'X';
    }
    console.log(dataset);
});

