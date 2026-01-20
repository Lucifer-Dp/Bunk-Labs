export const avatars = ['👨‍💻', '👩‍💻', '🦸‍♂️', '🦸‍♀️', '🤖', '🦊', '🐯', '🦁', '🐼', '🐨']

export const colleges = [
  { id: 1, name: 'Tech Institute of Engineering', students: 1250, status: 'Active' },
  { id: 2, name: 'Global Science University', students: 890, status: 'Active' },
  { id: 3, name: 'Future Systems College', students: 450, status: 'Active' },
  { id: 4, name: 'Innovation Academy', students: 120, status: 'Pending Approval' },
  { id: 5, name: 'Quantum Physics School', students: 60, status: 'Pending Approval' },
]

// Mock badges data
export const badges = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first challenge',
    icon: '🎯',
    earned: true,
  },
  {
    id: 2,
    name: 'Problem Solver',
    description: 'Solve 10 challenges',
    icon: '🧩',
    earned: true,
  },
  {
    id: 3,
    name: 'Speed Demon',
    description: 'Complete a challenge in under 2 minutes',
    icon: '⚡',
    earned: true,
  },
  {
    id: 4,
    name: 'Top Performer',
    description: 'Reach top 20 in leaderboard',
    icon: '🏆',
    earned: true,
  },
  {
    id: 5,
    name: 'Master Engineer',
    description: 'Solve 50 challenges',
    icon: '👨‍🔧',
    earned: false,
  },
  {
    id: 6,
    name: 'Perfect Score',
    description: 'Get 100% on 5 challenges',
    icon: '💯',
    earned: false,
  },
]

