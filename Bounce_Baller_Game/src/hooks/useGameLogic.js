import { useState, useEffect, useCallback, useRef } from "react";

const useGameLogic = (canvasRef, setGameOver) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("ballerbounce_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);

  // Game state references
  const gameActiveRef = useRef(false);
  const paddleRef = useRef({
    x: 0,
    width: 100,
    height: 15,
    speed: 8,
    color: "#1d3557",        
  });
  const ballRef = useRef({
    x: 0,
    y: 0,
    radius: 10,
    speedX: 4,
    speedY: -4,
    color: "#e63946",
  });
  const keysRef = useRef({
    left: false,
    right: false,
  });

  // Handle key events for paddle control
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
      keysRef.current.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
      keysRef.current.right = true;
  }, []);

  const handleKeyUp = useCallback((e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
      keysRef.current.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
      keysRef.current.right = false;
  }, []);

  // Main game loop - define before startGame to resolve circular reference
  const gameLoop = useCallback(() => {
    if (!gameActiveRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ball = ballRef.current;
    const paddle = paddleRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    // Draw paddle
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - 30, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();

    // Move paddle based on keys
    if (keysRef.current.left && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }

    if (keysRef.current.right && paddle.x + paddle.width < canvas.width) {
      paddle.x += paddle.speed;
    }

    // Ball movement
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.speedX = -ball.speedX;
    }

    // Ball collision with ceiling
    if (ball.y - ball.radius < 0) {
      ball.speedY = -ball.speedY;
    }

    // Ball collision with paddle
    if (
      ball.y + ball.radius > canvas.height - 30 &&
      ball.y + ball.radius < canvas.height - 15 &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      ball.speedY = -ball.speedY;

      // Adjust ball direction based on where it hit the paddle
      const hitPosition = (ball.x - paddle.x) / paddle.width;
      ball.speedX = 8 * (hitPosition - 0.5);

      // Increase score
      setScore((prevScore) => {
        const newScore = prevScore + 10;

        // Increase level every 100 points
        if (newScore % 100 === 0) {
          setLevel((prevLevel) => {
            // Make ball faster with each level
            ball.speedX *= 1.1;
            ball.speedY *= 1.1;
            return prevLevel + 1;
          });
        }

        // Update high score if needed
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("ballerbounce_highscore", newScore.toString());
        }

        return newScore;
      });
    }

    // Ball falls below paddle
    if (ball.y + ball.radius > canvas.height) {
      setLives((prevLives) => {
        const newLives = prevLives - 1;

        if (newLives <= 0) {
          // Game over
          gameActiveRef.current = false;
          setGameOver(true);
          return 0;
        } else {
          // Reset ball position
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 50;
          ball.speedX = 4 * (Math.random() > 0.5 ? 1 : -1);
          ball.speedY = -4;
          return newLives;
        }
      });
    }

    // Continue the game loop
    if (gameActiveRef.current) {
      requestAnimationFrame(gameLoop);
    }
  }, [canvasRef, highScore, setGameOver]);

  // Initialize game state - now gameLoop is already defined when this runs
  const startGame = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const _CTX = canvas.getContext("2d");

    // Reset game state
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);

    // Initialize paddle position
    paddleRef.current.x = canvas.width / 2 - paddleRef.current.width / 2;

    // Initialize ball position
    ballRef.current.x = canvas.width / 2;
    ballRef.current.y = canvas.height - 50;
    ballRef.current.speedX = 4 * (Math.random() > 0.5 ? 1 : -1);
    ballRef.current.speedY = -4;

    gameActiveRef.current = true;

    // Start game animation loop
    requestAnimationFrame(gameLoop);
  }, [canvasRef, setGameOver, gameLoop]);

  // Set up event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      gameActiveRef.current = false;
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    score,
    highScore,
    lives,
    level,
    startGame,
  };
};

export default useGameLogic;
