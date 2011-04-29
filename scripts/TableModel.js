var TableModel = {	
                
    table:{
		deck: ko.observableArray([]),
		flop: ko.observableArray([]),
		turn: ko.observable(),
		river: ko.observable(),
		p1Cards: ko.observableArray([]),
		p2Cards: ko.observableArray([])	
	},
	
	suits: new Array("Clubs","Spades","Hearts","Diamonds"),
	cardNames: new Array("Ace","King","Queen","Jack","Ten","Nine","Eight","Seven","Six","Five","Four","Three","Two"),
	
	buildDeck: function(){
		var value= 1;
		var self =this;
		$.each(self.cardNames, function(x){
			$.each(self.suits, function(y){
				
				self.table.deck.push(self.newCard(self.cardNames[x],self.suits[y], value,y));
				value +=1;
			});
		});
		
	},	
	newCard: function(cardName, s, value, rank){
			var card = new Object();
			card.name= cardName+" of "+ s;
			card.suit = s;
			card.value = value;
			card.valueName = cardName;
			card.rank = rank;
			card.isDealt = false;
			card.image = "images/"+value + ".png"
			
			return card;
			
		},
		
	deal: function(){
		var self = this;
		self.table.p1Cards.push(self.getCard());
		self.table.p1Cards.push(self.getCard());
		self.table.p2Cards.push(self.getCard());
		self.table.p2Cards.push(self.getCard());
		self.table.flop.push(self.getCard());
		self.table.flop.push(self.getCard());
		self.table.flop.push(self.getCard());
		self.table.turn(self.getCard());
		self.table.river(self.getCard());		
	},
	
	getCard: function(){
		var self = this;
		var randomnumber = Math.floor(Math.random()*52);
		var card = self.table.deck()[randomnumber];
		if(card.isDealt)
			card = self.getCard();
		card.isDealt = true;
		return card;	
		
	},
		
	shuffle: function(){
	
		this.table.deck([]);
		this.table.flop([]);
		this.table.turn();
		this.table.river();
		this.table.p1Cards([]);
		this.table.p2Cards([]);
		this.buildDeck();
			
	}
		
	
}