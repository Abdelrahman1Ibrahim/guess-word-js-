// Select the elements
const numTrial = document.querySelector(".numTrial"),
  sentenceDisc = document.querySelector(".sentenceDisc"),
  word = document.querySelector(".word"),
  inputs = document.querySelector(".inputs"),
  winner = document.querySelector(".winner"),
  button = document.querySelector("button"),
  audio = new Audio("./audios_succ.mp3");

let Allinputs = [],
  makeWord = [];

let bigGuess = 12,
  wordGuess = "",
  disc = "";

window.onload = randomWord;
button.addEventListener("click", randomWord);
document.addEventListener("keydown", () => word.focus());
word.addEventListener("input", handleCharacterInput);

/**
 * This function selects a random word from a JSON file and updates the game state.
 * It hides the winner element, pauses audio, and fetches a list of words and descriptions.
 * A random word is chosen, and its corresponding description is set.
 * It updates the number of trials displayed and generates input fields for each letter of the word.
 */

function randomWord() {
  reset();
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      let index = Math.floor(Math.random() * data.length);
      wordGuess = data[index].word.toUpperCase();
      disc = data[index].disc;
      numTrial.textContent = bigGuess;
      sentenceDisc.textContent = disc;
      inputs.innerHTML = "";
      for (let i = 0; i < wordGuess.length; i++) {
        inputs.innerHTML += `<input type="text" disabled />`;
      }
    });
}

/**
 * Handles input events from the user.
 * @param {Event} event - the input event
 */
function handleCharacterInput(event) {
  console.log(wordGuess);
  const character = event.target.value.toUpperCase();

  if (
    character.match(/[a-zA-Z]/) &&
    wordGuess.includes(character) &&
    !makeWord.includes(character)
  ) {
    Allinputs = document.querySelectorAll(".inputs input");
    for (let i = 0; i < wordGuess.length; i++) {
      if (wordGuess[i] === character) {
        Allinputs[i].value = character;
        makeWord.push(character);
      }
    }
  } else {
    bigGuess--;
  }
  numTrial.textContent = bigGuess;
  event.target.value = "";

  if (makeWord.length === wordGuess.length) {
    winner.classList.remove("hidden");
    audio.play();
    bigGuess = 12;
    makeWord = [];
  }

  handelLose();
}

/**
 * Handles the case when the player loses the game.
 * If the number of guesses is less than or equal to 0, the function is called.
 * It reveals the word, resets the game state, and alerts the player to the
 * loss. It also calls the randomWord function after a short delay.
 */

function handelLose() {
  if (bigGuess <= 0) {
    Allinputs = document.querySelectorAll(".inputs input");
    for (let i = 0; i < wordGuess.length; i++) {
      Allinputs[i].value = wordGuess[i];
    }

    reset();

    setTimeout(() => {
      numTrial.textContent = bigGuess;
      alert("  😄  ياخسران صعب تكسب :)");
      randomWord();
    }, 50);
  }
}
function reset() {
  bigGuess = 12;
  makeWord = [];
  winner.classList.add("hidden");
  audio.pause();
}
