const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "";

export interface OMDBMovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDBSearchResultError {
  Response: "False";
  Error: string;
}

export interface OMDBSearchResultSuccess {
  Search: OMDBMovieSearchResult[];
  totalResults: string;
  Response: "True";
}

export type SearchResult = OMDBSearchResultError | OMDBSearchResultSuccess;

interface SearchParameters {
  title: string; // s
  type?: "movie" | "series" | "episode"; // type
  year?: number; // y
  page?: number; // p
}

const BASE_API_URL = "https://omdbapi.com";

function buildSearchQuery({ title, type, year, page }: SearchParameters) {
  const url = new URL(BASE_API_URL);

  url.searchParams.set("apikey", API_KEY);
  url.searchParams.set("s", title);

  if (type) {
    url.searchParams.set("type", type);
  }

  if (year) {
    url.searchParams.set("y", year.toString());
  }

  if (page) {
    url.searchParams.set("page", page.toString());
  }

  return url.toString();
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
