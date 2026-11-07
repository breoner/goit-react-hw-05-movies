import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails, getPosterUrl, isRequestCanceled } from '../../api';
import styles from './MovieDetails.module.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const controller = new AbortController();
    setMovie(null);
    setError('');
    setLoading(true);
    fetchMovieDetails(movieId, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setMovie(result);
      })
      .catch((err) => {
        if (!isRequestCanceled(err) && !controller.signal.aborted)
          setError('Не вдалося отримати дані про фільм.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [movieId]);

  if (loading) return <p role="status">Завантаження інформації…</p>;
  if (error)
    return (
      <p role="alert" className={styles.error}>
        {error}
      </p>
    );
  if (!movie) return <p>Фільм не знайдено.</p>;

  const posterUrl = getPosterUrl(movie.poster_path);
  return (
    <article className={styles.article}>
      <Link className={styles.back} to={backLinkRef.current}>
        ← Повернутися
      </Link>
      <div className={styles.details}>
        {posterUrl ? (
          <img className={styles.poster} src={posterUrl} alt={`Постер: ${movie.title}`} />
        ) : (
          <div className={styles.noPoster}>Немає постера</div>
        )}
        <div>
          <h1>
            {movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
          </h1>
          <p>Оцінка користувачів: {Math.round((movie.vote_average ?? 0) * 10)}%</p>
          <h2>Опис</h2>
          <p>{movie.overview || 'Опис відсутній.'}</p>
          <h2>Жанри</h2>
          <p>{movie.genres?.map((genre) => genre.name).join(', ') || 'Не вказано'}</p>
        </div>
      </div>
      <div className={styles.additional}>
        <h2>Додаткова інформація</h2>
        <nav className={styles.subnav} aria-label="Інформація про фільм">
          <Link to="cast" state={location.state}>
            Акторський склад
          </Link>
          <Link to="reviews" state={location.state}>
            Відгуки
          </Link>
        </nav>
        <Outlet />
      </div>
    </article>
  );
}
