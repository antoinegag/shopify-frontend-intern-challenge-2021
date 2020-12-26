import React from "react";
import { OMDBMovieSearchResult } from "../../api/OMDBClient";
import styles from "./MovieCard.module.scss";
import UnknowPoster from "./UnknownPoster.svg";
import classNames from "classnames";
import XButton from "../XButton";

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
          <div>
            <div className={styles.title}>{Title}</div>
            <div>{Year}</div>
            {nominated && (
              <div className={styles.nominated}>
                <div>Nominated</div>
                {onRemoveNomination && (
                  <XButton
                    onClick={() =>
                      onRemoveNomination({ Title, Year, imdbID, Type, Poster })
                    }
                  />
                )}
              </div>
            )}
          </div>
          <div className={styles.controls}>
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
