import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import debounce from "lodash.debounce";
import "./style/common.scss";
import styles from "./App.module.scss";
import DoneNotice from "./components/DoneNotice/DoneNotice";
import {
  OMDBMovieSearchResult,
  searchOMDB,
  SearchResult,
} from "./api/OMDBClient";
import NominatedMovieEntry from "./components/NominatedMovieEntry";
import Pager from "./components/common/Pager";
import SearchBlankState from "./components/SearchState/Blank";
import SearchNoResultsState from "./components/SearchState/NoResults";
import NominationBlankState from "./components/NominationsBlankState";
import MovieResults from "./components/MovieResults";
import SearchError from "./components/SearchState/SearchError";

function App() {
  const [results, setResults] = useState<SearchResult | undefined>();
  const [nominated, setNominated] = useState<OMDBMovieSearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function searchMovies() {
      try {
        const searchResults = await searchOMDB({
          title: query,
          type: "movie",
          page: currentPage,
        });

        setResults(searchResults);
      } catch (error) {
        setError(error);
      }
    }

    searchMovies();
  }, [query, currentPage]);

  const handleQueryChange = async (query: string) => {
    setCurrentPage(1);
    setQuery(query);
    setError(undefined);
  };

  const handleNominate = (movie: OMDBMovieSearchResult) => {
    if (
      nominated.length >= 5 || // Finished
      nominated.find((m) => m.imdbID === movie.imdbID) // Already nominated
    ) {
      return;
    }

    const newNominated = [...nominated, movie];
    setNominated(newNominated);

    if (newNominated.length === 5) {
      setQuery("");
      setResults(undefined);
    }
  };

  const handleRemoveNomination = (movie: OMDBMovieSearchResult) => {
    const index = nominated.findIndex((m) => m.imdbID === movie.imdbID);

    if (index !== -1) {
      let updated = [...nominated];
      updated.splice(index, 1);
      setNominated(updated);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <main>
          {nominated.length < 5 ? (
            <>
              <div className={styles.searchbox_container}>
                <SearchInput onQueryChange={debounce(handleQueryChange, 600)} />
                {query === "" && <SearchBlankState />}
              </div>
              {error && <SearchError error={error} />}
              {results?.Response === "True" ? (
                <>
                  <MovieResults
                    results={results.Search}
                    onNominate={handleNominate}
                    onRemoveNomination={handleRemoveNomination}
                    nominated={nominated}
                  />
                  <Pager
                    currentPage={currentPage}
                    onPrevious={() => {
                      setCurrentPage(currentPage - 1);
                      window.scrollTo(0, 0);
                    }}
                    onNext={() => {
                      setCurrentPage(currentPage + 1);
                      window.scrollTo(0, 0);
                    }}
                    pageCount={Math.ceil(parseInt(results.totalResults) / 10)}
                  />
                </>
              ) : (
                !error &&
                query !== "" &&
                results?.Response === "False" && <SearchNoResultsState />
              )}
            </>
          ) : (
            <DoneNotice />
          )}
        </main>
        <aside>
          <h1>Nominations</h1>
          {nominated.length > 0 ? (
            <div className={styles.nominated}>
              {nominated.map((movie) => (
                <NominatedMovieEntry
                  {...movie}
                  onRemoveNomination={handleRemoveNomination}
                />
              ))}
            </div>
          ) : (
            <NominationBlankState />
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
