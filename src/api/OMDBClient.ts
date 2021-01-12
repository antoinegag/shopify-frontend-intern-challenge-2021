const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export interface OMDBMovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OMDBSearchResultSuccess {
  Search: OMDBMovieSearchResult[];
  totalResults: string;
  Response: "True";
}

interface OMDBSearchResultError {
  Response: "False";
  Error: string;
}

export interface OMDBMovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OMDBSearchResultSuccess {
  Search: OMDBMovieSearchResult[];
  totalResults: string;
  Response: "True";
}

interface OMDBSearchResultError {
  Response: "False";
  Error: string;
}

export type SearchResult = OMDBSearchResultError | OMDBSearchResultSuccess;

interface SearchParameters {
  title: string; // s
  type?: "movie" | "series" | "episode"; // type
  year?: number; // y
  page?: number; // p
}

function buildSearchQuery({ title, type, year, page }: SearchParameters) {
  let queryString = `http://omdbapi.com/?apikey=${API_KEY}&s=${title}`;

  if (type) {
    queryString += `&type=${type}`;
  }

  if (year) {
    queryString += `&y=${year}`;
  }

  if (page) {
    queryString += `&page=${page}`;
  }

  return queryString;
}

export async function searchOMDB(params: SearchParameters) {
  try {
    const res = await fetch(buildSearchQuery(params));

    if (res.ok) {
      const result = await res.json();

      return result as SearchResult;
    } else {
      throw new Error(`Status: ${res.status}: ${res.statusText}`);
    }
  } catch (error) {
    console.error(error);

    throw new Error(
      `Error searching for ${params.title} with params: ${JSON.stringify(
        params
      )}: ${error}`
    );
  }
}
