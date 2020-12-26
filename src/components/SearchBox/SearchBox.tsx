import React from "react";

import styles from "./SearchBox.module.scss";
interface SearchBoxProps {
  onQueryChange?: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onQueryChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Search by Title</div>
      <input
        className={styles.searchbar}
        placeholder="The Empire Strikes Back, The Matrix..."
        onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
        type="text"
      />
    </div>
  );
};

export default SearchBox;
