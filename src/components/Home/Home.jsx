import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../api";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}