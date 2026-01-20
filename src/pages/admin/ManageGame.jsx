import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'

const ManageGame = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    basePoints: 10,
    pointsPerLevel: 5,
    maxLevel: 10,
    timeLimit: 0,
    cardPairs: 4,
    cardsIncreasePerLevel: 1,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    const saved = localStorage.getItem('memory_game_settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('memory_game_settings', JSON.stringify(settings))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    console.log('Game settings saved:', settings)
  }

  const resetToDefaults = () => {
    const defaultSettings = {
      enabled: true,
      basePoints: 10,
      pointsPerLevel: 5,
      maxLevel: 10,
      timeLimit: 0,
      cardPairs: 4,
      cardsIncreasePerLevel: 1,
    }
    setSettings(defaultSettings)
    localStorage.setItem('memory_game_settings', JSON.stringify(defaultSettings))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Memory Game</h1>
          <p className="text-gray-600">Configure game settings, points, and difficulty</p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
            ✅ Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Enable/Disable Game */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label htmlFor="enabled" className="block text-sm font-semibold text-gray-700 mb-1">
                Enable Memory Game
              </label>
              <p className="text-xs text-gray-500">Turn the game on/off for all users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="enabled"
                name="enabled"
                checked={settings.enabled}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Points Settings */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Points & Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="basePoints" className="block text-sm font-semibold text-gray-700 mb-2">
                  Base Points (per level)
                </label>
                <input
                  type="number"
                  id="basePoints"
                  name="basePoints"
                  min="0"
                  value={settings.basePoints}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Points awarded for completing a level</p>
              </div>

              <div>
                <label htmlFor="pointsPerLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                  Bonus Points per Level
                </label>
                <input
                  type="number"
                  id="pointsPerLevel"
                  name="pointsPerLevel"
                  min="0"
                  value={settings.pointsPerLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Additional points multiplied by level number</p>
              </div>
            </div>
          </div>

          {/* Difficulty Settings */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Difficulty Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="maxLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Level
                </label>
                <input
                  type="number"
                  id="maxLevel"
                  name="maxLevel"
                  min="1"
                  max="20"
                  value={settings.maxLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Maximum level players can reach</p>
              </div>

              <div>
                <label htmlFor="cardPairs" className="block text-sm font-semibold text-gray-700 mb-2">
                  Starting Card Pairs
                </label>
                <input
                  type="number"
                  id="cardPairs"
                  name="cardPairs"
                  min="2"
                  max="12"
                  value={settings.cardPairs}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Number of card pairs at level 1</p>
              </div>

              <div>
                <label htmlFor="cardsIncreasePerLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cards Increase per Level
                </label>
                <input
                  type="number"
                  id="cardsIncreasePerLevel"
                  name="cardsIncreasePerLevel"
                  min="0"
                  max="4"
                  value={settings.cardsIncreasePerLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">How many pairs to add each level (0 = same difficulty)</p>
              </div>

              <div>
                <label htmlFor="timeLimit" className="block text-sm font-semibold text-gray-700 mb-2">
                  Time Limit (seconds)
                </label>
                <input
                  type="number"
                  id="timeLimit"
                  name="timeLimit"
                  min="0"
                  value={settings.timeLimit}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">0 = no time limit</p>
              </div>
            </div>
          </div>

          {/* Game Stats Preview */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Level 1 Points</div>
                  <div className="font-bold text-primary">
                    {settings.basePoints + settings.pointsPerLevel}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Level 5 Points</div>
                  <div className="font-bold text-primary">
                    {settings.basePoints + (5 * settings.pointsPerLevel)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Level {settings.maxLevel} Points</div>
                  <div className="font-bold text-primary">
                    {settings.basePoints + (settings.maxLevel * settings.pointsPerLevel)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Max Cards</div>
                  <div className="font-bold text-primary">
                    {(settings.cardPairs + (settings.maxLevel - 1) * settings.cardsIncreasePerLevel) * 2}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center space-x-4 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
            >
              💾 Save Settings
            </button>
            <button
              type="button"
              onClick={resetToDefaults}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Reset Defaults
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ManageGame

