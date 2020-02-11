var opponent = {
    Hero: document.getElementById('opponent-hero'),
    Deck:document.getElementById('opponent-deck'),
    Field: document.getElementById('opponent-cards'),
    Cost: document.getElementById('opponent-cost'),
    DeckData: [],
    FieldData: [],
    HeroData: [],
    selectedCard: null,
    selectedCardData: null,
};

var my = {
    Hero: document.getElementById('my-hero'),
    Deck:document.getElementById('my-deck'),
    Field: document.getElementById('my-cards'),
    Cost: document.getElementById('my-cost'),
    DeckData: [],
    FieldData: [],
    HeroData: [],
    selectedCard: null,
    selectedCardData: null,
};

var turnButton = document.getElementById('turn-btn');
var turn = true;

function deckToField(data, turn){
    var object = turn ? my : opponent;
    var currentCost = Number(object.Cost.textContent);
    if(currentCost < data.cost) {
        return 'end';
    }
    var idx = object.DeckData.indexOf(data);
    object.DeckData.splice(idx,1);
    object.FieldData.push(data);
    object.Deck.innerHTML = '';
    object.Field.innerHTML = '';
    object.DeckData.forEach(function(data){
        cardDomConnect(data, object.Deck);
    });
    object.FieldData.forEach(function(data){
        cardDomConnect(data, object.Field);
    });
    data.field = true;
    object.Cost.textContent = currentCost - data.cost;
}
function updateDom(myScreen){
    var object = myScreen ? my : opponent;
    object.Hero.innerHTML = '';
    object.Field.innerHTML = '';
    object.Deck.innerHTML = '';
    object.FieldData.forEach(function(data){
        cardDomConnect(data, object.Field);
    })
    object.DeckData.forEach(function(data){
        cardDomConnect(data,object.Deck);
    })
    cardDomConnect(object.HeroData, object.Hero, true);
}
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
    card.addEventListener('click', function(){

        if(turn) { //if it is my turn
            // if(hero && !my.selectedCard){
            //     return;
            // }
            if(!data.mine && my.selectedCard && !my.selectedCard.classList.contains('card-turnover')){
                data.hp = data.hp - my.selectedCardData.att;
                if(data.hp <= 0){
                    if(hero){
                        alert('You Win!');
                        return;
                    }else{
                        var index = opponent.FieldData.indexOf(data);
                        opponent.FieldData.splice(index, 1);
                    }
                }
                updateDom(false);
                my.selectedCard.classList.remove('card-selected');
                my.selectedCard.classList.add('card-turnover');
                my.selectedCard = null;
                my.selectedCardData = null;
                //turnButton.click();
                return;
            }else if(!data.mine){// return if click the opponent card
                return;
            }
            if(data.field){
                card.parentNode.querySelectorAll('.card').forEach(function(e){
                    e.classList.remove('card-selected');
                });
                card.classList.add('card-selected');
                my.selectedCard = card;
                my.selectedCardData = data;
            }else{
                if(deckToField(data, true) !== 'end'){
                    createMyDeck(1);
                }
            }
        } else{
            // if(hero && !opponent.selectedCard){
            //     return;
            // }
            if(data.mine && opponent.selectedCard && !opponent.selectedCard.classList.contains('card-turnover')){ // return if click my cards in opponents turn
                data.hp = data.hp - opponent.selectedCardData.att;
                if(data.hp <= 0){
                    if(hero){
                        alert('You Lose..');
                        return;
                    }else{
                        var index = my.FieldData.indexOf(data);
                        my.FieldData.splice(index, 1);
                    }
                }
                updateDom(true);
                opponent.selectedCard.classList.remove('card-selected');
                opponent.selectedCard.classList.add('card-turnover');
                opponent.selectedCard = null;
                opponent.selectedCardData = null;
                //turnButton.click();
                return;
            }else if(data.mine){// return if click the opponent card
                return;
            }
            if(data.field){
                card.parentNode.querySelectorAll('.card').forEach(function(e){
                    e.classList.remove('card-selected');
                });
                card.classList.add('card-selected');
                opponent.selectedCard = card;
                opponent.selectedCardData = data;
            }else{
                if(deckToField(data, false) !== 'end'){
                    createOpponentDeck(1);
                };}
        }
    });
    dom.appendChild(card);
}
function createOpponentDeck(n) {
    for (var i = 0; i < n; i++){
        opponent.DeckData.push(cardFactory());
    }
    opponent.Deck.innerHTML = '';
    opponent.DeckData.forEach(function(data){
        cardDomConnect(data, opponent.Deck);
    });
}
function createMyDeck(n) {
    for (var i = 0; i < n; i++){
        my.DeckData.push(cardFactory(false, true));
    }
    my.Deck.innerHTML = '';
    my.DeckData.forEach(function(data){
        cardDomConnect(data, my.Deck);
    });
}
function createMyHero() {
    my.HeroData = cardFactory(true, true);
    cardDomConnect(my.HeroData, my.Hero, true);
}
function createOpponentHero() {
    opponent.HeroData = cardFactory(true);
    cardDomConnect(opponent.HeroData, opponent.Hero, true);
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
        this.field = true;
    }else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if(myCard){
        this.mine = true;
    }
}
turnButton.addEventListener('click', function(){
    var object = turn ? my : opponent;
    document.getElementById('opponent').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    object.Hero.innerHTML = '';
    object.Field.innerHTML = '';
    object.FieldData.forEach(function(data){
        cardDomConnect(data, object.Field);
    });
    cardDomConnect(object.HeroData, object.Hero, true);

    turn = !turn;
    if(turn){
        my.Cost.textContent = 10;
    }else{
        opponent.Cost.textContent = 10;
    }

});



function cardFactory(hero, myCard) {
    return new Card(hero, myCard);
}


initialSetting();