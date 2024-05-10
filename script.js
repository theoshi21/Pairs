var deck = [];
var player1Deck = [];
var player2Deck = [];
var player3Deck = [];
var player4Deck = [];
var folded;
var pairs = [];
var active = 1;


for(var i = 0; i < 4; i++){
    var letter
    if(i==0) letter = "H";
    if(i==1) letter = "C";
    if(i==2) letter = "D";
    if(i==3) letter = "S";
    for(var j = 1; j <= 13; j++){
        deck.push(letter+j);
    }
}

var disp = "";
var cardTable = document.getElementById("deckOfCard");
for(var i = 0; i < 4; i++){
    disp += "<tr> \n";
    var letter
    if(i==0) letter = "H";
    if(i==1) letter = "C";
    if(i==2) letter = "D";
    if(i==3) letter = "S";
    for(var j = 1; j <= 13; j++){
        if(j>10){
            let special;
            switch(j){
                case 11: special = "J"; break;
                case 12: special = "Q"; break;
                case 13: special = "K"; break;
            }
            disp += "<td id='"+letter+j+"'>"+special+"<img src='"+letter+".png'"+"> </td> \n" 
        }
        else if(j==1){
            disp += "<td id='"+letter+j+"'>"+"A"+"<img src='"+letter+".png'"+"> </td> \n" 
        }
        else disp += "<td id='"+letter+j+"'>"+j+"<img src='"+letter+".png'"+"> </td> \n"  
    }
    disp += "</tr>\n"
}
cardTable.innerHTML = disp;
//console.log(disp);    


function random(min, max){
    return Math.floor((Math.random() * max)+min)
} 

function play(){
    getFoldedCard();
    distributeCard();
    displayAllCard()
    hideDeck();
    document.getElementById("playBtn").innerHTML = "NEXT";
    document.getElementById("playBtn").onclick = next;
}

function next(){
    findPairs(player1Deck);
    findPairs(player2Deck);
    findPairs(player3Deck);
    findPairs(player4Deck);
    document.getElementById("playBtn").innerHTML = "SWAP";
    document.getElementById("playBtn").onclick = swap;
    arrayPlayerDeck = [
        [1, player1Deck],
        [2, player2Deck],
        [3, player3Deck],
        [4, player4Deck]
    ]
}

function swap(){
    takeCard();
}

function findPairs(playerDeck){
    for(i=0; i < playerDeck.length;i++){
        for(j=i+1; j < playerDeck.length; j++){
            if((playerDeck[i].substr(1) === playerDeck[j].substr(1)) && (playerDeck[i].substr(0,1) != playerDeck[j].substr(0,1))){
                if(!pairs.includes(playerDeck[i])&&!pairs.includes(playerDeck[j])){
                    var found1 = document.getElementById("p"+playerDeck[i]);
                    var found2 = document.getElementById("p"+playerDeck[j]);
                    console.log("Found "+playerDeck[i]+" and "+playerDeck[j])
                    pairs.push(playerDeck[i]);
                    pairs.push(playerDeck[j]);
                    found1.style.display = "none";
                    found2.style.display = "none";
                    break;
                }
            }
        }
    }
    console.log(pairs)
    displayPairedCards();
    removePairs()
}


function displayPairedCards(){
    for(let i=0; i<pairs.length; i++){
        document.getElementById(pairs[i]).innerHTML = pairs[i].substr(1) +"<img src='" +pairs[i].substr(0,1) + ".png'>";
    }
}

function displayAllCard(){
    displayCard(player1Deck,1);
    displayCard(player2Deck,2);
    displayCard(player3Deck,3);
    displayCard(player4Deck,4);
}

function removePairs(){
    for(let i=player1Deck.length-1;i>=0;i--){
        if(pairs.includes(player1Deck[i])){
            console.log(player1Deck[i])
            player1Deck.splice(i,1)
        }
    }

    for(let i=player2Deck.length-1;i>=0;i--){
        if(pairs.includes(player2Deck[i])){
            console.log(player2Deck[i])
            player2Deck.splice(i,1)
        }
    }

    for(let i=player3Deck.length-1;i>=0;i--){
        if(pairs.includes(player3Deck[i])){
            console.log(player3Deck[i])
            player3Deck.splice(i,1)
        }
    }

    for(let i=player4Deck.length-1;i>=0;i--){
        if(pairs.includes(player4Deck[i])){
            console.log(player4Deck[i])
            player4Deck.splice(i,1)
        }
    }
}

function getFoldedCard(){
    var index = random(0,deck.length-1);
    folded = deck[index];
    deck.splice(index,1);
    console.log(deck.length);
    console.log("Folded: "+folded)
    document.getElementById("foldCard").style.display = "flex";
}

