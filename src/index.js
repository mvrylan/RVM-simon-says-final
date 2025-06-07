/**
 * DOM SELECTORS
 */

 const startButton = document.querySelector(".js-start-button");
 const statusSpan = document.querySelector(".js-status"); 
 const heading = document.querySelector(".js-heading"); 
 const padContainer = document.querySelector(".js-pad-container"); 
 // Level Button Selector added:
 const levelBtn = document.querySelectorAll(".js-level-btn");

/**
 * VARIABLES
 */
let computerSequence = []; 
let playerSequence = []; 
let maxRoundCount = 0; 
let roundCount = 0;
let levelRating = 8;

 const pads = [
  {
    color: "red",
    selector: document.querySelector(".js-pad-red"),
    sound: new Audio("../assets/simon-says-sound-1.mp3"),
  },
  {
    color: "green",
    selector: document.querySelector(".js-pad-green"),
    sound: new Audio("../assets/simon-says-sound-2.mp3"),
  },
  {
    color: "blue",
    selector: document.querySelector(".js-pad-blue"),
    sound: new Audio("../assets/simon-says-sound-3.mp3"),
  }, 
  {
    color: "yellow",
    selector: document.querySelector(".js-pad-yellow"),
    sound: new Audio("../assets/simon-says-sound-4.mp3"),
  }
];

/**
 * EVENT LISTENERS
 */

padContainer.addEventListener("click", padHandler);
startButton.addEventListener("click", startButtonHandler);
// My additions:
levelBtn.forEach(button => {
    button.addEventListener("click", setLevel);
})

/**
 * EVENT HANDLERS
 */


function startButtonHandler() {
  if (typeof levelRating === "number") {
    maxRoundCount = levelRating;
  } else {
    maxRoundCount = 8;
  }
  roundCount++;
  startButton.classList.add("hidden");
  statusSpan.classList.remove("hidden");  
  playComputerTurn();
  return { startButton, statusSpan };
}

function padHandler(event) {
  const { color } = event.target.dataset;
  if (!color) return;

  const pad = pads.find((pad) => pad.color === color);
  pad.sound.play();
  checkPress(color);
  return color;
}

// setLevel modified to accomodate addition of difficulty buttons
function setLevel(event) {
  levelBtn.forEach(button => button.classList.remove("bold"));
  event.target.classList.add("bold");

  switch (true) {
      case this.classList.contains("js-easy"):
          levelRating = 8;
          break;
      case this.classList.contains("js-medium"):
          levelRating = 14;
          break;
      case this.classList.contains("js-hard"):
          levelRating = 20;
          break;
      case this.classList.contains("js-very-hard"):
          levelRating = 31;
          break;
      default:
          levelRating = 8;
          break;
  }
}

/**
 * HELPER FUNCTIONS
 */

function getRandomItem(collection) {
  if (collection.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}

function setText(element, text) {
  element.textContent = text;
  return element;
}

function activatePad(color) {
  const pad = pads.find((pad) => pad.color === color);
  activeSelector = pad.selector;
  activeSelector.classList.add("activated");
  pad.sound.play();
  setTimeout(() => activeSelector.classList.remove("activated"), 500);
}

function activatePads(sequence) {
  let delay = 0;
  sequence.forEach((color) => {
    setTimeout(() => activatePad(color), delay);
    delay += 700;
  });
}

 function playComputerTurn() {
  padContainer.classList.add("unclickable");
  levelBtn.forEach(button => button.classList.add("unclickable"));
  setText(statusSpan, ("The computer's turn..."));
  setText(heading, (`Round ${roundCount} of ${maxRoundCount}`));
  computerSequence.push(getRandomItem(["red", "blue", "green", "yellow"]));
  activatePads(computerSequence);
  console.log(computerSequence);

  setTimeout(() => playHumanTurn(roundCount), roundCount * 700 + 500); // 5
}

function playHumanTurn() {
  padContainer.classList.remove("unclickable");
  setText(statusSpan, `${roundCount} presses left`);
}

function checkPress(color) {
  playerSequence.push(color);
  const index = playerSequence.length - 1;
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(statusSpan, (`${remainingPresses} presses left`));
  if (computerSequence[index] !== playerSequence[index]) {
    resetGame("You lost...");
    return;
  }
  if (remainingPresses === 0) checkRound();
}

function checkRound() {
  if (playerSequence.length === maxRoundCount) {
    resetGame("You won!");
  } else {
    roundCount++;
    playerSequence = [];
    setText(statusSpan, "Good... keep going!");
    setTimeout(() => playComputerTurn(), 1000);
  }
}

function resetGame(text) {
  computerSequence = [];
  playerSequence = [];
  roundCount = [];

  alert(text);
  setText(heading, "Simon Says Zen");
  startButton.classList.remove("hidden");
  statusSpan.classList.add("hidden");
  padContainer.classList.add("unclickable");
  levelBtn.forEach(button => button.classList.remove("unclickable"));
}

/**
 * Please do not modify the code below.
 * Used for testing purposes.
 *
 */
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;
