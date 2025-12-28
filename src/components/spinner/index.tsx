import React from 'react';
import styles from './styles.module.css';

const Spinner: React.FC = () => (
  <div className={styles.spinnerWrapper} role="status">
    <div className={styles.spinner}></div>
  </div>
);

export default Spinner;
