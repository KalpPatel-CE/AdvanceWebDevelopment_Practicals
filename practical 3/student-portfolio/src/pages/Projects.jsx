import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/KalpPatel-CE/repos')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <main className="page"><Spinner /></main>
  if (error)   return <main className="page"><ErrorMessage message={error} /></main>

  return (
    <main className="page">
      <h1>GitHub Repos</h1>
      <p className="page-sub">{repos.length} public repositories</p>
      <div className="project-grid">
        {repos.map((repo) => (
          <div key={repo.id} className="project-card">
            <h2>{repo.name}</h2>
            <p>{repo.description || 'No description provided.'}</p>
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="card-link">
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Projects
