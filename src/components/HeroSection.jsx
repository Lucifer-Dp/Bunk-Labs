import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-accent">Bunk Lab</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Gamify your engineering journey. Solve challenges, earn points, climb the leaderboard, and become a top engineer!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-accent text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
            >
              Start Your Challenge
            </Link>
            <Link
              to="/challenge"
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Try a Challenge
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
