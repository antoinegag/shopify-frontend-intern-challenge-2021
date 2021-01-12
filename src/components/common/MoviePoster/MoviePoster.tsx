import React from "react";
import styles from "./MoviePoster.module.scss";
import UnknowPoster from "./UnknownPoster.svg";

interface PosterProps {
  src?: string;
}

const MoviePoster: React.FC<PosterProps> = ({ src }) => {
  return (
    <div>
      {!src || src === "N/A" ? (
        <div className={styles.unknown_poster}>
          <img src={UnknowPoster} alt="Question mark" />
        </div>
      ) : (
        <img src={src} className={styles.poster} alt="Movie poster" />
      )}
    </div>
  );
};

export default MoviePoster;
