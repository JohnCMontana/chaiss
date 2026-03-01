# ChAiss

**ChAiss ♟️** is a lightweight chess analysis overlay that reads the live board directly from the DOM and delivers real-time engine suggestions.

Instead of screen capture or computer vision, Chaiss injects a content script into supported sites (e.g. Chess.com), parses the board state from the page’s DOM, reconstructs the position, and sends it to Stockfish for instant best-move analysis ⚡

It runs externally from the game logic — no platform modification — just clean DOM parsing and a minimal overlay UI on top of the board.

  - 🚀 Core Features
  - ♟️ Live board state extraction from the DOM
  - 🧠 Automatic FEN reconstruction
  - ⚙️ Real-time Stockfish integration
  - 📊 Lightweight overlay with best move hints
  - 🪶 Fast, minimal, non-intrusive

**ChAiss = pure DOM + engine power.**
