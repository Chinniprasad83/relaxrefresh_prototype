import React from 'react';
import styles from './Overlay.module.css';

interface OverlayProps {
    children: React.ReactNode;
    onClose?: (content?: string) => void;
}

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
    const [query, setQuery] = React.useState('');

    // Close overlay when clicking outside content
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && onClose) {
            onClose(query);
        }
    };

    // Close overlay when focus leaves the overlay
    const overlayRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const handleFocusOut = (e: FocusEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(e.relatedTarget as Node) && onClose) {
                onClose(query);
            }
        };
        const node = overlayRef.current;
        if (node) {
            node.addEventListener('focusout', handleFocusOut);
        }
        return () => {
            if (node) {
                node.removeEventListener('focusout', handleFocusOut);
            }
        };
    }, [onClose]);

    return (
        <div className={styles.overlay} onClick={handleOverlayClick} tabIndex={-1} ref={overlayRef}>
            <div className={styles.content}>
                <div className={styles.headerRow}>
                  <div className={styles.header}>Do you have any questions?</div>
                  {onClose && (
                    <button className={styles.close} onClick={() => onClose(query)}>
                      ×
                    </button>
                  )}
                </div>
                <div>
                    <form className={styles.queryForm} onSubmit={e => { e.preventDefault(); if (onClose) onClose(query); }}>
                        <textarea
                            id="userQuery"
                            name="userQuery"
                            className={styles.queryTextarea}
                            placeholder="Type your queries here"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button
                            id="submitQueryBtn"
                            name="submitQueryBtn"
                            type="submit"
                            className={styles.submitButton}
                        >
                            Post Query
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
