import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast, getPosterUrl, isRequestCanceled } from '../../api';
import styles from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setCast([]);
    setError('');
    setLoading(true);
    fetchMovieCast(movieId, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setCast(result);
      })
      .catch((err) => {
        if (!isRequestCanceled(err) && !controller.signal.aborted)
          setError('Не вдалося завантажити акторський склад.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [movieId]);

  if (loading) return <p role="status">Завантаження акторів…</p>;
  if (error)
    return (
      <p role="alert" className={styles.error}>
        {error}
      </p>
    );
  if (!cast.length) return <p>Інформація про акторів відсутня.</p>;

  return (
    <ul className={styles.grid}>
      {cast.map((actor) => (
        <li className={styles.card} key={actor.credit_id || actor.id}>
          {actor.profile_path ? (
            <img
              className={styles.photo}
              src={getPosterUrl(actor.profile_path, 'w185')}
              alt={actor.name}
              loading="lazy"
            />
          ) : (
            <div className={styles.placeholder}>Немає фото</div>
          )}
          <strong>{actor.name}</strong>
          <span>Роль: {actor.character || 'Не вказана'}</span>
        </li>
      ))}
    </ul>
  );
}
