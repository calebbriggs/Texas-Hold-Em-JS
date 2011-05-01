  var deal = function(){
		TableModel.deal();
		$("#deal-button").toggle();
		$("#flop-button").toggle();
		$("#p1card1").attr("src", TableModel.table.p1Cards[0].image);
		$("#p1card2").attr("src", TableModel.table.p1Cards[1].image);
		$("#p2card1").attr("src", TableModel.table.p2Cards[0].image);
		$("#p2card2").attr("src", TableModel.table.p2Cards[1].image);
  };
  var flop = function(){
		
		$("#flop-button").toggle();
		$("#turn-button").toggle();
		$("#flop1").attr("src", TableModel.table.flop[0].image);
		$("#flop2").attr("src", TableModel.table.flop[1].image);
		$("#flop3").attr("src", TableModel.table.flop[2].image);
		$("#p1-hand").attr("innerHTML" ,"Player 1 Has:" +TableModel.flopResult(TableModel.table.p1Cards));
		$("#p2-hand").attr("innerHTML" ,"Player 2 Has:" +TableModel.flopResult(TableModel.table.p2Cards));
  };
  var turn1 = function(){		
		$("#turn-button").toggle();
		$("#river-button").toggle();
		$("#turn").attr("src", TableModel.table.turn.image);
		$("#p1-hand").attr("innerHTML" ,"Player 1 Has:" +TableModel.turnResult(TableModel.table.p1Cards));
		$("#p2-hand").attr("innerHTML" ,"Player 2 Has:" +TableModel.turnResult(TableModel.table.p2Cards));
  };
  var river1 = function(){
		
		$("#river-button").toggle();
		$("#shuffle-button").toggle();
		$("#river").attr("src", TableModel.table.river.image);
		$("#p1-hand").attr("innerHTML" ,"Player 1 Has:" +TableModel.riverResult(TableModel.table.p1Cards));
		$("#p2-hand").attr("innerHTML" ,"Player 2 Has:" +TableModel.riverResult(TableModel.table.p2Cards));
  };
  var shuffle = function(){
		TableModel.shuffle();
		$("#shuffle-button").toggle();
		$("#deal-button").toggle();
		$("#flop1").attr("src", "images/b2fv.png");
		$("#flop2").attr("src", "images/b2fv.png");
		$("#flop3").attr("src", "images/b2fv.png");
		$("#turn").attr("src", "images/b2fv.png");
		$("#river").attr("src", "images/b2fv.png");
		$("#p1card1").attr("src", "images/b2fv.png");
		$("#p1card2").attr("src", "images/b2fv.png");
		$("#p2card1").attr("src", "images/b2fv.png");
		$("#p2card2").attr("src", "images/b2fv.png");
		$("#p1-hand").attr("innerHTML","");
		$("#p2-hand").attr("innerHTML","");
  };