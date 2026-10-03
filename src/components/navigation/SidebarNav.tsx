import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarNav.css';

const SECTIONS = [
  { to: '/', label: 'Overview' },
  { to: '/contact', label: 'Request a Demo' },
  { to: '/requests', label: 'Reviewer Workspace' },
  { to: '/security', label: 'Security' },
  { to: '/privacy', label: 'Privacy' },
];

export default function SidebarNav() {
  const [query, setQuery] = useState('');
  const visible = SECTIONS.filter(item => item.label.toLowerCase().includes(query.toLowerCase().trim()));
  return <aside className="codex-side" aria-label="Application navigation">
    <div className="codex-side-brand"><strong>Lindy Workflow</strong><span>Sections</span></div>
    <label className="codex-side-search-label" htmlFor="codex-side-search">Find a section</label>
    <input id="codex-side-search" className="codex-side-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search navigation" />
    <nav className="codex-side-links" aria-label="Sections">
      {visible.map(item => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `codex-side-link${isActive ? ' active' : ''}`}>{item.label}</NavLink>)}
      {visible.length === 0 && <p className="codex-side-empty">No matching sections</p>}
    </nav>
  </aside>;
}
