var 바디 = document.body;

var 숫자후보;
var 숫자배열;

function 숫자뽑기() {
    숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    숫자배열 = [];
    for (var i = 0; i < 4; i++) {
        var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        숫자배열.push(뽑은것);
    }
}
console.log(숫자배열);
var 결과 = document.createElement('h1');
바디.append(결과);
var 타이틀 = document.createElement('div');
타이틀.textContent = 'Baseball Number Game';
바디.append(타이틀);
var 폼 = document.createElement('form');
바디.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
입력창.type = 'text';
입력창.maxLength = 4;
var 버튼 = document.createElement('button');
버튼.textContent = "입력";
폼.append(버튼);

var 틀린횟수 = 0;
폼.addEventListener('submit', function (e) {
    e.preventDefault();
    var 답 = 입력창.value;

    console.log(답);
    if(답 === 숫자배열.join('')){
        결과.textContent = 'Home-Run';

        입력창.value = '';
        입력창.focus();
        숫자뽑기();
        틀린횟수 = 0;
    }else {
        var 답배열 = 답.split('');
        var 스트라이크 = 0;
        var 볼 = 0;
        틀린횟수++;
        if(틀린횟수 > 5){ // 5번 넘게 틀린 경우
            결과.textContent = 'Failed because you missed more than 5 times, ' + 'the answer is: ' + 숫자배열.join(',');
            입력창.value = '';
            입력창.focus();
            숫자뽑기();
            틀린횟수 = 0;
        }else{ // 5개 미만으로 틀린 경우
            for (var i = 0; i < 4; i+=1){
                if(Number(답배열[i]) === 숫자배열[i]){ // 같은 자리 인지 확인
                    스트라이크 += 1;
                }else if (숫자배열.indexOf(Number(답배열[i])) > -1){ //답배열 안에 있는 숫자가 숫자배열에 같은 자리는 아니지만 존재하는지 확인
                    볼++;
                }

            }
            결과.textContent = 스트라이크 + ' Strikes ' + 볼 + ' balls.';
            입력창.value='';
            입력창.focus();
        }

    }

})
