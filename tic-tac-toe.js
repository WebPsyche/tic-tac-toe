// initialize the game
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const winingCombo = [
  // horizontal winning combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical winning combinations
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal winning combinations
  [0, 4, 8],
  [2, 4, 6]
];
let gameEnded = false;

let countX = 0;
let countO = 0;

let playerX = document.getElementById('playerX-score')
let playerO = document.getElementById('playerO-score')

playerX.textContent = countX;
playerO.textContent = countO;

const allSquares = document.querySelectorAll(".square")
//sound fx
let buttonSound = new Audio("Slack-Boing.mp3")
let fanfare = new Audio("Slack-Wow.mp3")
let draw = new Audio("Slack-Hi.mp3")
// function to handle a square being clicked
function handleSquareClick(event) {
  const square = event.target;
  const index = square.getAttribute("id");
//sound effects
  buttonSound.play();


  // check if the square has already been played
  if (board[index] === "" && !gameEnded) {
    // update the board array with the current player's symbol
    board[index] = currentPlayer;

    // update the square's text with the current player's symbol
    square.textContent = currentPlayer;
   
    // check if the current player has won
    if (checkWin()) {
    //function to switch on announcement
     switchOnAnnouncment(`${currentPlayer} wins!`);
     //play siund for victory fanfare
     fanfare.play();
     //updateScoreBoard
     updateScoreBoard()
      gameEnded = true;
      //reset the game
      setTimeout(()=>{restartGame()},1500)
    } else if (checkDraw()) {
      switchOnAnnouncment( "It's a draw!")
      //play sound for draw
      draw.play();
      gameEnded = true;
      setTimeout(()=>{restartGame()},1500)
    } else {
      // switch to the other player's turn
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// function to check if the current player has won
function checkWin() {
  for (let i = 0; i < winingCombo.length; i++) {
    const [a, b, c] = winingCombo[i];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        console.log(allSquares[a,b,c].textContent)
      wincombobgs(allSquares, [a, b, c])
      setTimeout(() => {
        allSquares[a].classList.remove('fade-bg');
        allSquares[b].classList.remove('fade-bg');
        allSquares[c].classList.remove('fade-bg');
      }, 1500);
      return true;
    }
  }
  return false;
}

// function to check if all squares have been played and there is no winner
function checkDraw() {
  return !board.includes("");
}

// switch on announcement
function switchOnAnnouncment(text){
    let announcement  = document.querySelector('.announcement')
    //announcement.style.display = "block"
    announcement.classList.add("fade-in")
    setTimeout(()=>{
        announcement.classList.remove("fade-in");
    },1500)
    announcement.innerHTML = text
}
function restartGame(){
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    board = ["", "", "", "", "", "", "", "", ""];
    for (i = 0; i < allSquares.length; i++){
        allSquares[i].innerHTML = '';
    }
    gameEnded = false;
};
//function to update score board
function updateScoreBoard(){
    if(currentPlayer === "X"){
        countX++;
        playerX.textContent = countX;
    }else if(currentPlayer === "O"){
        countO++;
        playerO.textContent = countO;
    };
}
//function to add win-combo-bg
function wincombobgs(object, comboIndex){
    for(i = 0; i < comboIndex.length; i++){
        object[comboIndex[i]].classList.add('fade-bg');
    }
    setTimeout(() => {
        
    }, 1000);
}

  