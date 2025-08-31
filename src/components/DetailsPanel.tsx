import React from 'react'
import styles from './DetailsPanel.module.css'

export default function DetailsPanel(): JSX.Element {
    return (
        <aside className={styles.panel} aria-label="Result details">
            <div className={styles.header}>
                <h3 className={styles.title}>HP, Thindivanam</h3>
                <button className={styles.addBtn} aria-label="Add">+</button>
            </div>

            <div className={styles.mediaRow}>
                <img src="/details.png" alt="HP, Thindivanam" className={styles.image} />
                <div className={styles.meta}>
                    <p><span className={styles.metaLabel}>Road:</span><strong>GST road ,NH45</strong></p>
                    <p><span className={styles.metaLabel}>Location:</span><strong>Naikar Travan, THINDIVANAM</strong></p>
                    <p><span className={styles.metaLabel}>City/Town:</span><strong>Villupuram</strong></p>
                    <p><span className={styles.metaLabel}>Pincode:</span><strong>600401</strong></p>
                </div>
            </div>

            <div className={styles.mediaRow}>
                <div className={styles.info}>
                    <div className={styles.description}>
                        On key national highways connecting Chennai with southern and western Tamil Nadu, as well as Bengaluru,
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.spaceLabel}>Available Space: <strong>3000 sqft</strong></div>
                        <button className={styles.detailsBtn}>Details</button>
                    </div>
                </div>
            </div>


            <div className={styles.attractions}>Nearby attractions</div>
            <div className={styles.iconsRow}>
                <div className={styles.iconItem}><img src="/hotel.png" alt="hotel" className={styles.iconImg} /> <strong>3</strong></div>
                <div className={styles.iconItem}><img src="/coffee.png" alt="coffee" className={styles.iconImg} /> <strong>1</strong></div>
                <div className={styles.iconItem}><img src="/hospital.png" alt="hospital" className={styles.iconImg} /> <strong>3</strong></div>
            </div>
        </aside>
    )
}
