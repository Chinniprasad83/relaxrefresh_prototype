import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

type Props = {
  lat?: number
  lng?: number
  zoom?: number
  className?: string
  /** Search radius in kilometers (max 50) */
  radius?: number
  /** Optional location-like query, e.g. "Madurai Tamilnadu"; the map will search for "petrol bunk near <query>" */
  query?: string
  /** Called when the inline map search bar is used */
  onSearch?: (q: string) => void
  /** Called when a stall/plot is clicked on the map */
  onStallClick?: (stallId?: number) => void
  selectedState?: string
  selectedCity?: string
  selectedSupplier?: string
}

// Simple iframe-only MapWidget that includes a search overlay.
export default function MapWidget({ lat, lng, zoom = 12, className, query, radius = 50, onSearch, onStallClick, selectedState, selectedCity, selectedSupplier }: Props) {
  const [local, setLocal] = useState(() => {
    try {
      return query ?? sessionStorage.getItem('areaQuery') ?? ''
    } catch (e) {
      return query ?? ''
    }
  })

  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false)

  function requestLocation() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setPermissionDenied(true)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        const lat = p.coords.latitude
        const lng = p.coords.longitude
        setPos({ lat, lng })
        setPermissionDenied(false)
        // Always run reverse geocode when we have coordinates
        reverseGeocodeAndPrefill(lat, lng)
      },
      (err) => {
        setPermissionDenied(true)
      },
      { enableHighAccuracy: false, maximumAge: 1000 * 60 * 5, timeout: 5000 }
    )
  }

  useEffect(() => {
    // Ask for location immediately on mount.
    requestLocation()
  }, [])

  async function reverseGeocodeAndPrefill(lat: number, lng: number) {
    setIsReverseGeocoding(true)
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`
      const res = await fetch(url)
      if (!res.ok) {
        return
      }
      const data = await res.json()
      const addr = data?.address || {}
      const place = addr.city || addr.town || addr.village || addr.hamlet || addr.county || ''
      const region = addr.state || addr.region || ''
      const country = addr.country || ''
      const parts = [] as string[]
      if (place) parts.push(place)
      if (region) parts.push(region)
      else if (country) parts.push(country)
      let areaLabel = parts.join(', ')
      if (selectedSupplier && selectedSupplier.trim()) {
        areaLabel = areaLabel ? `${areaLabel}, ${selectedSupplier}` : selectedSupplier
      }
      // Don't treat "Current Location" as an explicit query
      const hasExplicitQuery = query && query.trim().length > 0 && query.trim() !== 'Current Location'
      if (!hasExplicitQuery) {
        if (areaLabel && areaLabel.trim().length > 0) {
          setLocal(areaLabel)
        } else {
          const coordsString = `${lat.toFixed(4)},${lng.toFixed(4)}`
          setLocal(coordsString)
        }
      }
    } catch (err) {
      if (!query && !(local && local.trim().length > 0) && lat && lng) {
        const coordsString = `${lat.toFixed(4)},${lng.toFixed(4)}`
        setLocal(coordsString)
      }
    } finally {
      setIsReverseGeocoding(false)
    }
  }

  // Build a query that forces "petrol bunk" results in the area.
  // If a textual `query` is provided we use that (preferred). Otherwise fallback to coords.
  // We always prefer the user's location; if it's not available we ask for it.
  const effectiveLat = pos?.lat
  const effectiveLng = pos?.lng

  // enforce a sensible maximum radius
  const effectiveRadius = Math.min(Math.max(typeof radius === 'number' ? radius : 50, 0), 50)

  // Prefer selectedState/city/supplier if provided, then explicit `query` prop, then the local textbox value (`local`), then coords.
  // Updated logic: Don't show "Current Location" if we have coordinates and reverse geocoding is complete
  let textualQuery = '';
  let overlayLabel = '';
  if (
    selectedState && selectedCity && selectedSupplier &&
    selectedState.trim() && selectedCity.trim() && selectedSupplier.trim()
  ) {
    textualQuery = `${selectedCity}, ${selectedState}, ${selectedSupplier}`;
    overlayLabel = textualQuery;
  } else if (
    selectedState && selectedCity &&
    selectedState.trim() && selectedCity.trim()
  ) {
    textualQuery = `${selectedCity}, ${selectedState}`;
    overlayLabel = textualQuery;
  } else if (
    query && query.trim().length > 0 &&
    query.trim().toLowerCase() !== 'current location'
  ) {
    textualQuery = query.trim();
    overlayLabel = textualQuery;
  } else if (local && local.trim().length > 0) {
    textualQuery = local.trim();
    overlayLabel = textualQuery;
  } else if (effectiveLat != null && effectiveLng != null) {
    if (isReverseGeocoding) {
      textualQuery = 'Getting location...';
      overlayLabel = textualQuery;
    } else {
      textualQuery = 'Current Location';
      overlayLabel = textualQuery;
    }
  }

  // If using current location, append supplier to the query if present
  const coordsAvailable = (effectiveLat != null && effectiveLng != null);
  let locationQuery = '';
  if (!textualQuery && coordsAvailable) {
    locationQuery = `${effectiveLat},${effectiveLng}`;
    if (selectedSupplier) {
      locationQuery += `, ${selectedSupplier}`;
    }
  }

  // Prefer selectedState/city/supplier for plotting if provided
  let mapQuery = '';
  if (
    selectedState && selectedCity && selectedSupplier &&
    selectedState.trim() && selectedCity.trim() && selectedSupplier.trim()
  ) {
    mapQuery = `${selectedSupplier} petrol bunk within ${effectiveRadius} km of ${selectedCity}, ${selectedState}`;
  } else if (
    selectedState && selectedCity &&
    selectedState.trim() && selectedCity.trim()
  ) {
    mapQuery = `petrol bunk within ${effectiveRadius} km of ${selectedCity}, ${selectedState}`;
  } else if (
    query && query.trim().length > 0 &&
    query.trim().toLowerCase() !== 'current location'
  ) {
    mapQuery = `petrol bunk within ${effectiveRadius} km of ${query.trim()}`;
  } else if (effectiveLat != null && effectiveLng != null) {
    if (selectedSupplier && selectedSupplier.trim()) {
      mapQuery = `${selectedSupplier} petrol bunk within ${effectiveRadius} km of ${effectiveLat},${effectiveLng}`;
    } else {
      mapQuery = `petrol bunk within ${effectiveRadius} km of ${effectiveLat},${effectiveLng}`;
    }
  } else if (local && local.trim().length > 0) {
    mapQuery = `petrol bunk within ${effectiveRadius} km of ${local.trim()}`;
  } else {
    mapQuery = 'petrol bunk';
  }

  const centerParam = (effectiveLat && effectiveLng) ? `&center=${effectiveLat},${effectiveLng}` : '';
  const src = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${zoom}&output=embed${centerParam}`
  const navigate = useNavigate()

  // Default item to send to the details page when the map (marker) is clicked.
  // Keep this simple for the prototype: use the textual query or coords if available.
  const defaultItem = {
    id: 'sample-default',
    title: 'Sample Station',
    image: '/details.png',
    road: 'Main Road',
    city: textualQuery || 'Nearby area',
    lat: effectiveLat ?? lat ?? 0,
    lng: effectiveLng ?? lng ?? 0,
    distance: '—',
  }

  function openDetails() {
    // Use the onStallClick callback if provided, otherwise fallback to original behavior
    if (onStallClick) {
      onStallClick(1); // Default to stall ID 1
    } else {
      // Original fallback behavior
      navigate('/details', { state: { item: defaultItem } })
    }
  }

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {/* Location display overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
        {overlayLabel && (
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-3 shadow-elevated border border-border pointer-events-auto">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground text-sm">{overlayLabel}</span>
            </div>
          </div>
        )}
      </div>

      {/* If we don't have the user's location yet, show a prompt to enable location services. */}
      {!pos ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto z-10 bg-card/95 backdrop-blur-sm p-6 rounded-3xl shadow-floating border border-border max-w-sm mx-4">
            <div className="mb-4 text-foreground text-center">
              This app needs your location to show nearby petrol bunks.
            </div>
            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => requestLocation()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                Allow location
              </button>
            </div>
            {permissionDenied && (
              <div className="mt-3 text-destructive text-sm text-center">
                Location access denied or unavailable — please enable location in your browser.
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Click-capturing overlay placed above the iframe so we can handle marker clicks in the prototype. */}
          <div
            className="absolute inset-0 z-5 cursor-pointer"
            role="button"
            aria-label="Open details"
            onClick={(e) => {
              e.stopPropagation()
              openDetails()
            }}
            style={{ background: 'transparent' }}
          />
          <iframe
            title="Map showing search results"
            src={src}
            loading="lazy"
            className="border-0 w-full h-full block rounded-2xl"
          />
        </>
      )}
    </div>
  )
}
