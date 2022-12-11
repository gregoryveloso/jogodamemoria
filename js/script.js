const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";

StartGame();

function StartGame(){
    InitializeCards(game.CreateCardFromHeroes());
}

function InitializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    game.cards.forEach( card =>{
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        CreateCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
        })
}

function CreateCardContent(card, cardElement){
    CreateCardFace(FRONT, card, cardElement);
    CreateCardFace(BACK, card, cardElement);
}

function CreateCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./img/" + card.icon + ".jpg";
        cardElementFace.appendChild(iconElement);
    }
    else{
        cardElementFace.innerHTML = "?";
    }
    element.appendChild(cardElementFace);
}    



function flipCard(){
    if(game.setCard(this.id)){
    
    this.classList.add("flip");

    if(game.secondCard){
    if(game.checkMatch()){
        game.clearCards();
        if(game.checkGameOver()){
            let gameOvelLayer = document.getElementById('gameOver');
            gameOvelLayer.style.display ='flex';
        }
    }
    else{
        setTimeout(() => {
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.classList.remove('flip');
        secondCardView.classList.remove('flip');
        game.unflipCards();
        },1000);
    };
    }
  }
}


function restart(){
    game.clearCards();
    StartGame();
    let gameOvelLayer = document.getElementById('gameOver');
    gameOvelLayer.style.display ='none';




}