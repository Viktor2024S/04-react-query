import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import { type Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (query === "") {
      return;
    }

    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setMovies([]);
        const data = await fetchMovies(query);

        if (data.length === 0) {
          toast.error("No movies found for your request.");
        }
        setMovies(data);
      } catch (err: unknown) {
        let errorMessage = "An unknown error occurred.";

        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}{" "}
      {movies.length > 0 && !isLoading && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
