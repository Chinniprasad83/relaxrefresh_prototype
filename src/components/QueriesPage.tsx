import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

import styles from "./QueriesPage.module.css";


const QueriesPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.main}>
        <h2 className={styles.title}>Queries Page</h2>
        <p className={styles.subtitle}>Page under development</p>
      </main>
      <BottomNav />
    </div>
  );
};

export default QueriesPage;
