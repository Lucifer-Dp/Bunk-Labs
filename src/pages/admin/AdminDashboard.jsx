import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'

const AdminDashboard = () => {
  const [challenges, setChallenges] = useState([])

  // Load challenges from localStorage (mock data storage)
  useEffect(() => {
    const savedChallenges = localStorage.getItem('bunklab_challenges')
    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges))
    }
  }, [])

  const totalChallenges = challenges.length
  const activeChallenges = challenges.filter((c) => c.active).length
  const memeChallenges = challenges.filter((c) => c.type === 'Meme Challenge').length
  
  // Load game stats
  const [gameStats, setGameStats] = useState([])
  const [gameSettings, setGameSettings] = useState(null)
  
  useEffect(() => {
    const stats = localStorage.getItem('memory_game_stats')
    if (stats) {
      setGameStats(JSON.parse(stats))
    }
    const settings = localStorage.getItem('memory_game_settings')
    if (settings) {
      setGameSettings(JSON.parse(settings))
    }
  }, [])
  
  const totalGamePlays = gameStats.length
  const gameEnabled = gameSettings?.enabled || false

  const StatCard = ({ title, value, icon, bgColor }) => {
    return (
      <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-opacity-80 text-sm mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="text-4xl opacity-80">{icon}</div>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">BunkLab Admin Panel</h1>
          <p className="text-gray-600">Manage challenges and platform content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Challenges"
            value={totalChallenges}
            icon="📚"
            bgColor="bg-primary"
          />
          <StatCard
            title="Active Challenges"
            value={activeChallenges}
            icon="✅"
            bgColor="bg-green-500"
          />
          <StatCard
            title="Meme Challenges"
            value={memeChallenges}
            icon="😂"
            bgColor="bg-purple-500"
          />
          <StatCard
            title="Game Plays"
            value={totalGamePlays}
            icon="🎮"
            bgColor={gameEnabled ? "bg-pink-500" : "bg-gray-500"}
          />
        </div>
        
        {/* Game Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">Memory Game Status</h2>
              <p className="text-gray-600">
                {gameEnabled ? '✅ Game is enabled and active' : '❌ Game is disabled'}
              </p>
            </div>
            <Link
              to="/admin/manage-game"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold shadow-md"
            >
              🎮 Manage Game
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <Link
            to="/admin/add-challenge"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
          >
            <span>➕</span>
            <span>Add New Challenge</span>
          </Link>
        </div>

        {/* Recent Challenges Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Challenges</h2>
          {challenges.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-lg">No challenges yet</p>
              <p className="text-sm">Create your first challenge to get started!</p>
              <Link
                to="/admin/add-challenge"
                className="inline-block mt-4 text-primary hover:text-blue-600 font-semibold"
              >
                Add Challenge →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {challenges.slice(0, 5).map((challenge, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">
                      {challenge.type === 'Meme Challenge' ? '😂' :
                       challenge.type === 'Fun Challenge' ? '🎉' : '📚'}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">{challenge.title}</p>
                      <p className="text-sm text-gray-600">
                        {challenge.type} • {challenge.points} points
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        challenge.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {challenge.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
              {challenges.length > 5 && (
                <Link
                  to="/admin/manage-challenges"
                  className="block text-center text-primary hover:text-blue-600 font-semibold mt-4"
                >
                  View All Challenges →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard

