import React from "react";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <div>The</div>
        <span>Shoppies</span>
      </div>
      <div className={styles.subtitle}>Movie awards for entrepreneurs</div>
    </div>
  );
};

export default Header;
