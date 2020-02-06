var horizontal = 4;
var vertical = 3;
var colorSet = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'pink', 'pink', 'purple', 'purple'];
var colorSaved = [];
// colorSet.forEach(function(element){
//     colorSaved.push(element);
// });
colorSaved = colorSet.slice();
var colorShuffled = [];
var clickFlag = true;
var clickCard = [];
var matchedCard = [];
var startTime;

/*shuffle the cards for random colors*/
function shuffle () {
    for (var i = 0; colorSet.length > 0; i += 1) {
        colorShuffled = colorShuffled.concat(colorSet.splice(Math.floor(Math.random() * colorSet.length), 1));
    }
}

function cardSetting (horizontal, vertical) {
    clickFlag= false;
    for (var i = 0; i < horizontal * vertical; i += 1) {

        var card = document.createElement('div');
        card.className ='card';
        var cardInner = document.createElement('div');
        cardInner.className ='card-inner';
        var cardFront = document.createElement('div');
        cardFront.className ='card-front';
        var cardBack = document.createElement('div');
        cardBack.className ='card-back';
        cardBack.style.backgroundColor = colorShuffled[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(c){
            card.addEventListener('click', function(){
                if(clickFlag && !matchedCard.includes(c)) {
                    c.classList.toggle('flipped');
                    clickCard.push(c);
                    if(clickCard.length === 2){
                        if(clickCard[0].querySelector('.card-back').style.backgroundColor
                            === clickCard[1].querySelector('.card-back').style.backgroundColor){
                            matchedCard.push(clickCard[0]);
                            matchedCard.push(clickCard[1]);
                            clickCard = [];
                            if(matchedCard.length === horizontal * vertical){
                                var endTime = new Date();
                                var finalTime = (endTime - startTime) / 1000;
                                alert('success!!!' + finalTime);
                                document.querySelector('#wrapper').innerHTML = '';
                                // colorSaved.forEach(function(element){
                                //     colorSet.push(element);
                                // }); or
                                // colorSet = JSON.parse(JSON.stringify(colorSaved));
                                colorSet = colorSaved.slice();
                                matchedCard = [];
                                colorShuffled = [];
                                startTime = null;
                                shuffle();
                                cardSetting(horizontal, vertical);

                            }
                        }else{
                            clickFlag = false;
                            setTimeout(function(){
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard = [];
                            }, 1000);
                        }

                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }

    document.querySelectorAll('.card').forEach(function(card, index){
        setTimeout(function(){
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });

    document.querySelectorAll('.card').forEach(function(card, index){
        setTimeout(function(){
            card.classList.remove('flipped');
            clickFlag = true;
            startTime = new Date();
        }, 5000);
    })
}
shuffle();
cardSetting(horizontal, vertical);
