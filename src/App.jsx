import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, Component } from 'react'
import { authAPI, getAuthToken, removeAuthToken } from './utils/api'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Challenge from './pages/Challenge'
import Leaderboard from './pages/Leaderboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddChallenge from './pages/admin/AddChallenge'
import ManageChallenges from './pages/admin/ManageChallenges'
import ManageGame from './pages/admin/ManageGame'
import ManageColleges from './pages/admin/ManageColleges'
import MemoryGamePage from './pages/MemoryGamePage'
import EditProfile from './pages/student/EditProfile'

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-700 mb-4">The app encountered an error. Check the browser console for details.</p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function AppContent({ isLoggedIn, currentUser, onLogout, handleLogin, handleUserUpdate }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && !isAuthPage && <Header isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={onLogout} />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard currentUser={currentUser} onUserUpdate={handleUserUpdate} />} />
          <Route path="/edit-profile" element={<EditProfile currentUser={currentUser} onUserUpdate={handleUserUpdate} />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/leaderboard" element={<Leaderboard currentUser={currentUser} />} />
          <Route path="/memory-game" element={<MemoryGamePage currentUser={currentUser} onUserUpdate={handleUserUpdate} />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-challenge" element={<AddChallenge />} />
          <Route path="/admin/manage-challenges" element={<ManageChallenges />} />
          <Route path="/admin/manage-game" element={<ManageGame />} />
          <Route path="/admin/manage-colleges" element={<ManageColleges />} />
        </Routes>
      </main>
      {!isAdminRoute && !isAuthPage && <Footer />}
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Load user from token on first load
  useEffect(() => {
    const loadUser = async () => {
      const token = getAuthToken()
      if (!token) return

      try {
        const { user } = await authAPI.getCurrentUser(token)
        setCurrentUser(user)
        setIsLoggedIn(true)
      } catch (e) {
        // Token invalid, remove it
        removeAuthToken()
        console.error('Failed to load user', e)
      }
    }

    loadUser()
  }, [])

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    removeAuthToken()
  }

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser)
  }

  return (
    <ErrorBoundary>
      <Router>
        <AppContent
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={handleLogout}
          handleLogin={handleLogin}
          handleUserUpdate={handleUserUpdate}
        />
      </Router>
    </ErrorBoundary>
  )
}

export default App
