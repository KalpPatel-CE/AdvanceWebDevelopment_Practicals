function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      <span>⚠️ Failed to load repos: {message}</span>
    </div>
  )
}

export default ErrorMessage
