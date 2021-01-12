import React from "react";
import { OMDBMovieSearchResult } from "../../api/OMDBClient";
import styles from "./MovieCard.module.scss";
import UnknowPoster from "./UnknownPoster.svg";
import classNames from "classnames";
import IconClose from "../../icons/IconClose";

interface MovieCardProps extends OMDBMovieSearchResult {
  nominated?: boolean;
  onNominate?: (movie: OMDBMovieSearchResult) => void;
  onRemoveNomination?: (movie: OMDBMovieSearchResult) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  Title,
  Year,
  imdbID,
  Type,
  Poster,
  nominated,
  onNominate,
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
          <div className={styles.title_container}>
            <div className={styles.title}>{Title}</div>
            <div>{Year}</div>
          </div>
          <div className={styles.controls}>
            {nominated && (
              <div className={styles.nominated_badge}>
                <div>Nominated</div>
                {onRemoveNomination && (
                  <div
                    className={styles.remove_icon}
                    onClick={() =>
                      onRemoveNomination({
                        Title,
                        Year,
                        imdbID,
                        Type,
                        Poster,
                      })
                    }
                  >
                    <IconClose color="light" />
                  </div>
                )}
              </div>
            )}
            {!nominated && onNominate && (
              <button
                className={styles.nominate}
                onClick={() =>
                  onNominate({ Title, Year, imdbID, Type, Poster })
                }
              >
                Nominate
              </button>
            )}
          </div>
        </div>
        <div>
          <a href={`https://www.imdb.com/title/${imdbID}/`}>IMDB</a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
