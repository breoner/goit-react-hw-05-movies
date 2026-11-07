import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTrendingMovies, isRequestCanceled } from '../../api';
import MovieList from '../MovieList/MovieList';
import styles from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    fetchTrendingMovies(controller.signal)
      .then(setMovies)
      .catch((err) => {
        if (!isRequestCanceled(err)) setError('Не вдалося завантажити фільми. Спробуйте пізніше.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Популярні фільми сьогодні</h1>
      {loading && <p role="status">Завантаження…</p>}
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {!loading && !error && <MovieList movies={movies} from={location} />}
    </section>
  );
}
