import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'

const AddChallenge = () => {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'Daily Challenge',
    description: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 100,
    challengeDate: new Date().toISOString().split('T')[0],
    active: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Prepare challenge data
    const challengeData = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      points: parseInt(formData.points),
      challengeDate: formData.challengeDate,
      active: formData.active,
      createdAt: new Date().toISOString(),
    }

    // Add options and correct answer only if not Meme Challenge
    if (formData.type !== 'Meme Challenge') {
      challengeData.options = formData.options.filter((opt) => opt.trim() !== '')
      if (formData.correctAnswer) {
        challengeData.correctAnswer = formData.correctAnswer
      }
    }

    // Save to localStorage (mock storage)
    const existingChallenges = JSON.parse(localStorage.getItem('bunklab_challenges') || '[]')
    existingChallenges.unshift(challengeData) // Add to beginning
    localStorage.setItem('bunklab_challenges', JSON.stringify(existingChallenges))

    // Log to console
    console.log('Challenge added:', challengeData)

    // Show success message
    setShowSuccess(true)

    // Reset form
    setFormData({
      title: '',
      type: 'Daily Challenge',
      description: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 100,
      challengeDate: new Date().toISOString().split('T')[0],
      active: true,
    })

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const isMemeChallenge = formData.type === 'Meme Challenge'

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Challenge</h1>
          <p className="text-gray-600">Create a new challenge for BunkLab students</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="font-semibold">Challenge added successfully (mock)</p>
                <p className="text-sm">The challenge has been saved to localStorage</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Challenge Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Challenge Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Array Manipulation Challenge"
            />
          </div>

          {/* Challenge Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
              Challenge Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Daily Challenge">📚 Daily Challenge</option>
              <option value="Meme Challenge">😂 Meme Challenge</option>
              <option value="Fun Challenge">🎉 Fun Challenge</option>
            </select>
          </div>

          {/* Challenge Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Challenge Description / Question <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter the challenge question or description..."
            />
          </div>

          {/* Options (Hidden for Meme Challenge) */}
          {!isMemeChallenge && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Options (Optional)
              </label>
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Leave empty if not applicable
              </p>
            </div>
          )}

          {/* Correct Answer (Hidden for Meme Challenge) */}
          {!isMemeChallenge && (
            <div>
              <label htmlFor="correctAnswer" className="block text-sm font-semibold text-gray-700 mb-2">
                Correct Answer <span className="text-red-500">*</span>
              </label>
              <select
                id="correctAnswer"
                name="correctAnswer"
                required
                value={formData.correctAnswer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Correct Option</option>
                {formData.options.map((option, index) => (
                  <option key={index} value={index}>
                    Option {String.fromCharCode(65 + index)}: {option || '(Empty)'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Points */}
          <div>
            <label htmlFor="points" className="block text-sm font-semibold text-gray-700 mb-2">
              Points <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="points"
              name="points"
              required
              min="1"
              value={formData.points}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="100"
            />
          </div>

          {/* Challenge Date */}
          <div>
            <label htmlFor="challengeDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Challenge Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="challengeDate"
              name="challengeDate"
              required
              value={formData.challengeDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label htmlFor="active" className="block text-sm font-semibold text-gray-700">
                Active Status
              </label>
              <p className="text-xs text-gray-500">Make this challenge visible to students</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
            >
              💾 Save Challenge
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AddChallenge

