export default function Home() {
  return (
    <main className="page">
      <h1>Welcome to Task Manager</h1>
      <p>Manage your tasks efficiently. Navigate to <strong>Projects</strong> to see all projects or <strong>Contact</strong> to reach us.</p>
      <div className="card-grid">
        <div className="card">📋 Total Tasks: 24</div>
        <div className="card">✅ Completed: 18</div>
        <div className="card">⏳ Pending: 6</div>
      </div>
    </main>
  );
}
