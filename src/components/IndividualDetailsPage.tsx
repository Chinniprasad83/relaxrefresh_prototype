import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './IndividualDetailsPage.module.css';

interface IndividualDetailsPageProps {
  title: string;
  address: string;
  imageSrc: string | string[];
  description: string;
  highlights: string[];
  vehiclesPerDay: number;
  revenue: number;
}

const IndividualDetailsPage: React.FC<IndividualDetailsPageProps> = ({
  title,
  address,
  imageSrc,
  description,
  highlights,
  vehiclesPerDay,
  revenue,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.address}>{address}</div>
      {/* Carousel for images */}
      <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={2000}>
        {(Array.isArray(imageSrc) ? imageSrc : [imageSrc]).map((src, idx) => (
          <div key={idx}>
            <img src={src} alt={title} className={styles.image} />
          </div>
        ))}
      </Carousel>
      <p className={styles.description}>{description}</p>
      <div className={styles.highlightsSection}>
        {highlights.map((highlight, idx) => (
          <div key={idx} className={styles.highlight}>
            <span className={styles.icon}>🏠</span>
            <span>{highlight}</span>
          </div>
        ))}
      </div>
      <div className={styles.statsSection}>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Vehicles/day</div>
          <div className={styles.statValue}>{vehiclesPerDay}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Revenue</div>
          <div className={styles.statValue}>${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDetailsPage;