function distributeCard(){
    let randPlayer = random(0,3)
    for(i = 0; i < 4; i++){
        if(i === randPlayer){
            for(j = 0; j < 12; j++){
                let randIndex = random(0,deck.length-1)
                switch(i){
                    case 0: 
                        player1Deck.push(deck[randIndex]); break;
                    case 1: 
                        player2Deck.push(deck[randIndex]); break;
                    case 2: 
                        player3Deck.push(deck[randIndex]); break;
                    case 3: 
                        player4Deck.push(deck[randIndex]); break;
                }
                deck.splice(randIndex,1);
            }
        }
        else{
            for(j = 0; j < 13; j++){
                let randIndex = random(0, deck.length-1)
                switch(i){
                    case 0: 
                        player1Deck.push(deck[randIndex]); break;
                    case 1: 
                        player2Deck.push(deck[randIndex]); break;
                    case 2: 
                        player3Deck.push(deck[randIndex]); break;
                    case 3: 
                        player4Deck.push(deck[randIndex]); break;
                }
                deck.splice(randIndex,1);
            }
        }
    }
    console.log(player1Deck)
    console.log(player2Deck)
    console.log(player3Deck)
    console.log(player4Deck)
}

function displayCard(playerDeck, playerNum){
    var disp = "";
    for(cards = 0; cards < playerDeck.length; cards++){
        var num = playerDeck[cards].substr(1);
        if(num>10){
            let special;
            switch(num){
                case "11": special = "J"; break;
                case "12": special = "Q"; break;
                case "13": special = "K"; break;
            }
            disp += "<div class='playerCard' id='p"+playerDeck[cards]+"'> "+special+"<img src='"+playerDeck[cards].substr(0,1)+".png'>"+" </div>\n"
        }
        else if (num==1) {
            disp += "<div class='playerCard' id='p"+playerDeck[cards]+"'> "+"A"+"<img src='"+playerDeck[cards].substr(0,1)+".png'>"+" </div>\n"
        }
        else{
            disp += "<div class='playerCard' id='p"+playerDeck[cards]+"'> "+playerDeck[cards].substr(1)+"<img src='"+playerDeck[cards].substr(0,1)+".png'>"+" </div>\n"
        }
        
    }
    document.getElementById("player"+playerNum+"Card").innerHTML = disp;
}

function hideDeck(){
    for(var i = 0; i < 4; i++){
        var letter
        if(i==0) letter = "H";
        if(i==1) letter = "C";
        if(i==2) letter = "D";
        if(i==3) letter = "S";
        for(var j = 1; j <= 13; j++){
            document.getElementById(letter+j).innerText = "";
            document.getElementById(letter+j).style.border = "0";
        }
    }
}


var arrayPlayerDeck = [];
var maxIndex = arrayPlayerDeck.length-1;
var active = 0;
/*var arrayPlayerDeck = [
    [1, player1Deck],
    [2, [player2Deck],
    [3, [player3Deck],
    [4, [player4Deck]
]*/
function takeCard(){
    console.log("active num: "+active)
    let activeDeck = [], nextDeck = [];
    let next;
    if(active+1 < arrayPlayerDeck.length){
        next = active+1;
    }
    else {
        next = 0;
    }

    activeDeck = arrayPlayerDeck[active][1]
    nextDeck = arrayPlayerDeck[next][1]
    console.log("ACTIVE DECK: "+activeDeck);
    console.log("NEXT DECK: "+nextDeck);
    console.log("player #: "+arrayPlayerDeck[active][0])

    let randPCard = random(0,activeDeck.length)
    nextDeck.push(activeDeck[randPCard])
    activeDeck.splice(randPCard,1)
    
    console.log("a deck length: "+activeDeck.length)
    console.log("n deck length: "+nextDeck.length)

    displayCard(activeDeck,arrayPlayerDeck[active][0])   
    displayCard(nextDeck,arrayPlayerDeck[next][0])


    console.log(activeDeck.length===0)
    console.log(nextDeck.length===0)
    console.log(arrayPlayerDeck)
    findPairs(nextDeck,arrayPlayerDeck[next][0]);   
    displayPairedCards();    

    if(activeDeck.length === 0) {
        console.log("removing "+arrayPlayerDeck[active])
        arrayPlayerDeck.splice(active,1)
        console.log("Dick now: "+arrayPlayerDeck)
    }

    if(nextDeck.length === 0) {
        console.log("removing "+arrayPlayerDeck[next])
        arrayPlayerDeck.splice(next,1)
        console.log("Dick now: "+arrayPlayerDeck[next])
    }

    if(next >= arrayPlayerDeck.length) {
        active = next-1;
    }
    else if (nextDeck.length !== 0) active = next;
    else active = 0;//need to have a checker for next, what if the next becomes 0 after pairing

    if(pairs.length === 50){
        console.log("fold: "+folded)
        document.getElementById("foldCard").innerHTML = folded.substr(1) + "<img src='"+folded.substr(0,1)+".png'>"
    }

}