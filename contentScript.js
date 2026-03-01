/**
console.log("Chess content script injected");

function logBoard() {
    const squares = document.querySelectorAll('.board .square');
    const boardState = [];

    squares.forEach(sq => {
        const pieceEl = sq.querySelector('.piece');
        if (pieceEl) {
            const match = pieceEl.className.match(/(w|b)(K|Q|R|B|N|P)/);
            if (match) {
                boardState.push({
                    square: sq.getAttribute('data-square'),
                    type: match[0] // e.g., wP, bQ
                });
            }
        }
    });

    console.log("Board pieces:", boardState); // always log
}

function observeBoard() {
    const board = document.querySelector('.board');
    if (!board) return setTimeout(observeBoard, 500);

    console.log("Chess board detected");
    logBoard();

    const observer = new MutationObserver(logBoard);
    observer.observe(board, { childList: true, subtree: true });
    console.log("MutationObserver attached to board");
}

window.addEventListener('load', observeBoard);

function getLoggedInUsername() {
    const el = document.querySelector('a[href^="https://www.chess.com/member/"]');
    if (!el) return null;
    return el.innerText.trim(); // returns username
}

console.log('Logged-in user:', getLoggedInUsername());

async function getCurrentPieces(username) {
    const url = `https://api.chess.com/pub/player/${username}/games/current`;
    try {
        const res = await fetch(url);
        if (!res.ok) return []; // no live game
        const data = await res.json();
        const fen = data.fen || data.games?.[0]?.fen; // sometimes inside games array

        if (!fen) return [];

        // Parse FEN into flat array of pieces
        const pieces = [];
        const rows = fen.split(' ')[0].split('/');
        rows.forEach(row => {
            for (const char of row) {
                if (/\d/.test(char)) {
                    for (let i = 0; i < Number(char); i++) pieces.push(null);
                } else {
                    pieces.push(char);
                }
            }
        });
        return pieces;
    } catch (e) {
        return [];
    }
}

// Usage
getCurrentPieces(getLoggedInUsername()).then(pieces => {
    console.log('Pieces array:', pieces);
});
*/

console.log("Chess content script injected");

function logBoard() {
    const pieces = document.querySelectorAll('.piece');
    const boardState = [];

    pieces.forEach(p => {
        const match = p.className.match(/\b(w|b)([kqrbnp])\b/i);
        const square = p.closest('.square')?.getAttribute('data-square');

        if (match && square) {
            boardState.push({
                square,
                piece: match[1] + match[2].toUpperCase()
            });
        }
    });

    console.log("Board pieces:", boardState);
}

function observeBoard() {
    const board = document.querySelector('.board');
    if (!board) return setTimeout(observeBoard, 500);

    console.log("Chess board detected");

    const wait = setInterval(() => {
        if (document.querySelector('.piece')) { // <-- fixed here
            clearInterval(wait);
            logBoard();
        }
    }, 300);

    const observer = new MutationObserver(logBoard);
    observer.observe(board, { childList: true, subtree: true });
    console.log("MutationObserver attached");
}

window.addEventListener('load', observeBoard);