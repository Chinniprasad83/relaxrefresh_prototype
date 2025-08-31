import { IndividualDetailsCardPagination } from './IndividualDetailsCardPagination';
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
  const [selected, setSelected] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState<any>(null);

  const handleHeartClick = () => {
    setSelected(!selected);
    if (!selected) {
      setSelectedRecord({ title, address, imageSrc, description, highlights, vehiclesPerDay, revenue });
    } else {
      setSelectedRecord(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleText}>{title}</div>
        <div className={styles.titleHeart}>
          <span
            className={selected ? styles.heartSelected : styles.heartUnselected}
            onClick={handleHeartClick}
            aria-label={selected ? 'Unselect favorite' : 'Select favorite'}
          >
            {selected ? '❤️' : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ verticalAlign: 'middle' }}
              >
                <path
                  d="M12 21s-6.5-5.05-8.5-8.05C1.5 9.5 3.5 6 7 6c1.54 0 3.04.99 4 2.44C12.96 6.99 14.46 6 16 6c3.5 0 5.5 3.5 3.5 6.95C18.5 15.95 12 21 12 21z"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </span>
        </div>
      </div>
      <div className={styles.address}>{address}</div>
      {/* Carousel for images */}
      <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true} interval={2000}>
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


      <div className={styles.cardPaginationWrapper}>
        <IndividualDetailsCardPagination />
      </div>
      <div>
        <form className={styles.queryForm}>
          <textarea
            id="userQuery"
            name="userQuery"
            className={styles.queryTextarea}
            placeholder="Submit your queries  here"
          />
          <button
            id="submitQueryBtn"
            name="submitQueryBtn"
            type="submit"
            className={styles.submitButton}
          >
            Submit
          </button>
        </form>

      </div>


    </div>
  );
};

export default IndividualDetailsPage;
