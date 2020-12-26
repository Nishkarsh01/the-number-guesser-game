/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if he looses
- Let player choose to play again
*/

//Game values
let min = 0,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please Enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if (guess === winningNum) {
    //game over won

    gameOver(true, `${winningNum} is correct, You Win!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;

    if (guessesLeft === 0 || guessesLeft < 1) {
      //Game Over Lost

      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      guessInput.style.borderColor = 'red';

      //game continues- answer wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

      guessInput.value = '';
    }
  }
});

//game over
function gameOver(won, msg) {
  let color;

  won ? (color = 'green') : (color = 'red');

  //disable input
  guessInput.disabled = true;

  //border green
  guessInput.style.borderColor = color;

  //set message

  setMessage(msg, color);

  //Play Again?
  guessBtn.value = 'Play Again';

  guessBtn.className += 'play-again';
}

//Get Winning Number

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
