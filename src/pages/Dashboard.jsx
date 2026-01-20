import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardCard from '../components/DashboardCard'
import BadgeCarousel from '../components/BadgeCarousel'
import DailyLogin from '../components/DailyLogin'

const Dashboard = ({ currentUser, onUserUpdate }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(currentUser)

  useEffect(() => {
    setUser(currentUser)
  }, [currentUser])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  // Don't render anything if not logged in
  if (!currentUser) {
    return null
  }

  const handleLoginReward = (points, newStreak) => {
    const updatedUser = {
      ...user,
      points: user.points + points,
      loginStreak: newStreak,
      lastLoginDate: new Date().toISOString(),
    }
    setUser(updatedUser)
    if (onUserUpdate) {
      onUserUpdate(updatedUser)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600">Continue your engineering journey</p>
      </div>

      {/* Daily Login Component */}
      <div className="mb-8">
        <DailyLogin user={user} onLoginReward={handleLoginReward} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Points"
          value={user.points.toLocaleString()}
          icon="⭐"
          bgColor="bg-accent"
        />
        <DashboardCard
          title="Current Rank"
          value={`#${user.rank}`}
          icon="🏆"
          bgColor="bg-primary"
        />
        <DashboardCard
          title="Level"
          value={user.level}
          icon="📈"
          bgColor="bg-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/challenge"
              className="block w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors text-center font-semibold"
            >
              Start a Challenge 🎯
            </Link>
            <Link
              to="/memory-game"
              className="block w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors text-center font-semibold"
            >
              Play Memory Game 🧠
            </Link>
            <Link
              to="/leaderboard"
              className="block w-full bg-accent text-gray-800 py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors text-center font-semibold"
            >
              View Leaderboard 📊
            </Link>
          </div>
        </div>

        {/* Badges */}
        <BadgeCarousel />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-gray-800">Completed: Array Manipulation</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            <span className="text-accent font-semibold">+100 pts</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-semibold text-gray-800">Badge Earned: Problem Solver</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
            <span className="text-accent font-semibold">Badge</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📈</span>
              <div>
                <p className="font-semibold text-gray-800">Rank Improved: #20 → #15</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
            <span className="text-green-500 font-semibold">+5</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


