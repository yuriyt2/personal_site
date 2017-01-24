//Blackjack, 10/15/15, by Yuriy Turetskiy

console.log("Javascript activated.")
//++++++++++++++++++++++VARIABLES++++++++++++++++++++++++++++++++++++
var myConsole = $("#console")  //this is where I will pass instructions to the player
var currentDeck = [] //this will be the current shuffled deck
var dealerCard1 = $("#dealer-card1") //this is how the html element will be edited
var dealerCard2 = $("#dealer-card2") //same as above for the dealers second card
var yourCard1 = $("#your-card1") //same as above for your first card
var yourCard2 = $("#your-card2") //and your second card
var yourCardsArray = [] //this will keep track of the cards you were dealt
var dealerCardArray = [] //this will keep track of the ards the dealer was dealt
var playedCards = [] //this is a place to put the cards played from the deck, will be replaced by above arrays
var chipCount = 0 //this is to keep track of how many chips you have
var dealButton = $("#deal")
//++++++++++++++++++++MAKE A DECK OF CARDS!+++++++++++++++++++++++++++++++++
//Fun global variables to make the deck
cardArray = [];
cardValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
suits= ["♣","♦","♥","♠"];
//Individual card constructor
var Card = function(){
  this.name = "";
  this.number = 0;
  this.hidden = false;
}
//The function below will create a deck of cards.  It will use
//NESTED for-loops to iterate through 2 arrays!
var makeDeck = function () {
  for (var j = 0; j < suits.length; j++) {
    for (var i = 0; i < cardValues.length; i++) {
      thiscard = new Card;
      thiscard.hidden = false;
      thiscard.name = cardValues[i] + suits[j];
        if(cardValues[i] === "A"){thiscard.number = 11;
        }else if(cardValues[i] === "K" || cardValues[i] === "J" || cardValues[i] === "Q" ) {thiscard.number = 10;
        }else {thiscard.number = parseInt(cardValues[i])}
      cardArray.push(thiscard);
    }
  }
}
//+++++++++++++++++++++++SHUFFLE THE DECK+++++++++++++++++++++++++++++++++++++
//use the shuffle function from our mem game, thanks wdi instructors!
function shuffle(o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
  }
