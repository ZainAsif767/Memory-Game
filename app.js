const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
//items array
const items = [
    { name: "bee", image: "bee.png" },
    { name: "crocodile", image: "crocodile.png" },
    { name: "macaw", image: "macaw.png" },
    { name: "gorilla", image: "gorilla.png" },
    { name: "tiger", image: "tiger.png" },
    { name: "monkey", image: "monkey.png" },
    { name: "chameleon", image: "chameleon.png" },
    { name: "piranha", image: "piranha.png" },
    { name: "frog", image: "frog.png" },
    { name: "sloth", image: "sloth.png" },
    { name: "cockatoo", image: "cockatoo.png" },
    { name: "toucan", image: "toucan.png" },
];
//initial time
let seconds = 0, minutes = 0;
//initial moves and win count 
let movesCount = 0, winCount = 0;

//for timer
const timeGenerator = () => {
    seconds += 1;
    //minutes logicc
    if (seconds => 60) {
        minutes += 1;
        seconds = 0;
    }
    //format time before displaying 
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//for calculating moves
const movesGenerater = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//pick random objects from the items array
const generateRandom = (size = 4) => {
    //temp array
    let tempArray = { ...items };
    //initialzies cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (szie * size) / 2;
    //random objects selection
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() *
            tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        //once selected remove the object from temp arr
        tempArray.splice(randomIndex, 1);
    }
    return cardValues
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        /*
            Create Cards
            before => front side (contains question mark)
            after => back side (contains actual image);
            data-card-values is a custom attribute which stores the names of the cards to match later
          */
        gameContainer.innerHTML += `
         <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/></div>
         </div>
         `;
    }
    //grid
    gameContainer.style.gridTemplatecolumns = `repeat(${size},auto)`;
    //cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else {
                    movesCount();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>YOU WON</h2>
                            <h4>Moves: ${movesCount}</h4>`;
                            stopGame();
                        }
                        else {
                            let [tempFirst, tempSecond] = [firstCard, secondCard];
                            firstCard = false;
                            secondCard = false;
                            let delay = setTimeout(() => {
                                tempFirst.classList.remove("flipped");
                                tempSecond.classList.remove("flipped");
                            }, 900);
                        }
                    }
                }
            }
        });
    });
};
