import React from "react";
import styles from "./Error.module.scss";
import illustration from "./error.svg";

interface ErrorProps {
  error?: Error;
}

const SearchError: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className={styles.container}>
      <h3>There was an error getting your movies, please try again!</h3>
      {error && <div className={styles.message}>{error.message}</div>}
      <img src={illustration} alt="Person on a laptop" />
    </div>
  );
};

export default SearchError;
