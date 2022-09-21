const cardIds = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  
  const suits = ["diamonds", "clovers", "hearts", "spades"];
  
  const cardValues = [[11, 1], [2], [3], [4], [5], [6], [7], [8], [9], [10]];
  
  let cardCreator = function () {
    let deckAlpha = [];
    for (let x = 0; x < cardIds.length; x++) {
      for (let y = 0; y < suits.length; y++) {
        let currentCard = {};
        currentCard["id"] = cardIds[x];
        currentCard["suit"] = suits[y];
        if (
          currentCard["id"] !== "10" &&
          currentCard["id"] !== "J" &&
          currentCard["id"] !== "Q" &&
          currentCard["id"] !== "K"
        ) {
          currentCard["value"] = cardValues[x];
        } else {
          currentCard["value"] = cardValues[cardValues.length - 1];
        }
        deckAlpha.push(currentCard);
      }
    }
    return deckAlpha;
  };
  
  const orderedDeck = cardCreator();
  
  let shuffle = function (deck) {
    let shuffleOrderedDeck = deck;
    for (let i = shuffleOrderedDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let holder = shuffleOrderedDeck[i];
      shuffleOrderedDeck[i] = shuffleOrderedDeck[j];
      shuffleOrderedDeck[j] = holder;
    }
    return shuffleOrderedDeck;
  };
  
  let shuffledDeck = shuffle(cardCreator());
  
  let lastCardDrawn = {};
  
  const draw = function () {
    let cardDrawn = shuffledDeck.shift();
    lastCardDrawn = cardDrawn;
    cardCreatorHTML();
    return cardDrawn;
  };
  
  const spade =
    "https://media.gettyimages.com/photos/spades-card-symbol-picture-id1225058052?k=20&m=1225058052&s=612x612&w=0&h=2WTk-rJoSPJ4hhbbTs6X3uwoUQzkkeISya16rEtffpQ=";
  const heart =
    "https://media.gettyimages.com/vectors/cards-hearts-icon-flat-vector-id1158093606?k=20&m=1158093606&s=612x612&w=0&h=lzmyDvyW9wCm98eMNa3LtSKylw49YRxdO44SwA5P8tE=";
  const clover =
    "https://media.gettyimages.com/photos/clubs-card-symbol-picture-id1225058044?k=20&m=1225058044&s=612x612&w=0&h=zdQUv47EQyPrxQaGY9FpdoBuo_U9yBQ7N6gNkRl9eEE=";
  const diamond =
    "https://media.gettyimages.com/photos/diamonds-card-symbol-picture-id1225058062?k=20&m=1225058062&s=612x612&w=0&h=UZYF5bwDoX8CEofXZFsPnfua1NmPkXjHNmBMLqPo5W8=";
  
  const suitImages = [diamond, clover, heart, spade];
  
  let currentCardDiv = document.createElement("div");
  
  const cardCreatorHTML = function () {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    let cardPip = document.createElement("h1");
    cardPip.className = "cardId";
    cardPip.innerHTML = lastCardDrawn.id;
    let cardSuitImg = document.createElement("img");
    cardSuitImg.className = lastCardDrawn.suit;
    for (let i = 0; i < suits.length; i++) {
      if (lastCardDrawn.suit === suits[i]) {
        cardSuitImg.src = suitImages[i];
      }
    }
    cardDiv.appendChild(cardPip);
    cardDiv.appendChild(cardSuitImg);
    currentCardDiv = cardDiv;
    return cardDiv;
  };
  
  const cardBackCreatorHTML = function () {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    let cardBackDiv = document.createElement("div");
    cardBackDiv.className = "cardBack";
    cardDiv.appendChild(cardBackDiv);
    return cardDiv;
  };
  
  let dealer = {
    hand: [],
    get handTotalValue() {
      let valueTotal = 0;
      for (let i = 0; i < this["hand"].length; i++) {
        if (this["hand"][i]["id"] === "A" && valueTotal > 10) {
          valueTotal += this["hand"][i]["value"][1];
        } else {
          valueTotal += this["hand"][i]["value"][0];
        }
      }
      if (
        valueTotal > 21 &&
        (this["hand"][0]["id"] === "A" ||
          this["hand"][1]["id"] === "A" ||
          this["hand"][2]["id"] === "A")
      ) {
        valueTotal = 0;
        for (let i = 0; i < this["hand"].length; i++) {
          if (this["hand"][i]["id"] === "A") {
            valueTotal += this["hand"][i]["value"][1];
          } else {
            valueTotal += this["hand"][i]["value"][0];
          }
        }
      }
      return valueTotal;
    }
  };
  
  let player = {
    hand: [],
    get handTotalValue() {
      let valueTotal = 0;
      for (let i = 0; i < this["hand"].length; i++) {
        if (valueTotal > 10 && this["hand"][i]["id"] === "A") {
          valueTotal += this["hand"][i]["value"][1];
        } else {
          valueTotal += this["hand"][i]["value"][0];
        }
      }
      if (
        valueTotal > 21 &&
        (this["hand"][0]["id"] === "A" ||
          this["hand"][1]["id"] === "A" ||
          this["hand"][2]["id"] === "A")
      ) {
        valueTotal = 0;
        for (let i = 0; i < this["hand"].length; i++) {
          if (this["hand"][i]["id"] === "A") {
            valueTotal += this["hand"][i]["value"][1];
          } else {
            valueTotal += this["hand"][i]["value"][0];
          }
        }
      }
      return valueTotal;
    }
  };
  
  const dealerHand = document.getElementById("dealerHand");
  const playerHand = document.getElementById("playerHand");
  const firstHand = document.getElementById("firstHand");
  const splitHand = document.getElementById("splitHand");
  const deal = document.getElementById("deal");
  const hit = document.getElementById("hit");
  const stand = document.getElementById("stand");
  const split = document.getElementById("split");
  const splitHandHit = document.getElementById("splitHandHit");
  const dealerText = document.getElementById("dealerText");
  const playerText = document.getElementById("playerText");
  const splitHandText = document.getElementById("splitHandText");
  
  let playerWins = false;
  let dealerWins = false;
  let tie = false;
  
  hit.disabled = true;
  stand.disabled = true;
  split.disabled = true;
  splitHandHit.disabled = true;
  
  const playerDealerConsole = function () {
    let playerConsole = "Player: ";
    for (let i = 0; i < player.hand.length; i++) {
      playerConsole += player.hand[i].id;
      playerConsole += " of ";
      playerConsole += player.hand[i].suit;
      if (i < player.hand.length - 1) {
        playerConsole += " & ";
      }
    }
    playerConsole += " - Total Card Value = ";
    playerConsole += JSON.stringify(player.handTotalValue);
    playerText.innerHTML = playerConsole;
    console.log(playerConsole);
    if (Array.isArray(player.splitHand) === true) {
      let splitHandConsole = "Player (Split Hand): ";
      for (let i = 0; i < player.splitHand.length; i++) {
        splitHandConsole += player.splitHand[i].id;
        splitHandConsole += " of ";
        splitHandConsole += player.splitHand[i].suit;
        if (i < player.splitHand.length - 1) {
          splitHandConsole += " & ";
        }
      }
      splitHandConsole += " - Total Card Value = ";
      splitHandConsole += JSON.stringify(player.totalSplitHandValue);
      splitHandText.innerHTML = splitHandConsole;
      console.log(splitHandConsole);
    }
    let dealerConsole = "";
    if (playerWins === true || dealerWins === true || tie === true) {
      dealerConsole = "Dealer: ";
      for (let i = 0; i < dealer.hand.length; i++) {
        dealerConsole += dealer.hand[i].id;
        dealerConsole += " of ";
        dealerConsole += dealer.hand[i].suit;
        if (i < dealer.hand.length - 1) {
          dealerConsole += " & ";
        }
      }
      dealerConsole += " - Total Card Value = ";
      dealerConsole += JSON.stringify(dealer.handTotalValue);
    } else {
      dealerConsole = "Dealer: ?? & ";
      for (let i = 1; i < dealer.hand.length; i++) {
        dealerConsole += dealer.hand[i].id;
        dealerConsole += " of ";
        dealerConsole += dealer.hand[i].suit;
        if (i < dealer.hand.length - 1) {
          dealerConsole += " & ";
        }
      }
      dealerConsole += " - Total Card Value = ??";
    }
    dealerText.innerHTML = dealerConsole;
    console.log(dealerConsole);
  };
  
  const gameReset = function () {
    playerWins = false;
    dealerWins = false;
    tie = false;
  
    while (dealerHand.firstChild) {
      dealerHand.removeChild(dealerHand.firstChild);
    }
    while (firstHand.firstChild) {
      firstHand.removeChild(firstHand.firstChild);
    }
    while (splitHand.firstChild) {
      splitHand.removeChild(splitHand.firstChild);
    }
    dealerText.innerHTML = "";
    playerText.innerHTML = "";
    splitHandText.innerHTML = "";
    endGameText.innerHTML = "";
    split.disabled = true;
    splitHandHit.disabled = true;
    hit.disabled = false;
    stand.disabled = false;
    dealer["hand"] = [];
    player["hand"] = [];
    delete player["splitHand"];
    delete player["totalSplitHandValue"];
    splitHand.style.marginLeft = "0px";
    firstHand.style.marginLeft = "0px";
    shuffledDeck = shuffle(cardCreator());
  };
  
  const hitStandDisable = function () {
    if (playerWins === true || dealerWins === true || tie === true) {
      hit.disabled = true;
      stand.disabled = true;
      split.disabled = true;
      splitHandHit.disabled = true;
    }
    if (player.handTotalValue > 21) {
      hit.disabled = true;
    }
    if (player.totalSplitHandValue > 21) {
      splitHandHit.disabled = true;
    }
  };
  
  const showDownCard = function () {
    if (playerWins === true || dealerWins === true || tie === true) {
      lastCardDrawn = dealer["hand"][0];
      cardCreatorHTML();
      dealerHand.removeChild(dealerHand.firstChild);
      dealerHand.prepend(currentCardDiv);
    }
  };
  
  deal.onclick = function () {
    gameReset();
    for (let i = 0; i < 2; i++) {
      player["hand"].push(draw());
      firstHand.appendChild(currentCardDiv);
      dealer["hand"].push(draw());
      if (i < 1) {
        dealerHand.appendChild(cardBackCreatorHTML());
      } else {
        dealerHand.appendChild(currentCardDiv);
      }
    }
    if (player["handTotalValue"] === 21 && dealer["handTotalValue"] === 21) {
      tie = true;
      showDownCard();
    } else if (
      (player["handTotalValue"] === 21) &
      (dealer["handTotalValue"] < 21)
    ) {
      playerWins = true;
      showDownCard();
    } else if (splittable() === true) {
      split.disabled = false;
    }
    hitStandDisable();
    endGameMsg();
    playerDealerConsole();
  };
  
  const playerBust = function () {
    if (
      Array.isArray(player["splitHand"]) !== true &&
      player["handTotalValue"] > 21
    ) {
      dealerWins = true;
    } else if (
      player["totalSplitHandValue"] > 21 &&
      player["handTotalValue"] > 21
    ) {
      dealerWins = true;
    }
    showDownCard();
    endGameMsg();
  };
  
  hit.onclick = function () {
    player["hand"].push(draw());
    firstHand.appendChild(currentCardDiv);
    playerBust();
    hitStandDisable();
    split.disabled = true;
    playerDealerConsole();
  };
  
  stand.onclick = function () {
    while (dealer["handTotalValue"] < 18) {
      dealer["hand"].push(draw());
      dealerHand.appendChild(currentCardDiv);
    }
    winConditions();
    showDownCard();
    hitStandDisable();
    endGameMsg();
    playerDealerConsole();
  };
  
  let splittable = function () {
    if (player["hand"][0]["id"] === player["hand"][1]["id"]) {
      return true;
    } else {
      return false;
    }
  };
  
  split.onclick = function () {
    player["splitHand"] = [];
    Object.defineProperty(player, "totalSplitHandValue", {
      get: function () {
        let valueTotal = 0;
        for (let i = 0; i < this["splitHand"].length; i++) {
          if (valueTotal > 10 && this["splitHand"][i]["id"] === "A") {
            valueTotal += this["splitHand"][i]["value"][1];
          } else {
            valueTotal += this["splitHand"][i]["value"][0];
          }
        }
        if (
          valueTotal > 21 &&
          (this["splitHand"][0]["id"] === "A" ||
            this["splitHand"][1]["id"] === "A" ||
            this["splitHand"][2]["id"] === "A")
        ) {
          valueTotal = 0;
          for (let i = 0; i < this["splitHand"].length; i++) {
            if (this["splitHand"][i]["id"] === "A") {
              valueTotal += this["splitHand"][i]["value"][1];
            } else {
              valueTotal += this["splitHand"][i]["value"][0];
            }
          }
        }
        return valueTotal;
      },
      configurable: true
    });
    let splitCard = player["hand"].pop();
    console.log(splitCard);
    firstHand.removeChild(firstHand.lastChild);
    player["splitHand"].push(splitCard);
    lastCardDrawn = splitCard;
    console.log(lastCardDrawn);
    cardCreatorHTML();
    splitHand.appendChild(currentCardDiv);
    player["hand"].push(draw());
    firstHand.appendChild(currentCardDiv);
    player["splitHand"].push(draw());
    splitHand.appendChild(currentCardDiv);
    splitHand.style.marginLeft = "125px";
    firstHand.style.marginLeft = "0px";
    dealerHand.style.marginLeft = "100px";
    playerHand.style.marginLeft = "100px";
    split.disabled = true;
    splitHandHit.disabled = false;
    playerDealerConsole();
  };
  
  splitHandHit.onclick = function () {
    if (Array.isArray(player["splitHand"]) === true) {
      player["splitHand"].push(draw());
      splitHand.appendChild(currentCardDiv);
    }
    playerBust();
    hitStandDisable();
    playerDealerConsole();
  };
  
  const winConditions = function () {
    if (dealer["handTotalValue"] > 21) {
      playerWins = true;
    } else if (
      Array.isArray(player["splitHand"]) !== true &&
      player["handTotalValue"] < dealer["handTotalValue"]
    ) {
      dealerWins = true;
    } else if (
      Array.isArray(player["splitHand"]) !== true &&
      player["handTotalValue"] === dealer["handTotalValue"]
    ) {
      tie = true;
    } else if (
      (player["handTotalValue"] > dealer["handTotalValue"] &&
        player["handTotalValue"] < 22) ||
      (player["totalSplitHandValue"] > dealer["handTotalValue"] &&
        player["totalSplitHandValue"] < 22)
    ) {
      playerWins = true;
    } else if (
      player["handTotalValue"] < dealer["handTotalValue"] &&
      player["totalSplitHandValue"] < dealer["handTotalValue"]
    ) {
      dealerWins = true;
    } else if (
      player["handTotalValue"] < dealer["handTotalValue"] &&
      player["totalSplitHandValue"] > 21
    ) {
      dealerWins = true;
    } else if (
      player["handTotalValue"] > 21 &&
      player["totalSplitHandValue"] < dealer["handTotalValue"]
    ) {
      dealerWins = true;
    } else if (
      player["handTotalValue"] === dealer["handTotalValue"] &&
      player["totalSplitHandValue"] === dealer["handTotalValue"]
    ) {
      tie = true;
    } else if (
      player["handTotalValue"] === dealer["handTotalValue"] &&
      (player["totalSplitHandValue"] < dealer["handTotalValue"] ||
        player["totalSplitHandValue"] > 21)
    ) {
      tie = true;
    } else if (
      (player["handTotalValue"] < dealer["handTotalValue"] ||
        player["handTotalValue"] > 21) &&
      player["totalSplitHandValue"] === dealer["handTotalValue"]
    ) {
      tie = true;
    }
  };
  
  const endGameText = document.getElementById("endGameText");
  
  const endGameMsg = function () {
    if (tie === true) {
      endGameText.innerHTML = "Tie!";
      endGameText.style.color = "rgb(0,115,100)";
      // window.alert("Tie Game!");
    } else if (playerWins === true) {
      endGameText.innerHTML = "Player Wins!";
      endGameText.style.color = "rgb(0,55,85)";
      // window.alert("Player Wins!");
    } else if (dealerWins === true) {
      endGameText.innerHTML = "Dealer Wins!";
      endGameText.style.color = "rgb(97,0,0)";
      // window.alert("Dealer Wins!");
    }
  };
  