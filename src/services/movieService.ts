import axios from "axios";
import { type Movie } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });
  return response.data.results;
};
