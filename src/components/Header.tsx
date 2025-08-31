import React from 'react'
import styles from './Header.module.css'

type Props = {
  title?: string
  subtitle?: string
  avatarSrc?: string
  showMenu?: boolean
}

// Configurable header: pages can pass title, subtitle, avatarSrc and control menu button visibility.
export default function Header({ title = 'Location Finder', subtitle, avatarSrc = '/avatar.png', showMenu = true }: Props): JSX.Element {
  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.hero}>
        {showMenu ? (
          <button className={styles.iconBtn} aria-label="Open menu">
            {/* regular menu (hamburger) icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor" />
              <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
              <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        ) : (
          <div style={{ width: 44 }} />
        )}

        <div className={styles.heroTitle}>
          <div id="locationTitle" className={styles.title}>{title}</div>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        <img src={avatarSrc} alt="User profile" className={styles.avatar} />
      </div>
    </header>
  )
}
