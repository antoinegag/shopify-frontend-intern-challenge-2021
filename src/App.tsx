import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import debounce from "lodash.debounce";
import "./style/common.scss";
import styles from "./App.module.scss";
import DoneNotice from "./components/DoneNotice/DoneNotice";
import { OMDBMovieSearchResult, search, SearchResult } from "./api/OMDBClient";
import MovieCard from "./components/MovieCard";
import NominatedMovieEntry from "./components/NominatedMovieEntry";
import Pager from "./components/Pager";
import SearchBlankState from "./components/SearchBlankState";
import NominationBlankState from "./components/NominationsBlankState";

function App() {
  const [results, setResults] = useState<SearchResult | undefined>();
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
          <SearchBox onQueryChange={debounce(handleQueryChange, 400)} />
          {query === "" && <SearchBlankState />}
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
              pageCount={Math.ceil(parseInt(results.totalResults) / 10)}
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
                    nominated.findIndex((m) => m.imdbID === movie.imdbID) !== -1
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
              pageCount={Math.ceil(parseInt(results.totalResults) / 10)}
            />
          </div>
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
        </aside>
      </div>
    </div>
  );
}

export default App;
