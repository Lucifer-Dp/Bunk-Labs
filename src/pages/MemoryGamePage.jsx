import { useNavigate } from 'react-router-dom'
import MemoryGame from '../components/MemoryGame'

const MemoryGamePage = ({ currentUser, onUserUpdate }) => {
  const navigate = useNavigate()

  const handleGameComplete = (points, level, moves) => {
    if (!currentUser) return
    
    // Update user points
    const updatedUser = {
      ...currentUser,
      points: (currentUser.points || 0) + points,
    }
    
    if (onUserUpdate) {
      onUserUpdate(updatedUser)
    }

    // Save game stats
    const gameStats = {
      userId: currentUser.id,
      date: new Date().toISOString(),
      pointsEarned: points,
      levelReached: level,
      totalMoves: moves,
    }
    
    const existingStats = JSON.parse(localStorage.getItem('memory_game_stats') || '[]')
    existingStats.push(gameStats)
    localStorage.setItem('memory_game_stats', JSON.stringify(existingStats))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-4 text-primary hover:text-blue-600 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <MemoryGame user={currentUser} onGameComplete={handleGameComplete} />
        </div>
      </main>
    </div>
  )
}

export default MemoryGamePage