//this function can be used to make a shuffled deck, just set it to a variable
var shuffleDeck = function () {
  var shuffledDeck = shuffle(cardArray);
  return shuffledDeck;
}
//+++++++++++++++++++++++CREATE DEAL FUNCTION++++++++++++++++++++++++++++++
//Shuffle the deck each time you deal cards.
var dealCards = function () {
  $(myConsole).text("Dealing a new hand.");
  $("#chipstack").text(chipCount)
  currentDeck = shuffleDeck();
  var cards = [yourCard1,dealerCard2,yourCard2,dealerCard1] //temp array for looping
  //Move card from the current deck to an array of played cards in a looping fashion.
  for (var i = 0; i < cards.length; i++) {
    playedCards.push(currentDeck.pop());
    $(cards[i]).text(playedCards[i].name);
    var nameSplit = playedCards[i].name.split("")
    if( (nameSplit[nameSplit.length-1] === "♦") || (nameSplit[nameSplit.length-1] === "♥") ){
      $(cards[i]).css("color","#B20000");
    }
  }
  //Using timeout, reveal each card one at a time (except dealer's first) on the page.
  setTimeout(function () {$(cards[0]).attr("class","card")},500);
  setTimeout(function () {$(cards[1]).attr("class","card")},1000);
  setTimeout(function () {$(cards[2]).attr("class","card")},1500);
  //Push the cards into these arrays for finding the score later
  yourCardsArray.push(playedCards[0],playedCards[2])
  dealerCardArray.push(playedCards[1],playedCards[3])
  //Check for blackjacks once the cards are dealt, otherwise see if player wants to hit/stand
  if (blackJackTester(yourCardsArray) === true && blackJackTester(dealerCardArray) !== true){
    setTimeout(function(){$(dealButton).css("display","");$(myConsole).css("color","yellow");$(myConsole).text("You have Blackjack!  You lucky devil!  \nPress deal.")},2000);
    chipCount = chipCount + 15
    $("#chipstack").text(chipCount)
  } else if (blackJackTester(dealerCardArray) === true && blackJackTester(yourCardsArray) !== true){
    setTimeout(function (){$(dealerCard1).attr("class","card")},10);
    setTimeout(function(){$(dealButton).css("display","");$(myConsole).css("color","yellow");$(myConsole).text("Dealer has Blackjack!  You lose!  \nPress deal.")},2000);
    checkWhoWins()
  } else if (blackJackTester(dealerCardArray) === true && blackJackTester(yourCardsArray) === true){
    $(dealButton).css("display","")
    setTimeout(function (){$(dealerCard1).attr("class","card")},10)
    setTimeout(function(){$(dealButton).css("display","");$(myConsole).css("color","yellow");$(myConsole).text("OMG, you and the dealer both have blackjack.  Split.  \nPress deal")},2000)
    $("#chipstack").text(chipCount)
  }else{
  //Tell the player what to do in the fake console.
  setTimeout(function () {$(myConsole).text("You have " + totalScoreFinder(yourCardsArray) + ", do you hit or stand?"); $(myConsole).css("color","yellow")},2000);
  $(dealButton).css("display","none");
  }
}
//+++++++++++++++CREATE FUNCTION TO GET YOUR TOTAL SCORE+++++++++++++++++++
//This is going to add up the number values of the cards in the array passed.
var totalScoreFinder = function(array){
  var scoreCalculator = 0
  for (var i = 0; i < array.length; i++) {
    scoreCalculator += array[i].number
  }
//If the total is above 21, this checks for aces and adjusts.
  if (scoreCalculator > 21){
    numberOfAces = 0
    for (var j = 0; j < array.length; j++) {
      if(array[j].number === 11){
        numberOfAces++}
      }
      switch (numberOfAces){
          case 1:
          scoreCalculator = scoreCalculator - 10;
          break;
          case 2:
          if(scoreCalculator < 32){
            scoreCalculator = scoreCalculator - 10;
          }else {scoreCalculator = scoreCalculator -20}
          break;
          case 3:
          if(scoreCalculator < 32){
            scoreCalculator = scoreCalculator - 10;
          }else if(scoreCalculator < 42){
            scoreCalculator = scoreCalculator -20;
          }else{scoreCalculator = scoreCalculator -30}
          break;
          case 4:
          if(scoreCalculator < 32){
            scoreCalculator = scoreCalculator - 10;
          }else if(scoreCalculator < 42){
            scoreCalculator = scoreCalculator -20;
          }else if(scoreCalculator < 52){
            scoreCalculator = scoreCalculator -30;
          }else{scoreCalculator = scoreCalculator -40}
          break;
          default:
          break;
        }
      }
  return scoreCalculator
}

