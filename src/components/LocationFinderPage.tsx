
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import styles from './LocationFinderPage.module.css'
import MapWidget from './MapWidget'
import LocationDetailsPagination from './LocationDetailsPagination'
import BottomNav from './BottomNav'
import Header from './Header'
import ModeSelector from './ModeSelector'
import { useNavigate } from 'react-router-dom';
// image served from public/ as /avatar.svg

export default function LocationFinderPage(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state as { state?: string; city?: string; supplier?: string } | undefined;
  // Keep a single location query state; any search will be transformed into "petrol bunk near <query>"
  // Start empty so MapWidget can use detected coordinates by default.
  const [areaQuery, setAreaQuery] = useState<string>(() => {
    try {
      return sessionStorage.getItem('areaQuery') || ''
    } catch (e) {
      return ''
    }
  })
  // Get state/city/supplier from navigation if available
  const selectedState = navState?.state || '';
  const selectedCity = navState?.city || '';
  const selectedSupplier = navState?.supplier || '';
  // Removed: StallLocationSearch state now handled in LocationFinderSearchPage
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
        <button className={styles.backButton} onClick={() => navigate(-1)}>← Back to List</button>

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
                <MapWidget
                  className={styles.map}
                  query={areaQuery}
                  onSearch={handleMapSearch}
                  selectedState={selectedState}
                  selectedCity={selectedCity}
                  selectedSupplier={selectedSupplier}
                />
              </div>
            </section>
          </>
        ) : (
          <section aria-label="Results list">
            {/* Results rendered via Pagination component (shows 2 by default, loads more on demand) */}
            <LocationDetailsPagination />
          </section>
        )}
      </div>
      <BottomNav />
    </main>
  )
}
