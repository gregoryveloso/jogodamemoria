let game = {
    
    lockMode: false,
    firstCard: false,
    secondCard: false,

    setCard: function (id){
        let card = this.cards.filter(card => card.id === id)[0];
        if (card.flipped || this.lockMode){
            return false;
        }

        if (!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }
        else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if(!this.firstCard || !this.secondCard ){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped =false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;

    },

    heroes: [
    'aranha',
    'batsuit',
    'capitao',
    'flash',
    'leia',
    'luke',
    'superh',
    'thanos',
    'vader',
    'ww'    
    ], 
    cards : null,

 CreateCardFromHeroes: function (){

    this.cards = [];

    this.heroes.forEach((hero) =>{
        this.cards.push(this.CreatePairFromHero(hero));
    })
    
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
},

 CreatePairFromHero:function (hero){
    return [
        {
            id:this.CreateIdWithTech(hero),
            icon:hero,
            flipped:false,
        },
        {
            id:this.CreateIdWithTech(hero),
            icon:hero,
            flipped:false,
        }
    ]
},

 CreateIdWithTech: function(hero){
    return hero + parseInt(Math.random() * 1000)
},

 shuffleCards: function(cards){
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex],this.cards[randomIndex]];
    }
}

}