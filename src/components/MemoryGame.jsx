import { useState, useEffect } from 'react'

const MemoryGame = ({ user, onGameComplete }) => {
  const [level, setLevel] = useState(1)
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showWin, setShowWin] = useState(false)
  const [gameSettings, setGameSettings] = useState(null)

  const emojis = ['🎯', '🧩', '⚡', '🏆', '⭐', '💎', '👑', '🎉', '🚀', '🔥', '💻', '🎮', '🎨', '🎪', '🎭', '🎬']

  useEffect(() => {
    loadGameSettings()
  }, [])

  useEffect(() => {
    if (gameSettings && gameSettings.enabled) {
      initializeGame()
    }
  }, [level, gameSettings])

  const loadGameSettings = () => {
    const settings = localStorage.getItem('memory_game_settings')
    if (settings) {
      setGameSettings(JSON.parse(settings))
    } else {
      // Default settings
      const defaultSettings = {
        enabled: true,
        basePoints: 10,
        pointsPerLevel: 5,
        maxLevel: 10,
        timeLimit: 0, // 0 means no time limit
        cardPairs: 4,
        cardsIncreasePerLevel: 1,
      }
      setGameSettings(defaultSettings)
      localStorage.setItem('memory_game_settings', JSON.stringify(defaultSettings))
    }
  }

  const initializeGame = () => {
    if (!gameSettings) return
    
    const pairs = Math.min(gameSettings.cardPairs + (level - 1) * gameSettings.cardsIncreasePerLevel, 12)
    const cardEmojis = emojis.slice(0, pairs)
    const gameCards = [...cardEmojis, ...cardEmojis]
    
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffled.map((emoji, index) => ({ id: index, emoji, flipped: false })))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameOver(false)
    setShowWin(false)
  }

  const handleCardClick = (index) => {
    if (gameOver || flipped.length === 2 || matched.includes(index) || flipped.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)
    setMoves(moves + 1)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setMatched([...matched, first, second])
          setFlipped([])
          
          // Check if level complete
          const newMatched = [...matched, first, second]
          if (newMatched.length === cards.length) {
            handleLevelComplete()
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const handleLevelComplete = () => {
    if (!gameSettings) return
    
    const levelPoints = gameSettings.basePoints + (level * gameSettings.pointsPerLevel)
    const bonusPoints = Math.max(0, 100 - moves) // Bonus for fewer moves
    const totalPoints = levelPoints + bonusPoints
    
    setScore(score + totalPoints)
    
    if (level >= (gameSettings.maxLevel || 10)) {
      // Game completed
      setGameOver(true)
      setShowWin(true)
      
      if (onGameComplete) {
        onGameComplete(score + totalPoints, level, moves)
      }
    } else {
      // Next level
      setTimeout(() => {
        setLevel(level + 1)
        setScore(score + totalPoints)
      }, 1500)
    }
  }

  const restartGame = () => {
    setLevel(1)
    setScore(0)
    setMoves(0)
    setGameOver(false)
    setShowWin(false)
    initializeGame()
  }

  if (!gameSettings || !gameSettings.enabled) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">Game is currently disabled by admin</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">🧠 Memory Card Game</h2>
          <p className="text-sm text-gray-600">Match all pairs to advance to the next level!</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Level</div>
          <div className="text-3xl font-bold text-primary">{level}/{gameSettings.maxLevel}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600">Score</div>
          <div className="text-2xl font-bold text-primary">{score}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600">Moves</div>
          <div className="text-2xl font-bold text-gray-800">{moves}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600">Matched</div>
          <div className="text-2xl font-bold text-green-600">{matched.length / 2}/{cards.length / 2}</div>
        </div>
      </div>

      {/* Game Board */}
      <div className={`grid gap-3 mb-6 ${cards.length === 8 ? 'grid-cols-4' : cards.length === 12 ? 'grid-cols-4' : cards.length === 16 ? 'grid-cols-4' : 'grid-cols-6'}`}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index)
          return (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              disabled={gameOver || isFlipped}
              className={`aspect-square text-4xl font-bold rounded-lg transition-all duration-300 transform ${
                isFlipped
                  ? 'bg-primary text-white'
                  : 'bg-gradient-to-br from-primary to-blue-600 text-white hover:scale-105'
              } ${gameOver ? 'opacity-50' : 'cursor-pointer hover:shadow-lg'}`}
            >
              {isFlipped ? card.emoji : '?'}
            </button>
          )
        })}
      </div>

      {/* Win Modal */}
      {showWin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Game Completed!</h3>
            <p className="text-xl text-gray-600 mb-4">You earned {score} points!</p>
            <div className="space-y-2 mb-6">
              <p className="text-gray-700">Levels Completed: {level}</p>
              <p className="text-gray-700">Total Moves: {moves}</p>
            </div>
            <button
              onClick={restartGame}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={restartGame}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          🔄 Restart
        </button>
      </div>
    </div>
  )
}

export default MemoryGame

