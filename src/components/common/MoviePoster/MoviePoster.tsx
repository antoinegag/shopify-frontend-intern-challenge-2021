import React from "react";
import classNames from "classnames";
import styles from "./MoviePoster.module.scss";
import UnknowPoster from "./UnknownPoster.svg";

interface PosterProps {
  src?: string;
  size?: "md" | "sm";
}

const MoviePoster: React.FC<PosterProps> = ({ src, size }) => {
  const sizeClass = size === "sm" ? styles.small : styles.medium;

  return (
    <div>
      {!src || src === "N/A" ? (
        <div className={classNames(styles.unknown_poster, sizeClass)}>
          <img src={UnknowPoster} alt="Question mark" />
        </div>
      ) : (
        <img
          src={src}
          className={classNames(styles.poster, sizeClass)}
          alt="Movie poster"
        />
      )}
    </div>
  );
};

export default MoviePoster;
