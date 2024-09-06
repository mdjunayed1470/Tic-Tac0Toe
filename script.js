document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restart');
    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        return winningCombinations.some(combination => 
            combination.every(index => board[index] === currentPlayer)
        );
    };

    const isDraw = () => board.every(cell => cell !== '');

    const updateMessage = (msg) => {
        message.textContent = msg;
    };

    const handleCellClick = (e) => {
        const index = e.target.getAttribute('data-index');

        if (board[index] !== '' || !isGameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add('show');

        if (checkWinner()) {
            updateMessage(`${currentPlayer} Wins!`);
            isGameActive = false;
        } else if (isDraw()) {
            updateMessage('It\'s a Draw!');
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateMessage(`It's ${currentPlayer}'s turn.`);
        }
    };

    const restartGame = () => {
        board.fill('');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('show');
        });
        isGameActive = true;
        currentPlayer = 'X';
        updateMessage(`It's ${currentPlayer}'s turn.`);
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
});
