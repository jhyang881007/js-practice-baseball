var opponentHero = document.getElementById('opponent-hero');
var myHero = document.getElementById('my-hero');
var opponentDeck = document.getElementById('opponent-deck');
var myDeck = document.getElementById('my-deck');
var opponentField = document.getElementById('opponent-cards');
var myField = document.getElementById('my-cards');
var myCost = document.getElementById('my-cost');
var opponentCost = document.getElementById('opponent-cost');
var opponentDeckData = [];
var myDeckData = [];
var opponentHeroData;
var myHeroData;
var opponentFieldData = [];
var myFieldData = [];
var turn = true;
/* connect screen and actual data */
function cardDomConnect (data, dom, hero){
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp
    if(hero){
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = 'hero';
        card.appendChild(name);
    }
    card.addEventListener('click', function(card){
        if(turn) { //if it is my turn
            if(!data.mine){ // return if click the opponent card
                return;
            }
            var currentCost = Number(myCost.textContent);
            if(currentCost < data.cost) {
                return;
            }
            var idx = myDeckData.indexOf(data);
            myDeckData.splice(idx,1);
            myFieldData.push(data);
            myDeck.innerHTML = '';
            myField.innerHTML = '';
            myDeckData.forEach(function(data){
                cardDomConnect(data, myDeck);
            });
            myFieldData.forEach(function(data){
                cardDomConnect(data, myField);
            });
            myCost.textContent = currentCost - data.cost;
            turn = false;

        } else{
            if(data.mine){ // return if click my cards in opponents turn
                return;
            }
            var currentCost = Number(opponentCost.textContent);
            if(currentCost < data.cost) {
                return;
            }
            var idx = opponentDeckData.indexOf(data);
            opponentDeckData.splice(idx,1);
            opponentFieldData.push(data);
            opponentDeck.innerHTML = '';
            opponentField.innerHTML = '';
            opponentDeckData.forEach(function(data){
                cardDomConnect(data, opponentDeck);
            });
            opponentFieldData.forEach(function(data){
                cardDomConnect(data, opponentField);
            });
            opponentCost.textContent = currentCost - data.cost;
            turn =true;
        }
    });
    dom.appendChild(card);
}
function createOpponentDeck(n) {
    for (var i = 0; i < n; i++){
        opponentDeckData.push(cardFactory());
    }
    opponentDeckData.forEach(function(data){
        cardDomConnect(data, opponentDeck);
    });
}
function createMyDeck(n) {
    for (var i = 0; i < n; i++){
       myDeckData.push(cardFactory(false, true));
    }
    myDeckData.forEach(function(data){
      cardDomConnect(data, myDeck);
    });
}
function createMyHero() {
    myHeroData = cardFactory(true, true);
    cardDomConnect(myHeroData, myHero, true);
}
function createOpponentHero() {
    opponentHeroData = cardFactory(true);
    cardDomConnect(opponentHeroData, opponentHero, true);
}
function initialSetting() {
    createOpponentDeck(5);
    createMyDeck(5);
    createMyHero();
    createOpponentHero();
}
function Card(hero, myCard){
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
    }else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if(myCard){
        this.mine = true;
    }
}


function cardFactory(hero, myCard) {
        return new Card(hero, myCard);
}


initialSetting();