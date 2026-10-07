import { lazy, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import LoadingFallback from './components/LoadingFallback';

// Lazy-loaded route components — each becomes a separate chunk on build
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <span className="brand">TaskManager</span>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      {/* Suspense wraps only the Routes block, not the entire app */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  );
}
