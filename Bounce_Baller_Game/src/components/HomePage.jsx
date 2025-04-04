import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Bounce Baller</h1>
        <h2 className="text-2xl text-blue-300 mb-8">A Classic Paddle Ball Adventure</h2>
        
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-xl text-yellow-400 mb-4">How to Play:</h3>
          <ul className="text-gray-200 text-left space-y-2 mb-4">
            <li>• Use the Left/Right arrow keys or A/D to move your paddle</li>
            <li>• Prevent the ball from falling below your paddle</li>
            <li>• Score points by bouncing the ball off your paddle</li>
            <li>• The game speeds up as your score increases</li>
            <li>• You have 3 lives - don't let them run out!</li>
          </ul>
          <p className="text-gray-300 italic">Can you beat your high score?</p>
        </div>
        
        <Link to="/game">
          <button className="bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-4 px-12 rounded-lg transition-colors transform hover:scale-105 duration-200">
            START GAME
          </button>
        </Link>
      </div>
      
      <div className="mt-8 text-gray-300 text-sm">
        <p>© 2025 Bounce Baller - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default HomePage;