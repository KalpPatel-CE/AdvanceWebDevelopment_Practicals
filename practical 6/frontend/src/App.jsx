import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';

const EMPTY_FORM = { title: '', description: '', priority: 'low' };

export default function App() {
    const [tasks, setTasks]     = useState([]);
    const [form, setForm]       = useState(EMPTY_FORM);
    const [editId, setEditId]   = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState('');
    const [toast, setToast]     = useState('');

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            setTasks(await getTasks());
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editId) {
                const updated = await updateTask(editId, form);
                setTasks(tasks.map(t => t._id === editId ? updated : t));
                showToast('Task updated!');
            } else {
                const created = await createTask(form);
                setTasks([created, ...tasks]);
                showToast('Task created!');
            }
            setForm(EMPTY_FORM);
            setEditId(null);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleEdit = (task) => {
        setEditId(task._id);
        setForm({ title: task.title, description: task.description, priority: task.priority });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this task?')) return;
        setError('');
        try {
            await deleteTask(id);
            setTasks(tasks.filter(t => t._id !== id));
            showToast('Task deleted!');
        } catch (e) {
            setError(e.message);
        }
    };

    const handleToggle = async (task) => {
        try {
            const updated = await updateTask(task._id, { completed: !task.completed });
            setTasks(tasks.map(t => t._id === task._id ? updated : t));
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
            <h1>Task Manager</h1>

            {toast && (
                <div style={{ background: '#4caf50', color: '#fff', padding: '0.5rem 1rem', borderRadius: 4, marginBottom: '1rem' }}>
                    {toast}
                </div>
            )}

            {error && (
                <div style={{ background: '#f44336', color: '#fff', padding: '0.5rem 1rem', borderRadius: 4, marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                <input
                    placeholder="Title *"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                    style={{ padding: '0.5rem' }}
                />
                <input
                    placeholder="Description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    style={{ padding: '0.5rem' }}
                />
                <select
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value })}
                    style={{ padding: '0.5rem' }}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                        {editId ? 'Update Task' : 'Add Task'}
                    </button>
                    {editId && (
                        <button type="button" onClick={() => { setEditId(null); setForm(EMPTY_FORM); }} style={{ padding: '0.5rem 1rem' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {loading && <p>Loading...</p>}

            {tasks.map(task => (
                <div key={task._id} style={{
                    border: '1px solid #ddd', borderRadius: 6, padding: '0.75rem 1rem',
                    marginBottom: '0.75rem', opacity: task.completed ? 0.6 : 1
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.title}
                            </strong>
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#888' }}>
                                [{task.priority}]
                            </span>
                            {task.description && <p style={{ margin: '0.25rem 0 0', color: '#555' }}>{task.description}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleToggle(task)} style={{ padding: '0.25rem 0.5rem' }}>
                                {task.completed ? 'Undo' : 'Done'}
                            </button>
                            <button onClick={() => handleEdit(task)} style={{ padding: '0.25rem 0.5rem' }}>Edit</button>
                            <button onClick={() => handleDelete(task._id)} style={{ padding: '0.25rem 0.5rem', color: 'red' }}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}

            {!loading && tasks.length === 0 && <p style={{ color: '#888' }}>No tasks yet. Add one above!</p>}
        </div>
    );
}
