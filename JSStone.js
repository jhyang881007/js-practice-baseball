var opponent = {
    Hero: document.getElementById('opponent-hero'),
    Deck:document.getElementById('opponent-deck'),
    Field: document.getElementById('opponent-cards'),
    Cost: document.getElementById('opponent-cost'),
    DeckData: [],
    FieldData: [],
    HeroData: [],
};

var my = {
    Hero: document.getElementById('my-hero'),
    Deck:document.getElementById('my-deck'),
    Field: document.getElementById('my-cards'),
    Cost: document.getElementById('my-cost'),
    DeckData: [],
    FieldData: [],
    HeroData: [],
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
            if(!data.mine){ // return if click the opponent card
                return;
            }
            if(data.field){
                card.parentNode.querySelectorAll('.card').forEach(function(e){
                  e.classList.remove('card-selected');
                });
                card.classList.add('card-selected');
            }else{
                if(deckToField(data, true) !== 'end'){
                    createMyDeck(1);
                }
            }
        } else{
            if(data.mine){ // return if click my cards in opponents turn
                return;
            }
            if(data.field){
                card.parentNode.querySelectorAll('.card').forEach(function(e){
                    e.classList.remove('card-selected');
                });
                card.classList.add('card-selected');
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
    turn = !turn;
    if(turn){
        my.Cost.textContent = 10;
    }else{
        opponent.Cost.textContent = 10;
    }
    document.getElementById('opponent').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
});



function cardFactory(hero, myCard) {
        return new Card(hero, myCard);
}


initialSetting();