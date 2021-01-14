import React from "react";
import illustration from "./illustration.svg";
import styles from "./SearchBlankState.module.scss";

const SearchBlankState = () => {
  return (
    <div className={styles.container}>
      <img
        src={illustration}
        alt="Person in the wood looking through binoculars"
      />
    </div>
  );
};

export default SearchBlankState;
