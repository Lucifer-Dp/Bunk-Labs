import { useState, useEffect } from 'react'

const ChallengeCard = ({ challenge, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    if (selectedOption !== null && !isSubmitted) {
      setIsSubmitted(true)
      const isCorrect = selectedOption === challenge.correctAnswer
      onSubmit(isCorrect, challenge.points)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500'
      case 'Medium':
        return 'bg-yellow-500'
      case 'Hard':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{challenge.title}</h2>
          <div className="flex items-center space-x-3">
            <span className={`${getDifficultyColor(challenge.difficulty)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
              {challenge.difficulty}
            </span>
            <span className="text-gray-600">{challenge.category}</span>
            <span className="text-accent font-semibold">+{challenge.points} pts</span>
          </div>
        </div>
        <div className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-primary'}`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-lg text-gray-700">{challenge.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {challenge.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && setSelectedOption(index)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedOption === index
                ? 'border-primary bg-blue-50'
                : 'border-gray-200 hover:border-primary hover:bg-gray-50'
            } ${isSubmitted ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <span className="font-semibold text-primary mr-2">{String.fromCharCode(65 + index)}.</span>
            {option}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selectedOption === null || isSubmitted}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
          selectedOption === null || isSubmitted
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-blue-600'
        }`}
      >
        {isSubmitted ? 'Submitted ✓' : 'Submit Answer'}
      </button>
    </div>
  )
}

export default ChallengeCard


