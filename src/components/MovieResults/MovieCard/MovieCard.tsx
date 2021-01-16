import React from "react";
import { OMDBMovieSearchResult } from "../../../api/OMDBClient";
import IconClose from "../../../icons/IconClose";
import styles from "./MovieCard.module.scss";
import MoviePoster from "../../common/MoviePoster/MoviePoster";

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
  const movie: OMDBMovieSearchResult = { Title, Year, imdbID, Type, Poster };

  return (
    <div className={styles.container}>
      <MoviePoster src={Poster} />
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
                    onClick={() => onRemoveNomination(movie)}
                  >
                    <IconClose color="light" />
                  </div>
                )}
              </div>
            )}
            {!nominated && (
              <button
                className={styles.nominate}
                onClick={() => onNominate?.(movie)}
                disabled={onNominate === undefined}
              >
                Nominate
              </button>
            )}
          </div>
        </div>
        <div>
          <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
            IMDB
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
