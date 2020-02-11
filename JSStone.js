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

/*move card from deck to field*/
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

/*update dom(screen)*/
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

/*initialization*/
function reset(myScreen){
    var object = myScreen ? my : opponent;
    object.Hero.innerHTML = '';
    object.Field.innerHTML = '';
    object.Deck.innerHTML = '';
    object.FieldData = [];
    object.DeckData = [];
    object.HeroData = [];
    object.Cost.textContent = 10;
}

/*card fight between me and opponent*/
function performAction(data, turn, card, hero){
    var object = turn ? my : opponent;
    var figureOutMine = turn? !data.mine : data.mine;
    var updateScore = turn? opponent : my;

    //attack the card if the clicked card is not mine, have selected Card on my turn and selected card is not turnover card.
    if(figureOutMine && object.selectedCard && !object.selectedCard.classList.contains('card-turnover')){
        data.hp = data.hp - object.selectedCardData.att;
        if(data.hp <= 0){
            if(hero){//if hero's card hp is less than or equal to 0 then game end
                turn ? alert('You win!'): alert('You lose..');
                reset(true);
                reset(false);
                initialSetting();
            }else{//if soldier's card hp is less than or equal to 0 then remove from fieldData.
                var index = updateScore.FieldData.indexOf(data);
                updateScore.FieldData.splice(index, 1);
            }
        }

        turn ? updateDom(false) : updateDom(true); //update screen
        object.selectedCard.classList.remove('card-selected');
        object.selectedCard.classList.add('card-turnover');
        object.selectedCard = null;
        object.selectedCardData = null;
        return;
    }else if(figureOutMine){// return if click other side try to attack or select cards when its not their turn.
        return;
    }
    if(data.field){
        card.parentNode.querySelectorAll('.card').forEach(function(e){
            e.classList.remove('card-selected');
        });
        card.classList.add('card-selected');
        object.selectedCard = card;
        object.selectedCardData = data;
    }else{
        if(deckToField(data,turn) !== 'end'){//refill a card to deck once one card selected and moved to field.
           turn ? createMyDeck(1): createOpponentDeck(1);
        }
    }
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
        performAction(data,turn,card,hero);
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