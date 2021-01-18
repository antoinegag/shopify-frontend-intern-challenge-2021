import React from "react";
import { OMDBMovieSearchResult } from "../../api/OMDBClient";
import MovieCard from "./MovieCard";
import styles from "./MovieResults.module.scss";

interface MovieResultsListProps {
  results: OMDBMovieSearchResult[];
  onNominate?: (movie: OMDBMovieSearchResult) => void;
  onRemoveNomination?: (movie: OMDBMovieSearchResult) => void;
  nominated?: OMDBMovieSearchResult[];
}

const MovieResults: React.FC<MovieResultsListProps> = ({
  results,
  onNominate,
  onRemoveNomination,
  nominated,
}) => {
  return (
    <div className={styles.results}>
      {results.map((movie) => {
        const isNominated =
          nominated &&
          nominated.findIndex((m) => m.imdbID === movie.imdbID) !== -1;
        return (
          <MovieCard
            {...movie}
            onNominate={onNominate}
            onRemoveNomination={onRemoveNomination}
            key={`${movie.imdbID}-${isNominated}`}
            nominated={isNominated}
          />
        );
      })}
    </div>
  );
};

export default MovieResults;
