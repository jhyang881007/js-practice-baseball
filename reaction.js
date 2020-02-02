var screen = document.querySelector('#screen');
var status = {

};

var recordTime = [];

var startTime;
var endTime;
var timeOut;
screen.addEventListener('click', function(){

    if(screen.classList.contains('waiting')){ // waiting status
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = 'click the screen on green'
        timeOut = setTimeout(function(){
            startTime = new Date();
            console.log('time is running!!!');
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000);
    }else if(screen.classList.contains('ready')){ // ready status
        if(!startTime){
            clearTimeout(timeOut);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent= 'dont be a cheater.. click to start again';
        }else {
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = 'click now!'
        }
    }else if(screen.classList.contains('now')){ // start status
        endTime = new Date();
        console.log('Your time is: ' , (endTime - startTime)/1000);
        recordTime.push((endTime - startTime)/1000);
        startTime = null;
        endTime = null;
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = 'click to start';
    }
});