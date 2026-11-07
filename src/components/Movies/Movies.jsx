import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { isRequestCanceled, searchMovies } from '../../api';
import MovieList from '../MovieList/MovieList';
import styles from './Movies.module.css';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').trim();
  const [input, setInput] = useState(query);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    setInput(query);
  }, [query]);
  useEffect(() => {
    const controller = new AbortController();
    setMovies([]);
    setError('');
    setLoading(Boolean(query));
    if (!query) return () => controller.abort();
    searchMovies(query, controller.signal)
      .then((results) => {
        if (!controller.signal.aborted) setMovies(results);
      })
      .catch((err) => {
        if (!isRequestCanceled(err) && !controller.signal.aborted)
          setError('Помилка пошуку. Спробуйте ще раз.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();
    const next = input.trim();
    if (next) setSearchParams({ query: next });
    else setSearchParams({});
  }

  return (
    <section className={styles.section}>
      <h1>Пошук фільмів</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="search-movie">
          Назва фільму
        </label>
        <input
          id="search-movie"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введіть назву…"
        />
        <button className={styles.button} type="submit">
          Знайти
        </button>
      </form>
      {loading && <p role="status">Пошук…</p>}
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {!loading &&
        !error &&
        query &&
        (movies.length ? (
          <MovieList movies={movies} from={location} />
        ) : (
          <p>За запитом нічого не знайдено.</p>
        ))}
    </section>
  );
}
