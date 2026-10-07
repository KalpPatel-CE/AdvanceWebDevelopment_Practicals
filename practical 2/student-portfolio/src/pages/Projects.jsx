const projects = [
  { id: 1, name: 'Portfolio Website', desc: 'A personal portfolio built with React and Vite.' },
  { id: 2, name: 'Todo App', desc: 'A task manager with CRUD operations.' },
  { id: 3, name: 'Weather Dashboard', desc: 'Displays live weather using a public API.' },
]

function Projects() {
  return (
    <main className="page">
      <h1>Projects</h1>
      <ul style={{ flexDirection: 'column', gap: '16px' }}>
        {projects.map((p) => (
          <li key={p.id} style={{ background: 'none', color: 'inherit', padding: 0, borderRadius: 0 }}>
            <strong style={{ color: 'var(--text-h)' }}>{p.name}</strong>
            <p>{p.desc}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Projects
