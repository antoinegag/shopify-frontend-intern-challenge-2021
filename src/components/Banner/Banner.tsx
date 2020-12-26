import React from "react";

import styles from "./Banner.module.scss";

interface InfoBoxProps {
  dismissible?: boolean;
}

const InfoBox: React.FC<InfoBoxProps> = ({ dismissible = true }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.title}>You nominated 5 movies</div>
            <div>this is some random text</div>
          </div>
          <div className={styles.close}>Close</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
