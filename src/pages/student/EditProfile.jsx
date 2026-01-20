import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { colleges as initialColleges, avatars } from '../../data/dummyData'

const EditProfile = ({ currentUser, onUserUpdate }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    tagline: '',
    college: '',
    customCollege: ''
  })
  const [colleges, setColleges] = useState(initialColleges)
  const [showCustomCollege, setShowCustomCollege] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        avatar: currentUser.avatar || avatars[0],
        tagline: currentUser.tagline || '',
        college: currentUser.college || '',
        customCollege: ''
      })

      // Check if user's college is in the list
      const collegeExists = initialColleges.find(c => c.name === currentUser.college)
      if (currentUser.college && !collegeExists) {
        setFormData(prev => ({ ...prev, college: 'Other', customCollege: currentUser.college }))
        setShowCustomCollege(true)
      }
    } else {
      // If no user is logged in, redirect to login
      navigate('/login')
    }
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'college') {
      if (value === 'Other') {
        setShowCustomCollege(true)
      } else {
        setShowCustomCollege(false)
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({ ...prev, avatar }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        avatar: formData.avatar,
        tagline: formData.tagline,
        college: formData.college === 'Other' ? formData.customCollege : formData.college
      }

      console.log('Profile Updated:', updatedUser)
      
      if (onUserUpdate) {
        onUserUpdate(updatedUser)
      }
      
      setIsSaving(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              ✏️ Edit Profile
            </h1>
            <p className="text-blue-100 mt-2">Customize your BunkLab identity</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Avatar Selection */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">
                  Choose your Avatar
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`text-3xl p-3 rounded-xl transition-all ${
                        formData.avatar === avatar
                          ? 'bg-primary bg-opacity-10 ring-2 ring-primary transform scale-110'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
                    Fun Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    id="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="e.g. Coding Ninja 🥷"
                  />
                </div>
              </div>

              {/* College Selection */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <label htmlFor="college" className="block text-lg font-medium text-gray-800 mb-4">
                  🎓 Your College
                </label>
                
                <div className="space-y-4">
                  <select
                    name="college"
                    id="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                    required
                  >
                    <option value="">Select a College</option>
                    {colleges.map((college) => (
                      <option key={college.id} value={college.name}>
                        {college.name}
                      </option>
                    ))}
                    <option value="Other">Other (Add New)</option>
                  </select>

                  {showCustomCollege && (
                    <div className="animate-fade-in">
                      <label htmlFor="customCollege" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter College Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="customCollege"
                          id="customCollege"
                          value={formData.customCollege}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 border p-3 pl-4 pr-32 focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                          placeholder="Type your college name..."
                          required
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium border border-yellow-200">
                          Pending Approval
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        * New colleges require admin approval before appearing in the main list.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Stats Preview */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary">{currentUser?.points || 0}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Points</span>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-orange-500">{currentUser?.loginStreak || 0}🔥</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Streak</span>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-purple-600">#{currentUser?.rank || '-'}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Rank</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-8 py-2.5 rounded-lg bg-primary text-white font-bold shadow-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition-all transform hover:-translate-y-0.5 ${
                    isSaving ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
