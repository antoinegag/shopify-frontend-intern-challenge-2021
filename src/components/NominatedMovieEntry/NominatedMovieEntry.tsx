import React from "react";
import { OMDBMovieSearchResult } from "../../api/OMDBClient";
import IconClose from "../../icons/IconClose";
import styles from "./NominatedMovieEntry.module.scss";
import UnknowPoster from "./UnknownPoster.svg";

interface MovieCardProps extends OMDBMovieSearchResult {
  onRemoveNomination?: (movie: OMDBMovieSearchResult) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  Title,
  Year,
  imdbID,
  Type,
  Poster,
  onRemoveNomination,
}) => {
  return (
    <div className={styles.container}>
      {Poster === "N/A" ? (
        <div className={styles.unknown_poster}>
          <img src={UnknowPoster} />
        </div>
      ) : (
        <img
          src={Poster === "N/A" ? UnknowPoster : Poster}
          className={styles.poster}
        />
      )}
      <div className={styles.info}>
        <div>
          <div className={styles.title}>{Title}</div>
          <div>{Year}</div>
        </div>
      </div>
      <div className={styles.controls}>
        {onRemoveNomination && (
          <div
            onClick={() =>
              onRemoveNomination({ Title, Year, imdbID, Type, Poster })
            }
            className={styles.remove_icon}
          >
            <IconClose color="dark" size="md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
