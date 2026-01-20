const LeaderboardRow = ({ user, isCurrentUser = false }) => {
  const getRankColor = (rank) => {
    if (rank === 1) return 'text-accent'
    if (rank === 2) return 'text-gray-400'
    if (rank === 3) return 'text-orange-500'
    return 'text-gray-600'
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
        isCurrentUser
          ? 'bg-primary bg-opacity-10 border-2 border-primary'
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <div className={`text-2xl font-bold w-12 text-center ${getRankColor(user.rank)}`}>
          {getRankIcon(user.rank)}
        </div>
        <div className="text-3xl">{user.avatar}</div>
        <div>
          <h3 className={`font-semibold ${isCurrentUser ? 'text-primary' : 'text-gray-800'}`}>
            {user.name}
            {isCurrentUser && <span className="ml-2 text-sm">(You)</span>}
          </h3>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-800">{user.points.toLocaleString()}</p>
        <p className="text-sm text-gray-500">points</p>
      </div>
    </div>
  )
}

export default LeaderboardRow


