import { useState } from 'react'
import { badges } from '../data/dummyData'

const BadgeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextBadge = () => {
    setCurrentIndex((prev) => (prev + 1) % badges.length)
  }

  const prevBadge = () => {
    setCurrentIndex((prev) => (prev - 1 + badges.length) % badges.length)
  }

  const currentBadge = badges[currentIndex]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Badges</h3>
      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevBadge}
            className="text-gray-600 hover:text-primary transition-colors p-2"
            aria-label="Previous badge"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1 text-center">
            <div className={`text-6xl mb-4 ${currentBadge.earned ? '' : 'opacity-30 grayscale'}`}>
              {currentBadge.icon}
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-800">{currentBadge.name}</h4>
            <p className="text-gray-600 mb-2">{currentBadge.description}</p>
            {currentBadge.earned ? (
              <span className="inline-block bg-accent text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Earned
              </span>
            ) : (
              <span className="inline-block bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                Locked
              </span>
            )}
          </div>

          <button
            onClick={nextBadge}
            className="text-gray-600 hover:text-primary transition-colors p-2"
            aria-label="Next badge"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Badge Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {badges.map((badge, index) => (
            <button
              key={badge.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to badge ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BadgeCarousel


