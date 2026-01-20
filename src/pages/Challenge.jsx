import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { challenges as dummyChallenges } from '../data/dummyData'
import ChallengeCard from '../components/ChallengeCard'

const Challenge = () => {
  const [allChallenges, setAllChallenges] = useState([])
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load from localStorage
    const localChallenges = JSON.parse(localStorage.getItem('bunklab_challenges') || '[]')
    
    // Combine with dummy data
    // Create a Map to remove duplicates by ID if any
    const challengeMap = new Map()
    
    // Add dummy challenges first
    dummyChallenges.forEach(c => challengeMap.set(c.id, c))
    
    // Add local challenges (overwriting if same ID, though IDs should be unique)
    localChallenges.forEach(c => challengeMap.set(c.id, c))
    
    const combined = Array.from(challengeMap.values())
    
    // Sort by date (ascending: oldest to newest)
    combined.sort((a, b) => new Date(a.challengeDate) - new Date(b.challengeDate))
    
    setAllChallenges(combined)
    
    // Find today's challenge
    const today = new Date().toISOString().split('T')[0]
    const todayIndex = combined.findIndex(c => c.challengeDate === today)
    
    if (todayIndex !== -1) {
      setCurrentChallengeIndex(todayIndex)
    }
  }, [])

  const currentChallenge = allChallenges[currentChallengeIndex]

  const handleSubmit = (isCorrect, points) => {
    setResult({
      isCorrect,
      points: isCorrect ? points : 0,
      message: isCorrect
        ? `🎉 Correct! You earned ${points} points!`
        : `❌ Incorrect. The correct answer was: ${currentChallenge.options[currentChallenge.correctAnswer]}`,
    })
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentChallengeIndex < allChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
      setShowResult(false)
      setResult(null)
    } else {
      navigate('/dashboard')
    }
  }

  const handleBack = () => {
    navigate('/dashboard')
  }

  if (!currentChallenge) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Loading Challenges...</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="text-primary hover:text-blue-600 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-800">Challenges</h1>
            <span className="text-gray-600">
              Challenge {currentChallengeIndex + 1} of {allChallenges.length}
            </span>
          </div>
        </div>

        {/* Challenge Card */}
        {!showResult ? (
          <ChallengeCard challenge={currentChallenge} onSubmit={handleSubmit} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">{result.isCorrect ? '🎉' : '😔'}</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {result.isCorrect ? 'Great Job!' : 'Keep Trying!'}
            </h2>
            <p className="text-xl mb-6 text-gray-700">{result.message}</p>
            {result.isCorrect && (
              <div className="bg-accent bg-opacity-20 rounded-lg p-4 mb-6">
                <p className="text-2xl font-bold text-gray-800">
                  +{result.points} Points Earned!
                </p>
              </div>
            )}
            <div className="flex gap-4 justify-center">
              {currentChallengeIndex < allChallenges.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Next Challenge →
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Back to Dashboard
                </button>
              )}
            </div>
          </div>
        )}

        {/* Challenge List */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Challenges</h3>
          <div className="space-y-3">
            {allChallenges.map((challenge, index) => {
               const isToday = challenge.challengeDate === new Date().toISOString().split('T')[0];
               return (
              <div
                key={challenge.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  index === currentChallengeIndex
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-200 hover:border-primary'
                } ${isToday ? 'ring-2 ring-accent ring-offset-2' : ''}`}
                onClick={() => {
                  if (!showResult) {
                    setCurrentChallengeIndex(index)
                    setResult(null) // Reset result when switching
                    setShowResult(false)
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                        {isToday && <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">Today</span>}
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {challenge.challengeDate}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">{challenge.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-accent font-semibold">+{challenge.points} pts</span>
                    <p className="text-sm text-gray-600">{challenge.difficulty}</p>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challenge
