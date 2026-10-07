import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Footer from './components/Footer.jsx'

const skills = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'React']

function App() {
  return (
    <div>
      <Header name="Kalp Patel" />
      <About />
      <Skills skillList={skills} />
      <Footer />
    </div>
  )
}

export default App