//+++++++++++++++++++++++++++HIT FUNCTION++++++++++++++++++++++++++++++++++++
//This function will allow both players to hit, it will add a new card, give it a value
//This function will also determine if a player busts.
var playerHits = function(array){
  array.push(currentDeck.pop());
  newCard = $("<div>");
  $(newCard).attr("class","new card hidden");
  $(newCard).text(array[array.length-1].name);
    var nameSplit = array[array.length-1].name.split("")
    console.log(nameSplit)
    if( (nameSplit[nameSplit.length-1] === "♦") || (nameSplit[nameSplit.length-1] === "♥") ){
      $(newCard).css("color","#B20000");
    }
    if (array === yourCardsArray){
    $(newCard).attr("id",("your-card" + yourCardsArray.length));
      if(totalScoreFinder(array) > 21){
        setTimeout(function (){$(myConsole).text("Bust with " + totalScoreFinder(array) + " points!")},1500)
        setTimeout(function() {$("#hit").css("display","none")},500);
        setTimeout(function() {$("#stand").css("display","none")},500);
        setTimeout(checkWhoWins,10);
      }else if(totalScoreFinder(array) === 21) {
        dealerPlays()
      }else{setTimeout(function (){$(myConsole).text("You have " + totalScoreFinder(array) + ", do you hit or stand?")},500)}
    }else {$(newCard).attr("id",("dealer-card" + dealerCardArray.length))}
    setTimeout(function(){$(document.body).append(newCard)},100);
    setTimeout(function(){$(newCard).attr("class","new card")},400);
}
//++++++++++++++++++++++ADD EVENT LISTENERS++++++++++++++++++++++++++++++++++
//There are 3 buttons generated with an online button generating tool.  The hit button just
//allows the player to hit.  The deal button starts the game the first time, resets the BOARD
//every time after that until the player runs out of chips.  Once that happens, the deal button
//restarts the game with a reload.  The stand button makes it the dealer's turn and hides the
//hit and stand buttons.
  document.getElementById("hit").addEventListener("click",function(){
    if (currentDeck.length>2) {
      playerHits(yourCardsArray);
    }else{
      $(myConsole).text("Press deal to begin game!").css("color","yellow");
    }

  })
  document.getElementById('deal').addEventListener("click",function(){
    if(currentDeck.length < 1){
    setTimeout(function() {$(dealButton).css("display","none")},100);
      chipCount = 100
      makeDeck();
      dealCards();
  } else if (chipCount < 10){
    window.location.reload();
  } else {
    setTimeout(function(){resetBoard()},1000);
    }
  })
  document.getElementById('stand').addEventListener("click",function(){
    if (currentDeck.length>2) {
      setTimeout(function() {$("#hit").css("display","none")},100);
      setTimeout(function() {$("#stand").css("display","none")},100);
      $(myConsole).text("You have " + totalScoreFinder(yourCardsArray) + ", the dealer plays...");
      setTimeout(function () {dealerPlays()},100)
    }else{
      $(myConsole).text("Press deal to begin game!").css("color","yellow");
    }

  })


