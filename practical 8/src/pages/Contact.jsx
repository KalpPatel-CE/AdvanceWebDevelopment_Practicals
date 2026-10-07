import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="page">
      <h1>Contact Us</h1>
      <p>This chunk is downloaded only when you navigate to <code>/contact</code>.</p>
      {submitted ? (
        <p className="success">✅ Message sent! We'll get back to you soon.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows={4} required />
          <button type="submit">Send Message</button>
        </form>
      )}
    </main>
  );
}