// Challenge Templates (30 days)
const challengeTemplates = [
  {
    title: 'JavaScript Arrays',
    question: 'Which method adds an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    difficulty: 'Easy',
    category: 'JavaScript'
  },
  {
    title: 'CSS Box Model',
    question: 'Which property is NOT part of the CSS Box Model?',
    options: ['Margin', 'Border', 'Padding', 'Color'],
    correctAnswer: 3,
    difficulty: 'Easy',
    category: 'CSS'
  },
  {
    title: 'React Components',
    question: 'What is the correct way to pass data from parent to child in React?',
    options: ['State', 'Props', 'Context', 'Redux'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'React'
  },
  {
    title: 'HTML Semantics',
    question: 'Which tag is used for the main content of a document?',
    options: ['<header>', '<div>', '<main>', '<section>'],
    correctAnswer: 2,
    difficulty: 'Easy',
    category: 'HTML'
  },
  {
    title: 'JS Variables',
    question: 'Which keyword defines a variable that cannot be reassigned?',
    options: ['var', 'let', 'const', 'static'],
    correctAnswer: 2,
    difficulty: 'Easy',
    category: 'JavaScript'
  },
  {
    title: 'Git Basics',
    question: 'Which command stages files for commit?',
    options: ['git push', 'git commit', 'git add', 'git status'],
    correctAnswer: 2,
    difficulty: 'Easy',
    category: 'Git'
  },
  {
    title: 'API Status Codes',
    question: 'Which status code indicates "Not Found"?',
    options: ['200', '404', '500', '403'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'Web'
  },
  {
    title: 'React Hooks',
    question: 'Which hook is used for side effects?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'React'
  },
  {
    title: 'CSS Flexbox',
    question: 'Which property aligns items along the main axis?',
    options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'CSS'
  },
  {
    title: 'JS Promises',
    question: 'What keyword is used to handle a resolved Promise?',
    options: ['catch', 'finally', 'then', 'resolve'],
    correctAnswer: 2,
    difficulty: 'Medium',
    category: 'JavaScript'
  },
  {
    title: 'SQL Basics',
    question: 'Which statement is used to retrieve data from a database?',
    options: ['GET', 'SELECT', 'FETCH', 'QUERY'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'Database'
  },
  {
    title: 'Python Syntax',
    question: 'How do you start a function in Python?',
    options: ['function myFunc()', 'def myFunc():', 'func myFunc()', 'define myFunc()'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Python'
  },
  {
    title: 'Algorithm Complexity',
    question: 'What is the Big O of a single loop iterating n times?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctAnswer: 2,
    difficulty: 'Medium',
    category: 'Algorithms'
  },
  {
    title: 'Cybersecurity',
    question: 'What does SQL Injection target?',
    options: ['The browser', 'The database', 'The network', 'The server RAM'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'Security'
  },
  {
    title: 'React State',
    question: 'What happens when you call setState?',
    options: ['Nothing', 'Component re-renders', 'Page reloads', 'Database updates'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'React'
  },
  {
    title: 'Data Structures',
    question: 'Which data structure follows LIFO (Last In First Out)?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'CS Fundamentals'
  },
  {
    title: 'Networking',
    question: 'Which protocol is used for secure web browsing?',
    options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
    correctAnswer: 2,
    difficulty: 'Easy',
    category: 'Networking'
  },
  {
    title: 'Linux Commands',
    question: 'Which command lists files in a directory?',
    options: ['cd', 'ls', 'mkdir', 'pwd'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Linux'
  },
  {
    title: 'JS Arrays',
    question: 'Which method creates a new array by applying a function to every element?',
    options: ['forEach', 'filter', 'map', 'reduce'],
    correctAnswer: 2,
    difficulty: 'Medium',
    category: 'JavaScript'
  },
  {
    title: 'CSS Grid',
    question: 'Which property defines the number of columns?',
    options: ['grid-template-columns', 'grid-columns', 'display-grid', 'grid-auto-flow'],
    correctAnswer: 0,
    difficulty: 'Hard',
    category: 'CSS'
  },
  {
    title: 'Node.js',
    question: 'Which module is used for file system operations?',
    options: ['http', 'fs', 'path', 'os'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'Node.js'
  },
  {
    title: 'REST API',
    question: 'Which method is typically used to update a resource?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 2,
    difficulty: 'Medium',
    category: 'Web'
  },
  {
    title: 'Docker',
    question: 'What file is used to define a Docker image?',
    options: ['docker-compose.yml', 'Dockerfile', 'docker.json', 'Containerfile'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'DevOps'
  },
  {
    title: 'Java Basics',
    question: 'Which keyword creates an object in Java?',
    options: ['class', 'new', 'object', 'create'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Java'
  },
  {
    title: 'Testing',
    question: 'What is a unit test?',
    options: ['Testing the whole app', 'Testing a single function/component', 'Testing the API', 'User testing'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Testing'
  },
  {
    title: 'Agile',
    question: 'What is a "Sprint" in Agile?',
    options: ['A fast run', 'A fixed time period for work', 'A meeting', 'A bug fix'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Methodology'
  },
  {
    title: 'Mobile Dev',
    question: 'Which framework uses Dart?',
    options: ['React Native', 'Flutter', 'Ionic', 'Xamarin'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'Mobile'
  },
  {
    title: 'Cloud',
    question: 'What does AWS stand for?',
    options: ['Amazon Web Services', 'Advanced Web Solutions', 'Automated Web Systems', 'Active Web Server'],
    correctAnswer: 0,
    difficulty: 'Easy',
    category: 'Cloud'
  },
  {
    title: 'Browser',
    question: 'What does DOM stand for?',
    options: ['Document Object Model', 'Data Object Model', 'Digital Object Method', 'Document Oriented Module'],
    correctAnswer: 0,
    difficulty: 'Easy',
    category: 'Web'
  },
  {
    title: 'Career',
    question: 'What is a "Portfolio"?',
    options: ['A type of stock', 'A collection of your work', 'A resume', 'A job application'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Career'
  }
]

// Generate 30 days of challenges starting from today
const generateChallenges = () => {
  const generatedChallenges = []
  const today = new Date()
  
  // Create 30 challenges
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    
    // Cycle through templates if we run out (though we have 30)
    const template = challengeTemplates[i % challengeTemplates.length]
    
    generatedChallenges.push({
      id: `daily-${i + 1}`,
      ...template,
      points: template.difficulty === 'Hard' ? 300 : template.difficulty === 'Medium' ? 200 : 100,
      timeLimit: template.difficulty === 'Hard' ? 900 : template.difficulty === 'Medium' ? 600 : 300,
      challengeDate: dateString,
      active: true
    })
  }
  return generatedChallenges
}

// Export the generated challenges
export const challenges = generateChallenges()

// Leaderboard will be driven by real backend data later.
// For now we keep it empty and show only the logged-in user in the UI.
export const leaderboardData = []
