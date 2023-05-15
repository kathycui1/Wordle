import React, { useState } from 'react';
import './App.css';

// List of potential words to be guessed
const wordList = [
  'APPLE', 'BASIC', 'CLOUD', 'DOUGH', 'EMAIL', 'FLAME', 'GRAPE', 'SCHOOL', 'INVENT', 'JOLLY',
  'KITTY', 'FIRE', 'MANGO', 'NOBLE', 'OLIVE', 'PIANO', 'QUIET', 'RADIO', 'SUNNY', 'TIGER',
  'UNITY', 'VIVID', 'WHALE', 'YACHT', 'ZEBRA', 'BADGE', 'CABIN', 'DANCE', 'EAGER', 'FANCY', 
  'GIANT', 'HAZEL', 'IMAGE', 'JOKER', 'KARMA', 'LUCKY', 'MAGIC', 'OASIS', 'PROUD', 'QUILT', 
  'STAR', 'SALSA', 'TULIP', 'URBAN', 'VENUS', 'CAREER', 'YOUTH', 'ALARM', 'BISON', 'CRAVE', 
  'DAISY', 'EVOKE', 'GLOBE', 'IDEAL', 'KIOSK', 'LEASH', 'MEDAL', 'NOVEL', 'OPERA', 'POUCH', 
  'QUICK', 'RIVAL', 'SAVOR', 'TANGO', 'USAGE', 'WEDGE', 'YIELD', 'HELP', 'BLISS', 'CHARM', 
  'DODGE', 'ELBOW', 'FROST', 'GRIND', 'MOVE', 'ISSUE', 'JOUST', 'KNEEL', 'MAJOR', 'OZONE', 
  'SPIRIT', 'QUEST', 'SLASH', 'TWIST', 'ULTRA', 'VALID', 'GARDEN', 'YOUNG', 'ADAPT', 'BLAZE', 
  'CHAOS', 'DITCH', 'STICKY', 'FROWN', 'GLORY', 'HARP', 'JOKER', 'KNACK', 'LEARN', 'NUDGE', 
  'ORBIT', 'ROUTER', 'ISLAND', 'TRUST', 'VALUE', 'FIELD', 'PHONE', 'INJECT', 'NOTEBOOK', 'ERASER'
];

// Random word to be guessed from wordList
const WORD = wordList[Math.floor(Math.random() * wordList.length)];

// Maximum number of attempts
const MAX_ATTEMPTS = 5;

type Guess = string;

const App: React.FC = () => {
  const [guess, setGuess] = useState<Guess>(''); // The current guess
  const [attempts, setAttempts] = useState<number>(0); // Number of attempts
  const [isWin, setIsWin] = useState<boolean>(false); // Flag to track win state
  const [history, setHistory] = useState<Guess[]>([]); // Guess history

  // Event handler for input change to update the guess state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert guess input to uppercase
    setGuess(event.target.value.toUpperCase());
  };

  // Event handler when user submits a guess
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the guess matches the word
    const isMatch = guess === WORD;
    setIsWin(isMatch);

    // Increment the number of attempts
    setAttempts((prevAttempts) => prevAttempts + 1);

    // Add the guess to the history
    setHistory((prevHistory) => [...prevHistory, guess]);

    // Clear the guess input field
    setGuess('');
  };

  // Determine the correctness of a guessed letter
  const getLetterColor = (letter: string, index: number) => {
    if (WORD[index] === letter) {
      return 'correct';
    } else if (WORD.includes(letter)) {
      return 'wrong';
    }
    return '';
  };

  // Render the legend component for letter colours
  const renderKeyLegend = () => {
    return (
      <div className="key-legend">
        <h2>Legend</h2>
        <div className="legend-item">
          <div className="underline correct"></div>
          <span>Correct Letter, Correct Position</span>
        </div>
        <div className="legend-item">
          <div className="underline wrong"></div>
          <span>Correct Letter, Wrong Position</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Wordle!</h1>
      <p>Guess the word in {MAX_ATTEMPTS} attempts!</p>
      {renderKeyLegend()}

      <div className="history">
        {history.map((guess, index) => (
          <div key={index} className="guess">
            {guess.split('').map((letter, index) => (
              <div
                key={index}
                className={`letter ${getLetterColor(letter, index)}`}
              >
                {isWin || guess[index]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="word">
        {WORD.split('').map((letter, index) => (
          <div key={index} className="letter">
            {isWin || guess[index]}
          </div>
              ))}
      </div>
      <div className="grid-container">
        <div className="grid">
          {WORD.split('').map((letter, index) => (
            <div key={index} className="grid-cell">
              {isWin || guess[index]}
            </div>
          ))}
        </div>
      </div>

      {!isWin && attempts < MAX_ATTEMPTS && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            maxLength={WORD.length}
          />
          <button type="submit">Guess</button>
        </form>
      )}

      {attempts > 0 && (
        <div className="attempts">
          <p>
            Attempts: {attempts} / {MAX_ATTEMPTS}
          </p>
        </div>
      )}

      {isWin && (
        <div className="win-message">
          <p>Congratulations! You won!</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}

      {!isWin && attempts === MAX_ATTEMPTS && (
        <div className="lose-message">
          <p>Sorry, you lost!</p>
          <p>The word was "{WORD}"</p>
          <button onClick={() => window.location.reload()}>
            Try Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
