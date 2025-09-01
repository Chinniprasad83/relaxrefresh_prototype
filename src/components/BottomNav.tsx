import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './LocationFinderPage.module.css'

type NavItem = {
  id: string
  label: string
  path?: string
  icon?: string
}

type Props = {
  items?: NavItem[]
}

// Reusable bottom navigation. By default it renders the four prototype buttons.
export default function BottomNav({ items }: Props) {
  const navigate = useNavigate()
  const loc = useLocation()

  const defaultItems: NavItem[] = [
    { id: 'home', label: 'Home', path: '/locationfindersearch', icon: '/home.png' },
    { id: 'dashboard', label: 'Interest', path: '/interest', icon: '/heart.png' },
    { id: 'status', label: 'Queries', path: '/queries', icon: '/query.png' },
    { id: 'foodcourt', label: 'Food Court', path: '/app', icon: '/foodcourt.png' },
    { id: 'profile', label: 'Profile', path: '/app', icon: '/profile.png' },
  ]

  const navItems = items && items.length > 0 ? items : defaultItems

  return (
    <nav className={styles.bottomNav} role="navigation" aria-label="Primary">
      {navItems.map((it) => (
        <button
          key={it.id}
          className={styles.navBtn}
          aria-label={it.label}
          aria-current={loc.pathname === it.path ? 'true' : undefined}
          onClick={() => navigate(it.path ?? '/app')}
        >
          {it.icon ? (
            <img src={it.icon} alt={it.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
          ) : (
            <span aria-hidden>•</span>
          )}
          <span className={styles.navLabel}>{it.label}</span>
        </button>
      ))}
    </nav>
  )
}
