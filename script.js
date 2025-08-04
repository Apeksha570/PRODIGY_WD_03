const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let cells = Array(9).fill(null);
let isGameOver = false;

// Create cells
function createBoard() {
  board.innerHTML = "";
  cells = Array(9).fill(null);
  isGameOver = false;
  currentPlayer = "X";
  status.textContent = `Player ${currentPlayer}'s Turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] || isGameOver) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} Wins! 🎉`;
    isGameOver = true;
  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a Draw! 😐";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // cols
    [0,4,8], [2,4,6]            // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
  });
}

// Reset game
resetBtn.addEventListener("click", createBoard);

// Initialize
createBoard();
