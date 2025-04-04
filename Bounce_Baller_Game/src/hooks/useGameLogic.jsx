import React, { useRef, useState, useEffect } from "react";
import useGameLogic from "../hooks/useGameLogic";

const BounceBaller = () => {
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const { score, highScore, lives, level, startGame } = useGameLogic(
    canvasRef,
    setGameOver
  );

  // Auto-start the game when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      startGame();
    }, 500); // Short delay to ensure everything is rendered

    return () => clearTimeout(timer);
  }, [startGame]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">
        Bounce Baller - A Single Paddle Wall Bounce
      </h1>

      {/* Game stats bar */}
      <div className="w-full bg-slate-800 text-white p-4 rounded-md flex justify-between items-center">
        <div className="text-center">
          <div className="uppercase">Score</div>
          <div className="text-2xl font-bold">{score}</div>
        </div>

        <div className="text-center">
          <div className="uppercase">High Score</div>
          <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
        </div>

        <div className="text-center">
          <div className="uppercase">Level</div>
          <div className="text-2xl font-bold text-blue-400">{level}</div>
        </div>

        <div className="text-center">
          <div className="uppercase">Lives</div>
          <div className="flex justify-center">
            {[...Array(lives)].map((_, i) => (
              <div key={i} className="text-2xl text-red-400 mx-1">
                ❤
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game canvas */}
      <div className="w-full h-96 bg-gray-100 border border-gray-300 rounded-md mt-2 relative">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Game over overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-xl text-white mb-6">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Controls info */}
      <div className="mt-4 text-center text-gray-600">
        Controls: Use Left/Right arrow keys or A/D to move the paddle
      </div>

      {/* Start button for manual start */}
      <button
        onClick={startGame}
        className="mt-4 px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none"
      >
        Restart Game
      </button>
    </div>
  );
};

export default BounceBaller;
