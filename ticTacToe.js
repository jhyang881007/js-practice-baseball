var 바디 = document.body;
var 테이블 = document.createElement("table");
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 테이블숫자 = 0;


var 초기화 = function (){
    턴 = 'X';
    순서도우미.textContent = 'X 님의 차례입니다.';
    칸들.forEach(function (줄) {
        줄.forEach(function (칸){
            칸.textContent = "";
        });

    });
}
var 비동기콜백 = function(e) {
    console.log(e.target); // 칸
    console.log(e.target.parentNode); // 줄
    console.log(e.target.parentNode.parentNode); // 테이블

    var 몇줄 = 줄들.indexOf(e.target.parentNode);
    console.log('몇줄', 몇줄);
    var 몇칸 = 칸들[몇줄].indexOf(e.target);
    console.log('몇칸', 몇칸);

    if(칸들[몇줄][몇칸].textContent !== ''){ // 칸이 이미 채워져 있는가?
        console.log('빈칸이아닙니다');
    }else{
        console.log('빈칸입니다');
        칸들[몇줄][몇칸].textContent = 턴;

        //세칸 다 채워졌나?
        var tieCount = 0;
        var 무승부 = false;
        var 다참 =false;
        // 가로줄 검사
        if (칸들[몇줄][0].textContent  === 턴 && 칸들[몇줄][1].textContent  === 턴 && 칸들[몇줄][2].textContent  === 턴){
            다참 = true;
        }
        // 세로줄 검사
        if (칸들[0][몇칸].textContent  === 턴 && 칸들[1][몇칸].textContent  === 턴 && 칸들[2][몇칸].textContent  === 턴){
            다참 = true;
        }
        // 대각선 검사
        if(칸들[0][0].textContent  === 턴 && 칸들[1][1].textContent  === 턴 && 칸들[2][2].textContent  === 턴 ||
            칸들[0][2].textContent  === 턴 && 칸들[1][1].textContent  === 턴 && 칸들[2][0].textContent  === 턴){
            다참 = true;
        }

        //동점 일시
        칸들.forEach(function (줄) {
            줄.forEach(function (칸){
                if(칸.textContent === 'X'|| 칸.textContent === 'O'){
                    tieCount++;
                }
            });


        });

        if(tieCount !== 9){
            tieCount = 0;
        }else {
            다참 = true;
            무승부 = true;
        }

    }


    //다 찼으면
    if (다참) {
        if(!무승부){
            결과창.textContent = 턴 + ' 님이 승리하셨습니다!!!';
            //초기화
            초기화();
          }
        else{
            결과창.textContent = '비겼습니다!';
            초기화();
        }
    }else {
        if(턴 === 'X'){
            턴 = 'O';
            순서도우미.textContent = 'O 님의 차례입니다.';
        }else{
            턴 = 'X';
            순서도우미.textContent = 'X 님의 차례입니다.';
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