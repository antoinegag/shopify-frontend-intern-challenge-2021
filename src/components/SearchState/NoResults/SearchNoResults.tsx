import React from "react";
import illustration from "./illustration.svg";
import styles from "./NoResults.module.scss";

const SearchBlankState = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hint}>
        No results for your search, try being more specific!
      </div>
      <img
        src={illustration}
        alt="Person in the wood looking through binoculars"
      />
    </div>
  );
};

export default SearchBlankState;
