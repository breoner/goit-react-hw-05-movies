import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .catch(console.error);
  }, [movieId]);

  if (!cast.length) return <p>No cast info available.</p>;

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id}>
          <p><b>{actor.name}</b> as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}