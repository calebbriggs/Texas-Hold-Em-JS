var TableModel = {	
                
    table:{
		deck: [],
		flop: [],
		turn: new Object(),
		river: new Object(),
		p1Cards: [],
		p2Cards: []	
	},
	
	suits: new Array("Clubs","Spades","Hearts","Diamonds"),
	cardNames: new Array("Ace","King","Queen","Jack","Ten","Nine","Eight","Seven","Six","Five","Four","Three","Two"),
	
	buildDeck: function(){
		var value= 1;
		var rank = 0;
		var self =this;
		$.each(self.cardNames, function(x){
			$.each(self.suits, function(y){				
				mod = y % 4;
				if(mod == 0)
					rank+=1;
				self.table.deck.push(self.newCard(self.cardNames[x],self.suits[y], value,rank));
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
		self.table.turn=self.getCard();
		self.table.river=self.getCard();		
	},
	
	getCard: function(){
		var self = this;
		var randomnumber = Math.floor(Math.random()*52);
		var card = self.table.deck[randomnumber];
		if(card.isDealt)
			card = self.getCard();
		card.isDealt = true;
		return card;	
		
	},
		
	shuffle: function(){	
		this.table.deck=[];
		this.table.flop=[];
		this.table.turn=new Object();
		this.table.river=new Object();
		this.table.p1Cards=[];
		this.table.p2Cards=[];
		this.buildDeck();			
	},
	flopResult: function(cards){
		var self = this;
		var resultMessage = "";
		var count =0;
		var board = self.table.flop;
		if(cards[0].rank == cards[1].rank)
			{
				count+=1;
				resultMessage += self.checkCard(cards[0],count,board);				
			}
		else{
			$.each(cards, function(i){
				count = 0;
				resultMessage += self.checkCard(cards[i],count,board);
			});		
		}
		
		resultMessage += self.checkBoard(cards, board);
		
		var flushMessage = self.checkFlush(cards, board);
		
		if (flushMessage != "")
			resultMessage = flushMessage;
		
		if(resultMessage==""){		
			resultMessage = self.getHighCard(cards, board);			
		}
		
		return resultMessage;
	},
	turnResult: function(cards){
		var self = this;
		var resultMessage = "";
		var count =0;
		var board = [];
		$.each(self.table.flop, function(i){
				board.push(self.table.flop[i]);
		});
		board.push(self.table.turn);
		
		if(cards[0].rank == cards[1].rank)
			{
				count+=1;
				resultMessage += self.checkCard(cards[0],count,board);				
			}
		else{
			$.each(cards, function(i){
				resultMessage += self.checkCard(cards[i],count,board);
			});
		}
		resultMessage += self.checkBoard(cards, board);
		
		var flushMessage = self.checkFlush(cards, board);
		
		if (flushMessage != "")
			resultMessage = flushMessage;
		
		if(resultMessage==""){		
			resultMessage = self.getHighCard(cards, board);			
		}
		return resultMessage;
	},
	riverResult: function(cards){
		var self = this;
		var resultMessage = "";
		var count =0;
		var board = [];
		$.each(self.table.flop, function(i){
				board.push(self.table.flop[i]);
		});
		board.push(self.table.turn);
		board.push(self.table.river);
		
		
		if(cards[0].rank == cards[1].rank)
			{
				count+=1;
				resultMessage += self.checkCard(cards[0],count,board);				
			}
		else{
			$.each(cards, function(i){
				
				resultMessage += self.checkCard(cards[i],count,board);
			});
		}
		resultMessage += self.checkBoard(cards, board);
		
		var flushMessage = self.checkFlush(cards, board);
		
		if (flushMessage != "")
			resultMessage = flushMessage;
		
		if(resultMessage==""){		
			resultMessage = self.getHighCard(cards, board);			
		}
		return resultMessage;
	},
	checkCard: function(card, count, board){
				var resultMessage = "";
				count += $.grep(board, function(c){return c.rank == card.rank}).length;
							
				
				if(count ==1){
					resultMessage += " Pair of " + card.valueName + "s";
				}
				if(count ==2){
					resultMessage += " Three " + card.valueName+ "s";
				}
				if(count ==3){
					resultMessage += " Four " + card.valueName+ "s";
				}
				return resultMessage;
	},
	
	checkBoard: function(cards, board){
				var resultMessage = "";
				var matches = [];
				var temp = [];
				$.each(board, function(i){temp.push(board[i])});
				$.each(temp, function(i){				
						if(temp[i].rank != cards[0].rank && temp[i].rank != cards[1].rank ){								
								var match = $.grep(temp, function(c){return c.rank == temp[i].rank});
								
								if(match.length >1 )
								{	//this will check to make sure our paired cards only gets into the matches array once
									var checkMatchesLength = $.grep(matches, function(c){return c.rank== match[0].rank}).length;
									if(checkMatchesLength <1)
										matches.push(match[0]);		
								}											
						}				
				});
				
				$.each(matches, function(i){
						var count = $.grep(temp, function(c){return c.rank == matches[i].rank}).length;
						
						if(count ==2){
							resultMessage += " Pair of " + matches[i].valueName + "s";
						}
						if(count ==3){
							resultMessage += " Three " + matches[i].valueName+ "s";
						}
						if(count ==4){
							resultMessage += " Four " + matches[i].valueName+ "s";
						}						
				});
				return resultMessage;
	},
	
	getHighCard: function(cards, board){
		var resultMessage = "";
		var hand = [];
		$.each(board, function(i){hand.push(board[i]);});
		$.each(cards, function(i){hand.push(cards[i]);});
			
			return this.highCard(hand);
	
	},
	
	highCard: function(hand){
	
			var min = hand[0].rank;
			var card = hand[0];
			var len = hand.length;
			for (var i = 1; i < len; i++){ 
				if (hand[i].rank < min){
					min = hand[i].rank;
					card = hand[i];
				}
			}
			resultMessage = " " +card.valueName + " High";
			return  resultMessage;
	},
	
	checkFlush: function(cards, board){
		var hand = [];
		var self = this;
		$.each(board, function(i){hand.push(board[i]);});
		$.each(cards, function(i){hand.push(cards[i]);});
		
		var suited = $.grep(hand, function(c) {return c.suit== cards[0].suit});
		
		if(suited.length > 4)
			return self.highCard(suited) + " " + cards[0].suit + " Flush";
		var suited2 = $.grep(hand, function(c) {return c.suit== cards[1].suit});
		
		if(suited2.length > 4)
			return self.highCard(suited2) + " " + cards[0].suit + " Flush";
		
		return "";
	}
	
}