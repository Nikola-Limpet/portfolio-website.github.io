// Starting on the JS, get the core mechanic of typing down. You'll have to handle
// Handle a keystroke with a letter.

// Handle a wrong keystroke (like a number or spacebar). Ignore it.
// Handle "Enter" when the word is complete (go to the next line)
// Handle "Enter" when the word is incomplete (ignore it)
// Handle "Backspace" when there's a letter to delete
// Handle "Backspace" when there's no letter to delete
// Handle the API request to get the word of the day
// Handle checking just if the word submitted after a user hits enter is the word is the word of the day
// Handle the "win" condition (I'd just start with alert('you win')))
// Handle the "lose" condition (I'd just start with alert('you lose, the word was ' + word)))
// Handle the guess's correct letter in the correct space (the green squares)
// Handle the guess's wrong letters outright (the gray squares)
// Handle the yellow squares
// Handle the correct letters, wrong space (the yellow squares) naïvely. If a word contains the letter at all but it's in the wrong square, just mark it yellow.
// Handle the yellow squares correctly. For example, if the player guesses "SPOOL" and the word is "OVERT", one "O" is shown as yellow and the second one is not. Green squares count too.
// Add some indication that a user needs to wait for you waiting on the API, some sort of loading spinner.
// Add the second API call to make sure a user is requesting an actual word.
// Add some visual indication that the user guessed something isn't an actual word (I have the border flash red on the current line)
// Add some fun animation for a user winning (I have the Word Masters brand flash rainbow colors)

// Add some fun animation for a user losing (I have the Word Masters brand flash rainbow colors)


const letters = document.querySelectorAll('.box');  // Select all the boxes
const loading = document.querySelector('.info-bar');  // Select the loading spinner
const ANSWER_LENGTH = 5;  // Set the answer length to 5


async function init() {
  let currentGuess = ''; 



  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;   // Add the letter to the box
    } else {
      currentGuess = currentGuess.substring(0, ANSWER_LENGTH - 1) + letter;
    }
    letters[currentGuess.length - 1].innerHTML = letter;  // Add the letter to the box
  }


  document.addEventListener('keydown', function handleKeyPress(event) {
    const action = event.key;   // Get the key that was pressed
    if (action === 'Enter') {
      commit();       //do function commit
    } else if (action === 'Backspace') {
      backspace();    //do function backspace
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());    //do function addLetter
    } else {
      return; //do nothing if it's not a letter or enter or backspace
    }
  });
}
function isLetter(letter) {
  return /[a-zA-Z]/.test(letter);       //handle only letters
}

init();