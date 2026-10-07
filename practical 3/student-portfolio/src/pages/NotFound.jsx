import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="page">
      <h1>404 — Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="toggle-btn" style={{ display: 'inline-block', marginTop: '16px' }}>
        ← Back to Home
      </Link>
    </main>
  )
}

export default NotFound
