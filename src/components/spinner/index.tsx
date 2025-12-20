import React from 'react';
import styles from './styles.module.css';

const Spinner: React.FC = () => (
  <div className={styles.spinnerWrapper}>
    <div className={styles.spinner}></div>
  </div>
);

export default Spinner;
