import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import debounce from "lodash.debounce";
import "./style/common.scss";
import styles from "./App.module.scss";
import Banner from "./components/Banner/Banner";
import { OMDBMovieSearchResult, search, SearchResult } from "./api/OMDBClient";
import MovieCard from "./components/MovieCard";
import NominatedMovieEntry from "./components/NominatedMovieEntry";
import Pager from "./components/Pager";

function App() {
  const [results, setResults] = useState<SearchResult>();
  const [nominated, setNominated] = useState<OMDBMovieSearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function searchMovies() {
      try {
        const searchResults = await search({
          title: query,
          type: "movie",
          page: page,
        });

        setResults(searchResults);
      } catch (error) {}
    }

    searchMovies();
  }, [query, page]);

  const handleQueryChange = async (query: string) => {
    setPage(1);
    setQuery(query);
  };

  // TODO: Extract that logic to a hook or context
  const handleNominate = (movie: OMDBMovieSearchResult) => {
    if (
      nominated.length >= 5 || // Finished
      nominated.find((m) => m.imdbID === movie.imdbID) // Already nominated
    ) {
      return;
    }

    setNominated([...nominated, movie]);
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
      {nominated.length === 5 && <Banner />}
      <div className={styles.body}>
        <main>
          <div className={styles.searchbox_container}>
            <SearchBox onQueryChange={debounce(handleQueryChange, 400)} />
            {results?.Response === "True" && (
              <Pager
                currentPage={page}
                onPrevious={() => {
                  setPage(page - 1);
                  window.scrollTo(0, 0);
                }}
                onNext={() => {
                  setPage(page + 1);
                  window.scrollTo(0, 0);
                }}
                pageCount={parseInt(results.totalResults) / 10}
              />
            )}
          </div>
          {results?.Response === "True" && (
            <div>
              <div>
                {results.Search.map((movie) => (
                  <MovieCard
                    {...movie}
                    onNominate={handleNominate}
                    onRemoveNomination={handleRemoveNomination}
                    nominated={
                      nominated.findIndex((m) => m.imdbID === movie.imdbID) !==
                      -1
                    }
                  />
                ))}
              </div>
              <Pager
                currentPage={page}
                onPrevious={() => {
                  setPage(page - 1);
                  window.scrollTo(0, 0);
                }}
                onNext={() => {
                  setPage(page + 1);
                  window.scrollTo(0, 0);
                }}
                pageCount={parseInt(results.totalResults) / 10}
              />
            </div>
          )}
        </main>
        <aside>
          <h1>Nominations</h1>
          {nominated.map((movie) => (
            <NominatedMovieEntry
              {...movie}
              onRemoveNomination={handleRemoveNomination}
            />
          ))}
          {/* <div>Start nominating movies and they'll show up here!</div> */}
          {/* https://www.drawkit.io/ */}
        </aside>
      </div>
    </div>
  );
}

export default App;
