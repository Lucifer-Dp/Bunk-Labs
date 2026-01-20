import LeaderboardRow from '../components/LeaderboardRow'

const Leaderboard = ({ currentUser }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600">
            Your current position in Bunk Lab. More students will appear here when we connect the backend.
          </p>
        </div>

        {currentUser ? (
          <>
            {/* Simple podium just for the current user */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center md:order-2 md:scale-110">
                <div className="text-4xl mb-2">{currentUser.avatar || '👤'}</div>
                <div className="text-3xl mb-2">🥇</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{currentUser.name}</h3>
                <p className="text-2xl font-bold text-primary">
                  {(currentUser.points || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">points</p>
              </div>
            </div>

            {/* Full leaderboard (single row for now) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Current Standings</h2>
              <div className="space-y-2">
                <LeaderboardRow
                  user={{
                    id: currentUser.id,
                    name: currentUser.name,
                    points: currentUser.points || 0,
                    rank: currentUser.rank || 1,
                    avatar: currentUser.avatar || '👤',
                  }}
                  isCurrentUser
                />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-700 mb-4">Log in to see your Bunk Lab ranking.</p>
            <p className="text-sm text-gray-500">
              Once authentication is connected to a real backend, you will see other students here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard


