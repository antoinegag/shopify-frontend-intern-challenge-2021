import React from "react";

import styles from "./Banner.module.scss";

interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.title}>You nominated 5 movies</div>
            <div>this is some random text</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
