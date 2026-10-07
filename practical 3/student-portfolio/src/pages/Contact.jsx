import { useState } from 'react'

function Contact() {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [showTip, setShowTip] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (name && message) setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="page">
        <h1>Thanks, {name}! 🎉</h1>
        <p>Your message has been received.</p>
        <button className="toggle-btn" onClick={() => { setSubmitted(false); setName(''); setMessage('') }}>
          Send another message
        </button>
      </main>
    )
  }

  return (
    <main className="page">
      <h1>Contact Me</h1>
      <p className="page-sub">
        Have a question or want to work together?{' '}
        <button className="tip-btn" onClick={() => setShowTip(t => !t)}>
          {showTip ? 'Hide tip ▲' : 'Show tip ▼'}
        </button>
      </p>
      {showTip && (
        <div className="tooltip">
          💡 Be specific about your project or question for a faster response!
        </div>
      )}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Message
          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            required
          />
          <span className="char-count">{message.length} characters</span>
        </label>
        <button type="submit" className="toggle-btn" disabled={!name || !message}>
          Send Message
        </button>
      </form>
      {message && (
        <div className="live-preview">
          <strong>Live preview:</strong> {message}
        </div>
      )}
    </main>
  )
}

export default Contact
