import { Link } from 'react-router-dom'

const Header = ({ isLoggedIn, currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">Bunk Lab</div>
            <span className="text-accent text-xl">🏆</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                {currentUser?.isAdmin ? (
                  <>
                    <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors">
                      Admin Dashboard
                    </Link>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-700">👨‍💼 {currentUser?.name || 'Admin'}</span>
                      <button
                        onClick={onLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/challenge" className="text-gray-700 hover:text-primary transition-colors">
                      Challenges
                    </Link>
                    <Link to="/leaderboard" className="text-gray-700 hover:text-primary transition-colors">
                      Leaderboard
                    </Link>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-gray-700">
                        <Link to="/edit-profile" className="mr-2 hover:text-primary transition-colors" title="Edit Profile">
                          <span className="text-xl">{currentUser?.avatar || '👤'}</span>
                        </Link>
                        <span>{currentUser?.name || 'User'}</span>
                      </div>
                      <Link
                        to="/edit-profile"
                        className="text-gray-500 hover:text-primary transition-colors"
                        title="Edit Profile"
                      >
                        ⚙️
                      </Link>
                      <button
                        onClick={onLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/leaderboard" className="text-gray-700 hover:text-primary transition-colors">
                  Leaderboard
                </Link>
                <Link
                  to="/login"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-accent text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
