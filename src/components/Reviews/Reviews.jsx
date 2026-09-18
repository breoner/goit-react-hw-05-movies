import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(setReviews)
      .catch(console.error);
  }, [movieId]);

  if (!reviews.length) return <p>We don't have any reviews for this movie.</p>;

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h4>Author: {review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}