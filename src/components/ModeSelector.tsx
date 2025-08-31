import React from "react";
import styles from "./ModeSelector.module.css";

interface ModeSelectorProps {
  mapCount?: number;
  listCount?: number;
  selectedMode: "map" | "list";
  onSelect: (mode: "map" | "list") => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
  mapCount,
  listCount,
  selectedMode,
  onSelect,
}) => {
  return (
    <div className={styles.container}>
      <button
        className={
          selectedMode === "map"
            ? `${styles.button} ${styles.selected}`
            : styles.button
        }
        onClick={() => onSelect("map")}
      >
        <span className={styles.icon}>
          {/* Map Icon SVG */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C6.686 2 4 4.686 4 8c0 4.418 6 10 6 10s6-5.582 6-10c0-3.314-2.686-6-6-6zm0 8.5A2.5 2.5 0 1 1 10 5a2.5 2.5 0 0 1 0 5.5z" fill="#2D2D2D" />
          </svg>
        </span>
        <span className={styles.label}>Map</span>
        {typeof mapCount === 'number' && (
          <span className={styles.count}>{mapCount}</span>
        )}
      </button>
      <button
        className={
          selectedMode === "list"
            ? `${styles.button} ${styles.selected}`
            : styles.button
        }
        onClick={() => onSelect("list")}
      >
        <span className={styles.icon}>
          {/* List Icon SVG */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="4" y="6" width="12" height="2" rx="1" fill="#2D2D2D" />
            <rect x="4" y="10" width="12" height="2" rx="1" fill="#2D2D2D" />
          </svg>
        </span>
        <span className={styles.label}>List</span>
        {typeof listCount === 'number' && (
          <span className={styles.count}>{listCount}</span>
        )}
      </button>
    </div>
  );
};

export default ModeSelector;
