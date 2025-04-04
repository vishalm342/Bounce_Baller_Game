import React from "react";

const ScoreBoard = ({ score, highScore, lives, level }) => {
  return (
    <div className="w-full max-w-4xl mb-2 bg-[#1d3557] text-white rounded overflow-hidden">
      <div className="flex flex-row">
        <div className="flex-1 text-center p-4">
          <div className="text-sm mb-1">SCORE</div>
          <div className="text-2xl font-bold">{score}</div>
        </div>
        <div className="flex-1 text-center p-4">
          <div className="text-sm mb-1">HIGH SCORE</div>
          <div className="text-2xl font-bold text-[#ffd700]">{highScore}</div>
        </div>
        <div className="flex-1 text-center p-4">
          <div className="text-sm mb-1">LEVEL</div>
          <div className="text-2xl font-bold text-[#4dabf7]">{level}</div>
        </div>
        <div className="flex-1 text-center p-4">
          <div className="text-sm mb-1">LIVES</div>
          <div className="flex justify-center gap-1">
            {Array.from({ length: lives }).map((_, index) => (
              <Heart key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Heart = () => (
  <div className="relative w-6 h-6">
    <div 
      className="absolute w-5 h-5 bg-[#ff6b6b] rotate-45"
      style={{
        top: '0px',
        left: '0px',
      }}
    >
      <div 
        className="absolute w-5 h-5 bg-[#ff6b6b] rounded-full"
        style={{
          top: '-50%',
          left: '0',
        }}
      />
      <div 
        className="absolute w-5 h-5 bg-[#ff6b6b] rounded-full"
        style={{
          top: '0',
          left: '-50%',
        }}
      />
    </div>
  </div>
);

export default ScoreBoard;