//++++++++++++++++++++++++BLACKJACK TESTER++++++++++++++++++++++++++++++++++++
//This function will test to see if there is an ace in the hand.  If there is
//its value is 11, then check if the other card has the value 10.  If both are true
//then BLACKJACK!  Only returns true if true.
var blackJackTester = function(array){
  if( (array[0].number === 11 || array[1].number === 11) && (array[0].number === 10 || array[1].number === 10)  ){
    return true
  }
}
//+++++++++++++++++++++++++++DEALER MOVES++++++++++++++++++++++++++++++++++++
//This function will show the dealer's hidden card first.  If his score is over 16
//Dealer will stand, otherwise he will hit until he has 17+.
var dealerPlays = function () {
  setTimeout(function() {$("#hit").css("display","none")},100);
  setTimeout(function() {$("#stand").css("display","none")},100);
  setTimeout(function (){$(dealerCard1).attr("class","card")},100)
  setTimeout(function(){$(myConsole).text("You have " + totalScoreFinder(yourCardsArray) + ", the dealer has " + totalScoreFinder(dealerCardArray) + ".")},150)
  if(totalScoreFinder(dealerCardArray) > 16){
    setTimeout(function(){checkWhoWins()},1000);
  }else if (totalScoreFinder(dealerCardArray) <= 16) {
    setTimeout(function(){playerHits(dealerCardArray)},1000);
    setTimeout(function(){dealerPlays()},1000);
  }
}
//++++++++++++++++++++++++++CHECK FOR WINNER++++++++++++++++++++++++++++++++++
//This function will check who wins and add/deduct points from your chipcount
//as necessary.
var checkWhoWins = function () {
  console.log("check winner!")
  if(totalScoreFinder(yourCardsArray) > 21){
    setTimeout(function(){$(myConsole).text("You busted with " + totalScoreFinder(yourCardsArray) + ". You lose!  \nPress deal.")},1500);
    chipCount = chipCount - 10;
  }else if(totalScoreFinder(dealerCardArray) > 21) {
    setTimeout(function(){$(myConsole).text("You have " + totalScoreFinder(yourCardsArray) + ", the dealer busted with " + totalScoreFinder(dealerCardArray) + ". You win!  \nPress deal.")},1500);
    chipCount = chipCount + 10;
  }else {
      setTimeout(function (){$(dealerCard1).attr("class","card")},100)
      if(totalScoreFinder(yourCardsArray) === totalScoreFinder(dealerCardArray)){
        setTimeout(function(){$(myConsole).text("You and the dealer both have " + totalScoreFinder(yourCardsArray) + ". You split!  \nPress deal.")},1500);
      }else if(totalScoreFinder(yourCardsArray) > totalScoreFinder(dealerCardArray)) {
        setTimeout(function(){$(myConsole).text("You have " + totalScoreFinder(yourCardsArray) + ", the dealer has " + totalScoreFinder(dealerCardArray) + ". You win!  \nPress deal.")},1500);
        chipCount = chipCount + 10;
      } else {
          setTimeout(function(){$(myConsole).text("You have " + totalScoreFinder(yourCardsArray) + ", the dealer has " + totalScoreFinder(dealerCardArray) + ". You lose!  \nPress deal.")},1500);
          chipCount = chipCount - 10;
        }
      }
//If you don't have enough chips to play a hand, you're out!
    if(chipCount < 10){
      setTimeout(function(){$(myConsole).text("You have no chips, game over!  \nPress deal to start over.")},1000)
    }
//Show the deal button and update the chipcount
    $(dealButton).css("display","");
    setTimeout(function(){$("#chipstack").text(chipCount)},1800 )
  }
//++++++++++++++++++++++++++++++++++++RESET BOARD++++++++++++++++++++++++++++++++++++++++++++++++
//This function will reset all the variables that need resetting in order to play the next hand
//after a round is done.
var resetBoard = function (){
  console.log("reset");
  currentDeck = [];
  cardArray = [];
  yourCardsArray = [];
  dealerCardArray = [];
  playedCards = [];
  newCards = $(".new");
  $(newCards).remove();
  $(".card").css("color","black");
  $(dealerCard1).text("");
  $(dealerCard2).text("");
  $(yourCard1).text("");
  $(yourCard2).text("");
  $(dealerCard1).attr("class","card hidden");
  $(dealerCard2).attr("class","card hidden");
  $(yourCard1).attr("class","card hidden");
  $(yourCard2).attr("class","card hidden");
  makeDeck();
  dealCards();
  $("#hit").css("display","");
  $("#stand").css("display","");
}

//++++++++++++++++++++++++++THE END++++++++++++++++++++++++++++++++++++++++++++


































//++++++++++++++++++++++++OR IS IT????+++++++++++++++++++++++++++++++++++++++

left = 120000
var walkingPony = function() {
  var pony = $('#pony');
  left = left - 10
  $(pony).css("display","block")
  $(pony).css("left", left + "px")
  $(pony).css("top", "150px")
  if (left < -120000) {
    left = 120000
  }
};
setInterval(walkingPony,10)
// setTimeout(function(){$('#pony').css("left","1500px");$('#pony').hide()},0)
// var ponyTime = function (){
//   //var left = 1000
//   $('#pony').show();
//   $('#pony').animate({left:'1000'},"slow");
//   $('#pony').animate({left:'500'},"slow");
//   $('#pony').animate({left:'-500'},"slow");
//   //$('#pony').hide();
// }
// setTimeout(function(){ponyTime()},200000);
