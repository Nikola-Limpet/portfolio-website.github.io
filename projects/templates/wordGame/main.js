
const letters = document.querySelectorAll('.box');  // Select all the boxes
const loading = document.querySelector('.info-bar');  // Select the loading spinner
const ANSWER_LENGTH = 5;  // Set the answer length to 5
const MAX_GUESSES = 6;  // Set the maximum guesses to 6


async function init() {
  let currentGuess = ''; 
  let currentRow = 0;
  let done = false;
  let isLoading = true;

  setLoading(true);  // Show the loading spinner
  const response = await fetch('https://words.dev-apis.com/word-of-the-day');  // Get the word from the API
  const responseObject = await response.json();
  const word = responseObject.word.toUpperCase();  // Convert the word to uppercase
  const wordParts = word.split('');  // Split the word into an array of letters
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
    isLoading = true;
    setLoading(isLoading);
    const response = await fetch("https://words.dev-apis.com/validate-word",
      { method: "POST",
        body: JSON.stringify({ word: currentGuess }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const { validWord } = await response.json();
    isLoading = false;
    setLoading(isLoading);
    if (!validWord) {
      markInvalidWord();
      return;
    }

      // TODO: do all marking  as "correct" and "wrong" here
      const currentParts = currentGuess.split("");
      const map = makeMap(wordParts);
      
      for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (currentParts[i] === wordParts[i]) {
          // mark as correct the color turn to green because the letter is at the right position
          letters[ANSWER_LENGTH * currentRow + i].classList.add("correct");
          map[currentParts[i]] -= 1;
        }
      }
      
      for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (currentParts[i] === wordParts[i]) {
          //do nothing, we already marked it as correct
        } else if (wordParts.includes(currentParts[i]) && map[currentParts[i]] > 0) {
          letters[ANSWER_LENGTH * currentRow + i].classList.add("close"); 
          //mark as close the color of the letter turn to yellow
          map[currentParts[i]] -= 1;
        } else { 
          letters[ANSWER_LENGTH * currentRow + i].classList.add("wrong");
        }
      }
      // TODO: did user win or lose? 
     
      currentRow++;
      if (currentGuess === word) {
        // if the word is correct, do nothing
        document.querySelector(".message").innerHTML = "You win!. The next word will be update tomorrow.";
        document.querySelector(".title").classList.add('winner');
        done = true;
        return; // if the word is correct, do nothing
      } else if (currentRow === MAX_GUESSES) {
        document.querySelector(".message").innerHTML = "You lose!";
        done = true;
        return;
      }
      currentGuess = '';
    }
    function backspace() {
    if(currentGuess.length > 0) {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);  // Remove the last letter
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerHTML = '';
    }
  }
  function markInvalidWord() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[ANSWER_LENGTH * currentRow + i].classList.add("invalid");

      setTimeout(() => {
        letters[ANSWER_LENGTH * currentRow + i].classList.remove("invalid");
      },10);
    }
    // i want message show only 2 seconds
    document.querySelector(".message").innerHTML = "Not a valid word. Use backspace to delete and try again."

    // i want the message show only 2 seconds
    setTimeout(() => {
      document.querySelector(".message").innerHTML = "";
    }, 3000);
  }
  

  document.addEventListener('keydown', function handleKeyPress(event) {
    // i dont want user to use alt, tap and control key that will show up in the box. so help me to prevent that
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey|| event.tabKey) {
      return;
    }
    if (done || isLoading) return;  // If the game is done, do nothing

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

  function makeMap (array) {
    // this function count how many letter apear in an array
    const obj = {};
    for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (!obj[letter]) {
      obj[letter] = 1;
    } else {
      obj[letter]++;
    }
  }
  return obj;
}


init();