const projects = [
  { id: 1, name: 'Website Redesign', status: 'In Progress', tasks: 8 },
  { id: 2, name: 'Mobile App', status: 'Planning', tasks: 12 },
  { id: 3, name: 'API Integration', status: 'Completed', tasks: 5 },
  { id: 4, name: 'Database Migration', status: 'In Progress', tasks: 7 },
];

export default function Projects() {
  return (
    <main className="page">
      <h1>Projects</h1>
      <p>This chunk is downloaded only when you navigate to <code>/projects</code>.</p>
      <table className="table">
        <thead>
          <tr><th>#</th><th>Project</th><th>Status</th><th>Tasks</th></tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td><span className={`badge ${p.status.replace(' ', '-').toLowerCase()}`}>{p.status}</span></td>
              <td>{p.tasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
