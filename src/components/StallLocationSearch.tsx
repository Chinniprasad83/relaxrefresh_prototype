import React, { useState, useEffect } from 'react';
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
    // Accept onCurrentLocationToggle from props
    // Fix: destructure onCurrentLocationToggle from props
    // function StallLocationSearch({ status, onLocationSelect, onCurrentLocationToggle }: StallLocationSearchProps) { ... }
    // ...existing code...
    // Accept onLocationSelect from props
    // ...existing code...
    // Fix: destructure onLocationSelect from props
    // ...existing code...
    // The correct way:
    // function StallLocationSearch({ status, onLocationSelect }: StallLocationSearchProps) { ... }

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
            <div className={styles.headerRow}>
                <span className={styles.headerLabel}>Stall location search</span>
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
                        }}
                        className={styles.toggle}
                    />
                    <span className={styles.slider}></span>
                    <span className={styles.toggleLabel}>Current location</span>
                </label>
            </div>

            {/* Section below toggle */}
            <fieldset className={styles.sectionFieldset}>
                {/* First row: State and City search */}
                <div className={styles.inputRow}>
                    {/* State autocomplete */}
                    <div className={styles.inputCol}>
                        <label>State</label>
                        <input
                            type="text"
                            value={stateInput}
                            onChange={e => {
                                setStateInput(e.target.value);
                                setSelectedState("");
                                setShowStateAutocomplete(true);
                            }}
                            onFocus={() => setShowStateAutocomplete(true)}
                            onBlur={() => setTimeout(() => setShowStateAutocomplete(false), 100)}
                            placeholder="Search state..."
                            autoComplete="off"
                            disabled={stateCityDisabled}
                        />
                        {stateInput && showStateAutocomplete && (
                            <div className={styles.autocompleteList}>
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
                    {/* City autocomplete */}
                    <div className={styles.inputCol}>
                        <label>City</label>
                        <input
                            type="text"
                            value={cityInput}
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
                            <div className={styles.autocompleteList}>
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

                {/* Second row: Supplier dropdown and Go button */}
                <div className={styles.supplierRow}>
                    {/* Supplier dropdown */}
                    <div className={styles.supplierCol}>
                        <label>Petroleum Supplier</label>
                        <select
                            value={selectedSupplier}
                            onChange={e => setSelectedSupplier(e.target.value)}
                            className={styles.inputCol}
                            disabled={false} // Always enabled
                        >
                            <option value="">Select supplier</option>
                            {petroleumSuppliers.map(sup => (
                                <option key={sup} value={sup}>{sup}</option>
                            ))}
                        </select>
                    </div>
                    {/* Go button */}
                    <div className={styles.goButtonCol}>
                        <button
                            className={styles.goButton}
                            onClick={() => {
                                if (onLocationSelect) {
                                    onLocationSelect({ state: selectedState, city: selectedCity, supplier: selectedSupplier });
                                }
                            }}
                            disabled={!selectedSupplier} // Only require supplier for GO when current location is enabled
                        >
                            Go
                        </button>
                    </div>
                </div>
            </fieldset>
        </div>
    );
};

export default StallLocationSearch;
