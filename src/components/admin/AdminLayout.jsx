import { Link, useLocation } from 'react-router-dom'

const AdminLayout = ({ children }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/add-challenge', label: 'Add Challenge', icon: '➕' },
    { path: '/admin/manage-challenges', label: 'Manage Challenges', icon: '📝' },
    { path: '/admin/manage-game', label: 'Manage Game', icon: '🎮' },
    { path: '/admin/manage-colleges', label: 'Manage Colleges', icon: '🏫' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md border-b-2 border-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-primary">BunkLab</h1>
              <span className="text-accent text-xl">🏆</span>
              <span className="text-gray-400">|</span>
              <span className="text-lg font-semibold text-gray-700">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">👤 Admin User</span>
              <Link
                to="/"
                className="text-sm text-primary hover:text-blue-600 transition-colors"
              >
                Back to Site →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-lg min-h-screen pt-6">
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Tagline */}
          <div className="mt-8 mx-4 p-4 bg-gradient-to-r from-primary to-blue-600 rounded-lg text-white text-center">
            <p className="text-sm font-semibold">"Bunk classes. Rank up."</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

