import React from "react";

import styles from "./Pager.module.scss";

interface PagerProps {
  currentPage: number;
  pageCount: number;
  onPrevious?: () => void;
  onNext?: () => void;
  wrapAround?: boolean;
}

const Pager: React.FC<PagerProps> = ({
  currentPage,
  pageCount,
  onNext,
  onPrevious,
  wrapAround = false,
}) => {
  return (
    <div className={styles.container}>
      <button onClick={onPrevious} disabled={currentPage === 1}>
        Prev
      </button>
      <div className={styles.page_number}>
        <span className={styles.current}>{currentPage}</span>
        <span className={styles.count}>/{pageCount}</span>
      </div>
      <button onClick={onNext} disabled={currentPage === pageCount}>
        Next
      </button>
    </div>
  );
};

export default Pager;
