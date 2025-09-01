import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StallLocationSearch.module.css';

interface StallLocationSearchProps {
    status?: boolean;
    onLocationSelect?: (location: { state: string; city: string; supplier: string }) => void;
    onCurrentLocationToggle?: (useCurrent: boolean) => void;
}

const StallLocationSearch: React.FC<StallLocationSearchProps> = ({ status, onLocationSelect, onCurrentLocationToggle }) => {
    const navigate = useNavigate();
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
   
    useEffect(() => {
        if (typeof status === 'boolean') {
            setUseCurrentLocation(status);
        }
    }, [status]);

    // Indian states
    const indianStates = [
        //"Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry", "Jammu & Kashmir", "Ladakh"
        "Tamil Nadu", "Karnataka", "Maharashtra"
    ];
    // Example cities per state
    const citiesByState = {
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"],
        "Karnataka": ["Bengaluru", "Mysuru", "Mangalore"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        // ...add more as needed
    };
    const petroleumSuppliers = ["IOCL", "HPCL", "BPCL", "Reliance", "Essar"];

    const [stateInput, setStateInput] = useState("");
    const stateInputRef = useRef<HTMLInputElement>(null);
    const [selectedState, setSelectedState] = useState("");
    const [showStateAutocomplete, setShowStateAutocomplete] = useState(false);
    const [cityInput, setCityInput] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [showCityAutocomplete, setShowCityAutocomplete] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState("");

    const filteredStates = indianStates.filter(s => s.toLowerCase().includes(stateInput.toLowerCase()));
    const filteredCities = selectedState && citiesByState[selectedState]
        ? citiesByState[selectedState].filter(c => c.toLowerCase().includes(cityInput.toLowerCase()))
        : [];

    // Only disable State and City when using current location
    const stateCityDisabled = useCurrentLocation;

    return (
        <div className={styles.stallLocationContainer}>
            {/* 1. Header 
            <div className={styles.headerRow}>
                <span className={styles.headerLabel}>Stall Location Search</span>
            </div>*/}

            {/* 2-5. Grouped location selection */}
            <div className={styles.locationGroup}>
                {/* 2. Current location toggle row */}
                <div className={styles.toggleRow}>
                    <div className={styles.toggleLabelCol}>
                        <span className={styles.toggleLabel}>Current location</span>
                    </div>
                    <div className={styles.toggleSwitchCol}>
                        <label className={styles.toggleWrapper}>
                            <input
                                type="checkbox"
                                checked={useCurrentLocation}
                                onChange={() => {
                                    const newValue = !useCurrentLocation;
                                    setUseCurrentLocation(newValue);
                                    if (onCurrentLocationToggle) {
                                        onCurrentLocationToggle(newValue);
                                    }
                                    // If disabling location (enabling current location), clear state/city
                                    if (newValue) {
                                        if (stateInput || selectedState) {
                                            setStateInput("");
                                            setSelectedState("");
                                        }
                                        if (cityInput || selectedCity) {
                                            setCityInput("");
                                            setSelectedCity("");
                                        }
                                    }
                                    // If location is disabled and state is empty but city has value, clear city
                                    if (!newValue && !stateInput && !selectedState && (cityInput || selectedCity)) {
                                        setCityInput("");
                                        setSelectedCity("");
                                    }
                                }}
                                className={styles.toggle}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                {/* 3. Centered (or) literal */}
                <div className={styles.orRow}>
                    <span className={styles.orLiteral}>(or)</span>
                </div>

                {/* 4 & 5. State and City grouped */}
                <div className={styles.stateCityGroup}>
                    <div className={styles.inputCol + ' ' + styles.stateRow}>
                        <label>State</label>
                        <input
                            type="text"
                            value={stateInput}
                            ref={stateInputRef}
                            onChange={e => {
                                const value = e.target.value;
                                setStateInput(value);
                                setSelectedState("");
                                setShowStateAutocomplete(true);
                                if (value === "") {
                                    setCityInput("");
                                    setSelectedCity("");
                                }
                            }}
                            onFocus={() => setShowStateAutocomplete(true)}
                            onBlur={() => setTimeout(() => setShowStateAutocomplete(false), 100)}
                            placeholder="Search state..."
                            autoComplete="off"
                            disabled={stateCityDisabled}
                        />
                        {stateInput && showStateAutocomplete && (
                            <div
                                className={styles.autocompleteList}
                                style={{
                                    width: stateInputRef.current ? `${stateInputRef.current.offsetWidth}px` : undefined,
                                    left: stateInputRef.current ? `${stateInputRef.current.offsetLeft}px` : undefined,
                                    top: stateInputRef.current ? `${stateInputRef.current.offsetTop + stateInputRef.current.offsetHeight}px` : undefined,
                                }}
                            >
                                {filteredStates.map(s => (
                                    <div
                                        key={s}
                                        className={styles.autocompleteItem}
                                        onMouseDown={() => {
                                            setSelectedState(s);
                                            setStateInput(s);
                                            setShowStateAutocomplete(false);
                                        }}
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.inputCol + ' ' + styles.cityRow}>
                        {/* City input ref for alignment */}
                        {/* ...existing code... */}
                        <label>City</label>
                        <input
                            type="text"
                            value={cityInput}
                            ref={stateInputRef}
                            onChange={e => {
                                setCityInput(e.target.value);
                                setSelectedCity("");
                                setShowCityAutocomplete(true);
                            }}
                            onFocus={() => setShowCityAutocomplete(true)}
                            onBlur={() => setTimeout(() => setShowCityAutocomplete(false), 100)}
                            placeholder={selectedState ? "Search city..." : "Select state first"}
                            disabled={stateCityDisabled || !selectedState}
                            autoComplete="off"
                        />
                        {cityInput && selectedState && showCityAutocomplete && (
                            <div
                                className={styles.autocompleteList}
                                style={{
                                    width: stateInputRef.current ? `${stateInputRef.current.offsetWidth}px` : undefined,
                                    left: stateInputRef.current ? `${stateInputRef.current.offsetLeft}px` : undefined,
                                    top: stateInputRef.current ? `${stateInputRef.current.offsetTop + stateInputRef.current.offsetHeight}px` : undefined,
                                }}
                            >
                                {filteredCities.map(c => (
                                    <div
                                        key={c}
                                        className={styles.autocompleteItem}
                                        onMouseDown={() => {
                                            setSelectedCity(c);
                                            setCityInput(c);
                                            setShowCityAutocomplete(false);
                                        }}
                                    >
                                        {c}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 6. Petroleum supplier dropdown */}
            <div className={styles.supplierGroup}>
                <div className={styles.supplierBox}>
                    <div className={styles.inputCol}>
                        <label className={styles.supplierLabel}>Petroleum Supplier</label>
                        <select
                            value={selectedSupplier}
                            onChange={e => setSelectedSupplier(e.target.value)}
                            className={styles.supplierSelect}
                            disabled={false}
                        >
                            <option value="">Select</option>
                            {petroleumSuppliers.map(sup => (
                                <option key={sup} value={sup}>{sup}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* 7. Centered Go button */}
            <div className={styles.goButtonRow}>
                <button
                    className={styles.goButton}
                    onClick={() => {
                        if (onLocationSelect) {
                            onLocationSelect({ state: selectedState, city: selectedCity, supplier: selectedSupplier });
                        }
                    }}
                    disabled={!selectedSupplier}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default StallLocationSearch;
