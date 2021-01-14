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
import MovieCard from "./components/MovieCard";
import NominatedMovieEntry from "./components/NominatedMovieEntry";
import Pager from "./components/common/Pager";
import SearchBlankState from "./components/SearchState/Blank";
import SearchNoResultsState from "./components/SearchState/NoResults";
import NominationBlankState from "./components/NominationsBlankState";

function App() {
  const [results, setResults] = useState<SearchResult | undefined>();
  const [nominated, setNominated] = useState<OMDBMovieSearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function searchMovies() {
      try {
        const searchResults = await searchOMDB({
          title: query,
          type: "movie",
          page: currentPage,
        });

        setResults(searchResults);
      } catch (error) {}
    }

    searchMovies();
  }, [query, currentPage]);

  const handleQueryChange = async (query: string) => {
    setCurrentPage(1);
    setQuery(query);
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

  const renderSearch = () => {
    return (
      <>
        <div className={styles.searchbox_container}>
          <SearchInput onQueryChange={debounce(handleQueryChange, 600)} />
          {query === "" && <SearchBlankState />}
        </div>
        {results?.Response === "True" ? (
          <div>
            <div className={styles.results}>
              {results.Search.map((movie) => (
                <MovieCard
                  {...movie}
                  onNominate={handleNominate}
                  onRemoveNomination={handleRemoveNomination}
                  nominated={
                    nominated.findIndex((m) => m.imdbID === movie.imdbID) !== -1
                  }
                />
              ))}
            </div>
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
          </div>
        ) : (
          query !== "" &&
          results?.Response === "False" && <SearchNoResultsState />
        )}
      </>
    );
  };

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <main>{nominated.length < 5 ? renderSearch() : <DoneNotice />}</main>
        <aside>
          <h1>Nominations</h1>
          <div className={styles.nominated}>
            {nominated.length > 0 ? (
              nominated.map((movie) => (
                <NominatedMovieEntry
                  {...movie}
                  onRemoveNomination={handleRemoveNomination}
                />
              ))
            ) : (
              <NominationBlankState />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
