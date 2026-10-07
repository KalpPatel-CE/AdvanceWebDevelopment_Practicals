import { useState } from 'react'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'

const skills = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'React']

function Home() {
  const [showSkills, setShowSkills] = useState(true)

  return (
    <main className="page">
      <h1>Hi, I'm Kalp Patel 👋</h1>
      <About />
      <button className="toggle-btn" onClick={() => setShowSkills(s => !s)}>
        {showSkills ? 'Hide Skills' : 'Show Skills'}
      </button>
      {showSkills && <Skills skillList={skills} />}
    </main>
  )
}

export default Home
