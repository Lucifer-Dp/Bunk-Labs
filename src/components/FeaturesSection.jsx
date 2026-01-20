import { FaTrophy, FaTasks, FaMedal } from 'react-icons/fa'

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaTasks size={50} />,
      title: 'Daily Challenges',
      description: 'Solve fun engineering puzzles every day and improve your problem-solving skills.',
    },
    {
      icon: <FaTrophy size={50} />,
      title: 'Leaderboard',
      description: 'Compete with your batch & branch and see how you rank among your peers.',
    },
    {
      icon: <FaMedal size={50} />,
      title: 'Badges',
      description: 'Collect badges and show off your achievements and skills.',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose Bunk Lab?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
