import { useState, useEffect, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch(console.error);
  }, [movieId]);

  if (!movie) return <div>Завантаження...</div>;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/300x450";

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img src={posterUrl} alt={movie.title} width="250" />
        <div>
          <h2>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(", ")}</p>
        </div>
      </div>
      <hr />
      <p>Additional information</p>
      <ul>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}