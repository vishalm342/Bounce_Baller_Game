import { useEffect, useState, useRef } from "react";
import ScoreBoard from "./ScoreBoard";
import GameOverModal from "./GameOverModal";
import useGameLogic from "../hooks/useGameLogic";

const Game = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const gameInitialized = useRef(false);

  // Destructure what we need from useGameLogic
  const { score, highScore, lives, level, startGame } = useGameLogic(
    canvasRef,
    setGameOver
  );

  const handleRestart = () => {
    setGameOver(false);
    startGame();
  };

  useEffect(() => {
    // Set canvas size to match container
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        // Make canvas fill its container width
        canvas.width = container.clientWidth;
        canvas.height = 500; // Fixed height for game area
      }
    };

    // Update canvas size immediately
    updateCanvasSize();

    // Start the game only once on component mount
    if (!gameInitialized.current) {
      setTimeout(() => {
        updateCanvasSize(); // Ensure canvas is sized before game starts
        startGame();
        gameInitialized.current = true;
      }, 100); // Small delay to ensure canvas is properly sized
    }

    // Add a resize listener to keep canvas properly sized
    window.addEventListener("resize", () => {
      updateCanvasSize();
      // If game is already initialized, restart it to adjust to new canvas size
      if (gameInitialized.current) {
        startGame();
      }
    });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [startGame]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Bounce Baller - A single paddle wall bounce
      </h1>

      <div className="w-full max-w-4xl">
        <ScoreBoard
          score={score}
          highScore={highScore}
          lives={lives}
          level={level}
        />

        <div className="relative w-full bg-white border rounded shadow overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full bg-gray-100"
            style={{ height: "500px" }}
          />

          {gameOver && (
            <GameOverModal
              score={score}
              highScore={highScore}
              onRestart={handleRestart}
            />
          )}
        </div>

        <div className="mt-4 text-center text-gray-600">
          <p>Controls: Use Left/Right arrow keys or A/D to move the paddle</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
