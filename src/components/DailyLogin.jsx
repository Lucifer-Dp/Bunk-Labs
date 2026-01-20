import { useState, useEffect } from 'react'

const DailyLogin = ({ user, onLoginReward }) => {
  // Don't render if no user
  if (!user) {
    return null
  }

  const [hasClaimedToday, setHasClaimedToday] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [streak, setStreak] = useState(user?.loginStreak || 0)
  const [lastLoginDate, setLastLoginDate] = useState(user?.lastLoginDate || null)

  useEffect(() => {
    if (user) {
      setStreak(user.loginStreak || 0)
      setLastLoginDate(user.lastLoginDate || null)
      
      // Check if already claimed today
      const today = new Date().toDateString()
      const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate).toDateString() : null
      
      if (lastLogin === today) {
        setHasClaimedToday(true)
      } else {
        setHasClaimedToday(false)
      }
    }
  }, [user])

  const checkDailyLogin = () => {
    const today = new Date().toDateString()
    const lastLogin = lastLoginDate ? new Date(lastLoginDate).toDateString() : null
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    // If already logged in today
    if (lastLogin === today) {
      setHasClaimedToday(true)
      return
    }

    // Check if streak should continue or reset
    if (lastLogin === yesterday) {
      // Continue streak
      setHasClaimedToday(false)
    } else if (lastLogin === today) {
      setHasClaimedToday(true)
    } else {
      // Streak broken - reset
      if (streak > 0) {
        setStreak(0)
      }
      setHasClaimedToday(false)
    }
  }

  const claimDailyReward = () => {
    const today = new Date().toDateString()
    const lastLogin = lastLoginDate ? new Date(lastLoginDate).toDateString() : null
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    let newStreak = 1
    if (lastLogin === yesterday) {
      newStreak = streak + 1
    }

    // Calculate reward points (increases with streak)
    const baseReward = 50
    const streakBonus = Math.min(newStreak * 10, 200) // Max 200 bonus
    const totalReward = baseReward + streakBonus

    setStreak(newStreak)
    setHasClaimedToday(true)
    setLastLoginDate(new Date().toISOString())
    setShowCelebration(true)

    // Call parent to update points
    if (onLoginReward) {
      onLoginReward(totalReward, newStreak)
    }

    // Hide celebration after 3 seconds
    setTimeout(() => {
      setShowCelebration(false)
    }, 3000)
  }

  const getFunnyMessage = () => {
    if (hasClaimedToday) {
      const messages = [
        "You're back! Your code is waiting... 💻",
        "Daily login claimed! You're on fire! 🔥",
        "Streak maintained! Don't break it now! 😎",
        "You've already claimed today! See you tomorrow! ⏰",
      ]
      return messages[streak % messages.length]
    }

    if (streak === 0) {
      return "New streak starts now! Let's go! 🚀"
    }

    if (streak < 3) {
      return "Keep it up! Your streak is growing! 🌱"
    }

    if (streak < 7) {
      return "Impressive streak! You're getting good at this! 💪"
    }

    if (streak < 14) {
      return `Wow! ${streak} days! You're unstoppable! 🔥`
    }

    if (streak < 30) {
      return "Legendary streak! Are you even human? 🤖"
    }

    return `Absolute unit! ${streak} days! 👑`
  }

  const getStreakEmoji = () => {
    if (streak === 0) return "🌱"
    if (streak < 3) return "🔥"
    if (streak < 7) return "⚡"
    if (streak < 14) return "💎"
    if (streak < 30) return "👑"
    return "🏆"
  }

  const calculateReward = () => {
    if (hasClaimedToday) return 0
    const baseReward = 50
    const tomorrowStreak = lastLoginDate === new Date(Date.now() - 86400000).toDateString() ? streak + 1 : 1
    return baseReward + Math.min(tomorrowStreak * 10, 200)
  }

  return (
    <div className="bg-gradient-to-br from-primary to-blue-600 rounded-lg shadow-lg p-6 text-white relative overflow-hidden">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 animate-pulse">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <div className="text-3xl font-bold mb-2">Daily Reward Claimed!</div>
            <div className="text-2xl">+{calculateReward()} points!</div>
            <div className="text-lg mt-2">🔥 {streak} day streak!</div>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">
        {getStreakEmoji()}
      </div>

      <div className="relative z-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">Daily Login Reward</h3>
            <p className="text-blue-100 text-sm">{getFunnyMessage()}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl mb-1">{getStreakEmoji()}</div>
            <div className="text-sm text-blue-100">Streak</div>
          </div>
        </div>

        {/* Streak Display */}
        <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Current Streak</span>
            <span className="text-3xl font-bold">{streak} days</span>
          </div>
          <div className="mt-2 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-blue-100 mt-1">
            {streak < 7 ? `${7 - streak} more days to 🔥 week streak!` : 
             streak < 30 ? `${30 - streak} more days to 👑 legend status!` :
             "You're a legend! Keep going!"}
          </p>
        </div>

        {/* Reward Preview */}
        {!hasClaimedToday && (
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Today's Reward</p>
                <p className="text-2xl font-bold text-accent">
                  +{calculateReward()} points
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            {streak > 0 && (
              <p className="text-xs text-blue-100 mt-2">
                +50 base + {Math.min((streak + 1) * 10, 200)} streak bonus = {calculateReward()} total
              </p>
            )}
          </div>
        )}

        {/* Claim Button */}
        {hasClaimedToday ? (
          <div className="bg-white bg-opacity-30 rounded-lg p-4 text-center backdrop-blur-sm">
            <div className="text-2xl mb-2">✅</div>
            <p className="font-semibold">Already Claimed Today!</p>
            <p className="text-sm text-blue-100 mt-1">
              Come back tomorrow to continue your streak! ⏰
            </p>
          </div>
        ) : (
          <button
            onClick={claimDailyReward}
            className="w-full bg-accent text-gray-800 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg active:scale-95"
          >
            🎁 Claim Daily Reward
          </button>
        )}

        {/* Funny Tips */}
        <div className="mt-4 text-xs text-blue-100 text-center italic">
          {streak > 0 && streak < 3 && "💡 Tip: Log in daily to build an epic streak!"}
          {streak >= 3 && streak < 7 && "💡 You're doing great! Keep the momentum!"}
          {streak >= 7 && streak < 14 && "💡 Weekly streak achieved! You're on fire! 🔥"}
          {streak >= 14 && streak < 30 && "💡 Two weeks! You're becoming a legend!"}
          {streak >= 30 && "💡 You're a streak master! Don't let it break now! 👑"}
        </div>
      </div>
    </div>
  )
}

export default DailyLogin

