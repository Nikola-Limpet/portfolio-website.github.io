
const letters = document.querySelectorAll('.box');  // Select all the boxes
const loading = document.querySelector('.info-bar');  // Select the loading spinner
const ANSWER_LENGTH = 5;  // Set the answer length to 5


async function init() {
  let currentGuess = ''; 
  let currentRow = 0;
  let done = false;
  let isLoading = true;

  setLoading(true);  // Show the loading spinner
  const response = await fetch('https://words.dev-apis.com/word-of-the-day');  // Get the word from the API
  const responseObject = await response.json();
  const word = responseObject.word.toUpperCase();  // Convert the word to uppercase
  isLoading = false;
  setLoading(isLoading);  // Hide the loading spinner
  


  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;   // Add the letter to the last box
    } else {
      currentGuess = currentGuess.substring(0, ANSWER_LENGTH - 1) + letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerHTML = letter;  // Add the letter to the last box 
    //by taking the ANSWER_LENGTH - 1 from the currentRow and add the letter

  }
  async function commit() {
    // user try to guess the word
    if (currentGuess.length !== ANSWER_LENGTH) {
      return; // if the word isn't fill in yet, do nothing
      }

    // TODO: valitate the word

    // TODO: do all marking  as "correct" and "wrong" here

    // TODO: did user win or lose?  
    currentRow++;
    currentGuess = '';
    }
  function backspace() {
    if(currentGuess.length > 0) {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);  // Remove the last letter
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerHTML = '';
    }
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
function setLoading(isLoading) {
  loading.classList.toggle('hidden', !isLoading);
    //show the loading spinner
    //hide the loading spinner
   
}

init();