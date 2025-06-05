import axios from "axios";
import { type Movie } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  return response.data;
};
