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
      {results.map((movie) => (
        <MovieCard
          {...movie}
          onNominate={onNominate}
          onRemoveNomination={onRemoveNomination}
          nominated={
            nominated &&
            nominated.findIndex((m) => m.imdbID === movie.imdbID) !== -1
          }
        />
      ))}
    </div>
  );
};

export default MovieResults;
