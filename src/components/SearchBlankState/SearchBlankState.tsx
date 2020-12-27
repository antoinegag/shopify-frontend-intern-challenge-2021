import React from "react";

import illustration from "./illustration.svg";
import styles from "./SearchBlankState.module.scss";

const hints = [
  "That one movie you rewatched 10 times",
  "What's the name of that movie again? With the guy...",
  "That one movie that was better than the book",
  "A Keanu Reeves movie, perhaps?",
  "That one movie you recommend to everyone",
  "Something more original than Wolf of Wall Street",
];

const SearchBlankState = () => {
  const randomHint = Math.floor(Math.random() * hints.length);
  return (
    <div className={styles.container}>
      <div className={styles.hint}>{hints[randomHint]}</div>
      <img src={illustration} />
    </div>
  );
};

export default SearchBlankState;
