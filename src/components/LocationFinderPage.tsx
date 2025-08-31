
import React, { useState } from 'react'
import styles from './LocationFinderPage.module.css'
import TextSearch from './TextSearch'
import MapWidget from './MapWidget'
import DetailsPanel from './DetailsPanel'
import LocationDetialsPagination from './LocationDetailsPagination'
import BottomNav from './BottomNav'
import Header from './Header'
import ModeSelector from './ModeSelector'
// image served from public/ as /avatar.svg

export default function LocationFinderPage(): JSX.Element {
  // Keep a single location query state; any search will be transformed into "petrol bunk near <query>"
  // Start empty so MapWidget can use detected coordinates by default.
  const [areaQuery, setAreaQuery] = useState<string>(() => {
    try {
      return sessionStorage.getItem('areaQuery') || ''
    } catch (e) {
      return ''
    }
  })
  // UI mode: 'map' shows the map (default), 'list' shows the results list / pagination
  // Initialize from sessionStorage so the user's last choice is retained when they navigate back.
  const [viewMode, setViewMode] = useState<'map' | 'list'>(() => {
    try {
      const stored = sessionStorage.getItem('viewMode')
      return stored === 'list' ? 'list' : 'map'
    } catch (e) {
      return 'map'
    }
  })

  // wrapper to update state and persist selection
  function handleSetViewMode(mode: 'map' | 'list') {
    setViewMode(mode)
    try {
      sessionStorage.setItem('viewMode', mode)
    } catch (e) {
      // ignore storage errors
    }
  }

  function handleMapSearch(q?: string) {
    // If user typed nothing, keep current areaQuery. Otherwise update it.
    if (q && q.trim().length > 0) {
      const trimmed = q.trim()
      setAreaQuery(trimmed)
      try {
        sessionStorage.setItem('areaQuery', trimmed)
      } catch (e) {
        // ignore storage errors
      }
    }
  }

  return (
    <main className={styles.page} aria-labelledby="locationTitle">
  <Header title="Location Finder" />

      <div className={styles.content}>
        <section className={styles.controls} aria-label="Search controls">
         
          {/* View mode selector: Map (default) or List using ModeSelector */}
          <div className={styles.row}>
            <ModeSelector
              selectedMode={viewMode}
              onSelect={handleSetViewMode}
            />
          </div>
        </section>

        {viewMode === 'map' ? (
          <>
            <section className={styles.mapSection} aria-label="Map of results">
              <div className={styles.mapWrapper} >
                <MapWidget className={styles.map} query={areaQuery} onSearch={handleMapSearch} />
              </div>
            </section>

         </>
        ) : (
          <section aria-label="Results list">
            {/* Results rendered via Pagination component (shows 2 by default, loads more on demand) */}
            <LocationDetialsPagination />
          </section>
        )}
      </div>

  <BottomNav />
    </main>
  )
}
