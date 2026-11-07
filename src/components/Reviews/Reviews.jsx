import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews, isRequestCanceled } from '../../api';
import styles from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setReviews([]);
    setError('');
    setLoading(true);
    fetchMovieReviews(movieId, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setReviews(result);
      })
      .catch((err) => {
        if (!isRequestCanceled(err) && !controller.signal.aborted)
          setError('Не вдалося завантажити відгуки.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [movieId]);

  if (loading) return <p role="status">Завантаження відгуків…</p>;
  if (error)
    return (
      <p role="alert" className={styles.error}>
        {error}
      </p>
    );
  if (!reviews.length) return <p>Відгуків про цей фільм немає.</p>;

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li className={styles.review} key={review.id}>
          <h3>Автор: {review.author}</h3>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
