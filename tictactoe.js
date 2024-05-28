document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    let player1 = prompt("Player 1: What is your Character's initials?")
    let player2 = prompt("Player 2: What is your character's initials?");
    let currentPlayer = player1;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                return gameBoard[a];
            }
        }
        if (gameBoard.includes('') === false) {
            gameActive = false;
            return 'Tie';
        }
        return null;
    };
    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) return;

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            if (winner === 'Tie') {
                statusDisplay.textContent = 'It\'s a Tie!';
            } else {
                statusDisplay.textContent = `Player ${winner} Wins!`;
            }
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    };

    const restartGame = () => {
        currentPlayer = player1;
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    // Initialize status display
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
});
