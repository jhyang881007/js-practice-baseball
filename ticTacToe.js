var 바디 = document.body;
var 테이블 = document.createElement("table");
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';

function 초기화(무승부){
    if(무승부){
        결과창.textContent = '무승부';
    }else{
        결과창.textContent = 턴 + '님이 승리';
    }

    setTimeout(function(){
        순서도우미.textContent = 'X 님의 차례입니다.';
        결과창.textContent = '';
        칸들.forEach(function (줄) {
            줄.forEach(function (칸){
                칸.textContent = "";
            });

        });
        턴 = 'X';
    }, 1000)

}

function 검사(몇줄,몇칸){

    //세칸 다 채워졌나?
   var 다참 =false;
    // 가로줄 검사
    if (칸들[몇줄][0].textContent  === 턴 &&
        칸들[몇줄][1].textContent  === 턴 &&
        칸들[몇줄][2].textContent  === 턴){
        다참 = true;
    }
    // 세로줄 검사
    if (칸들[0][몇칸].textContent  === 턴 &&
        칸들[1][몇칸].textContent  === 턴 &&
        칸들[2][몇칸].textContent  === 턴){
        다참 = true;
    }
    // 대각선 검사
    if(칸들[0][0].textContent  === 턴 &&
        칸들[1][1].textContent  === 턴 &&
        칸들[2][2].textContent  === 턴 ||
        칸들[0][2].textContent  === 턴 &&
        칸들[1][1].textContent  === 턴 &&
        칸들[2][0].textContent  === 턴){
        다참 = true;
    }

    //동점 일시
    return 다참;
}


var 비동기콜백 = function(e) {
    if(턴 === 'O'){
        return;
    }
    var 몇줄 = 줄들.indexOf(e.target.parentNode);
    var 몇칸 = 칸들[몇줄].indexOf(e.target);


    if (칸들[몇줄][몇칸].textContent !== '') { // 칸이 이미 채워져 있는가?
        console.log('빈칸이아닙니다');
    } else {
        console.log('빈칸입니다');
        칸들[몇줄][몇칸].textContent = 턴;
        var 결과 = 검사(몇줄, 몇칸);

        //다 찼으면
        if (결과) {
            결과창.textContent = 턴 + ' 님이 승리하셨습니다!!!';
            초기화();
        } else {
            턴 = 'O';
            순서도우미.textContent = '컴퓨터의 차례입니다.';
            var 후보칸 = [];
            칸들.forEach(function (줄) {
                줄.forEach(function (칸) {
                    후보칸.push(칸);
                });
            });

            후보칸 = 후보칸.filter(function (칸) {
                return !칸.textContent;
            });
            if(결과){
                초기화();
            }else if (후보칸.length === 0){
                초기화(true);
            }else{
                if(턴 === 'X'){
                    턴 = 'O';
                }
            }
            setTimeout(function () {
                //computer's turn
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                선택칸.textContent = 턴;
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 결과 = 검사(몇줄, 몇칸);
                if (결과) {
                    결과창.textContent = 턴 + ' 님이 승리하셨습니다!!!';
                    초기화();
                }

                턴 = 'X';
                순서도우미.textContent = 'X 님의 차례입니다.';
            }, 1000);
        }
    }
};
for (var i = 1; i <=3; i++){
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for(var j = 1; j <=3; j++){
        var 칸 = document.createElement('td');
        console.log(칸.textContent);
        칸.addEventListener('click', 비동기콜백);
        칸들[i - 1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
console.log('줄들',줄들,'칸들', 칸들);
바디.appendChild(테이블);
var 순서도우미 = document.createElement ('h3');
순서도우미.textContent = 'X 님의 차례입니다.';
바디.append(순서도우미);
var 결과창 = document.createElement('h2');
바디.append(결과창);