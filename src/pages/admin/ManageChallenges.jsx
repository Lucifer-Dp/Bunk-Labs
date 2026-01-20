import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'

const ManageChallenges = () => {
  const [challenges, setChallenges] = useState([])
  const [filter, setFilter] = useState('all') // all, active, inactive

  useEffect(() => {
    loadChallenges()
  }, [])

  const loadChallenges = () => {
    const savedChallenges = localStorage.getItem('bunklab_challenges')
    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges))
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      const updatedChallenges = challenges.filter((c) => c.id !== id)
      localStorage.setItem('bunklab_challenges', JSON.stringify(updatedChallenges))
      setChallenges(updatedChallenges)
    }
  }

  const handleToggleActive = (id) => {
    const updatedChallenges = challenges.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    )
    localStorage.setItem('bunklab_challenges', JSON.stringify(updatedChallenges))
    setChallenges(updatedChallenges)
  }

  const filteredChallenges = challenges.filter((challenge) => {
    if (filter === 'active') return challenge.active
    if (filter === 'inactive') return !challenge.active
    return true
  })

  const getTypeIcon = (type) => {
    if (type === 'Meme Challenge') return '😂'
    if (type === 'Fun Challenge') return '🎉'
    return '📚'
  }

  const getTypeColor = (type) => {
    if (type === 'Meme Challenge') return 'bg-purple-100 text-purple-700'
    if (type === 'Fun Challenge') return 'bg-pink-100 text-pink-700'
    return 'bg-blue-100 text-blue-700'
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Challenges</h1>
          <p className="text-gray-600">Edit, delete, and manage all challenges</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({challenges.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'active'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({challenges.filter((c) => c.active).length})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'inactive'
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive ({challenges.filter((c) => !c.active).length})
            </button>
          </div>
        </div>

        {/* Challenges List */}
        {filteredChallenges.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">No challenges found</p>
            <p className="text-gray-500">
              {filter === 'all'
                ? 'Create your first challenge to get started!'
                : `No ${filter} challenges available.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{getTypeIcon(challenge.type)}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                              challenge.type
                            )}`}
                          >
                            {challenge.type}
                          </span>
                          <span className="text-sm text-gray-600">
                            {new Date(challenge.challengeDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{challenge.description}</p>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-accent font-semibold">⭐</span>
                        <span className="text-gray-700">{challenge.points} points</span>
                      </div>
                      {challenge.options && challenge.options.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">Options:</span>
                          <span className="text-gray-700">{challenge.options.length}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Created:</span>
                        <span className="text-gray-700">
                          {new Date(challenge.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col items-end space-y-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        challenge.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {challenge.active ? '✅ Active' : '⏸️ Inactive'}
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleActive(challenge.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          challenge.active
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {challenge.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => {
                          console.log('Edit challenge (mock):', challenge)
                          alert('Edit functionality coming soon! Check console for challenge data.')
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(challenge.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default ManageChallenges

