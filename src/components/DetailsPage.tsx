import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DetailsPanel from './DetailsPanel'
import Header from './Header'
import BottomNav from './BottomNav'
import styles from './LocationFinderPage.module.css'

export default function DetailsPage(): JSX.Element {
  const loc = useLocation()
  const navigate = useNavigate()
  const state = (loc.state as any) || {}
  const item = state.item || null

  if (!item) {
    // If no item was provided, go back to the app main page
    navigate('/app')
    return <div />
  }

  // DetailsPanel currently renders static content; pass item as props if updated
  return (
    <main className={styles.page} aria-labelledby="locationTitle">
      <Header title="Location Details" />
      <div className={styles.content}>
        <div style={{ padding: 8 }}>
          <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
          <div>
            <strong>Coordinates:</strong> {item.lat ?? '—'}, {item.lng ?? '—'}
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
