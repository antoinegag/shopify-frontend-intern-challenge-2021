import React from "react";

import styles from "./DoneNotice.module.scss";
import done from "./done.svg";

interface DoneNotice {}

const DoneNotice: React.FC<DoneNotice> = () => {
  return (
    <div>
      <div className={styles.container}>
        <div>
          <h1>You nominated 5 movies!</h1>
          <h2>Talk about great tastes.</h2>
          <div>
            However... if you want to modify your list, you'll have to remove
            some entries.
          </div>
          <img src={done} />
        </div>
      </div>
    </div>
  );
};

export default DoneNotice;
