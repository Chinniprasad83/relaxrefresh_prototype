import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'
import IndividualDetailsPage from './IndividualDetailsPage'
import styles from './DetailsPage.module.css'

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

  // Use IndividualDetailsPage to show details
  return (
    <main className={styles.page} aria-labelledby="Details Page">
      <Header title="Location Details" />
      <div className={styles.content}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
        {/* Render IndividualDetailsPage with item props */}
        <div style={{ height: '500px' }}>
          <IndividualDetailsPage
            title={item.title || 'HP, Thindivanam'}
            address={item.address || 'GST road ,NH45 Naikar Travan, THINDIVANAM'}
            imageSrc={item.imageSrc || '/details.png'}
            description={item.description || 'On key national highways connecting Chennai with southern and western Tamil Nadu, as well as Bengaluru,'}
            highlights={item.highlights || ['Highlight 1', 'Highlight 2', 'Highlight 3']}
            vehiclesPerDay={item.vehiclesPerDay || 42}
            revenue={item.revenue || 3779.58}
          />
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
