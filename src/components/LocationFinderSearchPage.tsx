import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./LocationFinderSearchPage.module.css";
import Header from "./Header";
import BottomNav from "./BottomNav";
import StallLocationSearch from './StallLocationSearch';


const LocationFinderSearchPage: React.FC = () => {
  // Initialize from sessionStorage so values persist across navigation
  const [selectedState, setSelectedState] = useState<string>(() => {
    try {
      return sessionStorage.getItem('selectedState') || '';
    } catch {
      return '';
    }
  });
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    try {
      return sessionStorage.getItem('selectedCity') || '';
    } catch {
      return '';
    }
  });
  const [selectedSupplier, setSelectedSupplier] = useState<string>(() => {
    try {
      return sessionStorage.getItem('selectedSupplier') || '';
    } catch {
      return '';
    }
  });
  const navigate = useNavigate();

  // Sync state from sessionStorage on mount (for back navigation)
  React.useEffect(() => {
    setSelectedState(sessionStorage.getItem('selectedState') || '');
    setSelectedCity(sessionStorage.getItem('selectedCity') || '');
    setSelectedSupplier(sessionStorage.getItem('selectedSupplier') || '');
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Header title="Stall Finder"/>
      <main className={styles.main}>
        <section className={styles.controls} aria-label="Search controls">
          <StallLocationSearch
            onLocationSelect={({ state, city, supplier }) => {
              setSelectedState(state);
              setSelectedCity(city);
              setSelectedSupplier(supplier);
              // Store in sessionStorage for persistence
              try {
                sessionStorage.setItem('selectedState', state);
                sessionStorage.setItem('selectedCity', city);
                sessionStorage.setItem('selectedSupplier', supplier);
              } catch {}
              // Navigate to LocationFinderPage with state
              navigate('/locationfinder', {
                state: { state, city, supplier }
              });
            }}
            onCurrentLocationToggle={(useCurrent) => {
              if (useCurrent) {
                setSelectedState('');
                setSelectedCity('');
                setSelectedSupplier('');
                try {
                  sessionStorage.removeItem('selectedState');
                  sessionStorage.removeItem('selectedCity');
                  sessionStorage.removeItem('selectedSupplier');
                } catch {}
              }
            }}
          />
        </section>
        {/* You can add more UI here if needed */}
      </main>
      <BottomNav />
    </div>
  );
};

export default LocationFinderSearchPage;
