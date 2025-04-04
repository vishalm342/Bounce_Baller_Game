import React from "react";

const GameOverModal = ({ score, highScore, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Game Over</h2>
        <p className="mb-2">Your Score: {score}</p>
        <p className="mb-4">High Score: {highScore}</p>
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-bold"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;