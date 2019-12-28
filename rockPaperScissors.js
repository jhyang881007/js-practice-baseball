var body = document.body;
var imageLocation = 0;
var result = document.createElement('h2');
var outcome = document.createElement('h2');
var rockPaperScissors = {
    rock: '0',
    scissor: '-142px',
    paper: '-284px',
};

var score = {
    rock: 1,
    scissor: 0,
    paper: -1,
}

function computerDecision (imageLocation){
    return Object.entries(rockPaperScissors).find(function(v) {
        return v[1] === imageLocation;
    })[0];
}

var interval;
function intervalMaker (){ //keep changing motion (rock-paper-scissor)
   interval = setInterval(function() {
        if(imageLocation === rockPaperScissors.rock) {
            imageLocation = rockPaperScissors.scissor;
        }else if (imageLocation === rockPaperScissors.scissor) {
            imageLocation = rockPaperScissors.paper;
        }else{
            imageLocation = rockPaperScissors.rock;
        }

        document.querySelector('#computer').style.background =
            'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + imageLocation + ' 0';
    }, 100);
}
intervalMaker();

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function () {
        clearInterval(interval); //stop after click

        setTimeout(function () { //pause for 1 second and restart
            intervalMaker();
        }, 1000);
        var myDecision = this.textContent;
        console.log(myDecision, computerDecision(imageLocation));
        var myScore = score[myDecision];
        var computerScore = score[computerDecision(imageLocation)];
        var totalScore = myScore - computerScore;
        if (totalScore === 0) {
            result.textContent = "Tie";
        } else if ([-2,1].includes(totalScore)) {
            result.textContent = "You Win!";
        } else {
            result.textContent = "You Lose...";
        }

        outcome.textContent = myDecision + ' ' + computerDecision(imageLocation);

    });
});
body.append(outcome);
body.append(result);


