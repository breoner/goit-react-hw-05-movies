import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.themoviedb.org/3', timeout: 12000 });
// Public browser-side TMDB v3 key; set VITE_TMDB_API_KEY to override the existing project key.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'bf8e9f8e5c8a5169fe90fb62e5ab9c2d';

async function get(path, params = {}, signal) {
  if (!API_KEY) throw new Error('TMDB API key is missing. Add VITE_TMDB_API_KEY to .env');
  const { data } = await api.get(path, {
    params: { api_key: API_KEY, ...params },
    signal,
  });
  return data;
}

export async function fetchTrendingMovies(signal) {
  return (await get('/trending/movie/day', {}, signal)).results;
}

export async function searchMovies(query, signal) {
  return (await get('/search/movie', { query }, signal)).results;
}

export function fetchMovieDetails(movieId, signal) {
  return get(`/movie/${encodeURIComponent(movieId)}`, {}, signal);
}

export async function fetchMovieCast(movieId, signal) {
  return (await get(`/movie/${encodeURIComponent(movieId)}/credits`, {}, signal)).cast;
}

export async function fetchMovieReviews(movieId, signal) {
  return (await get(`/movie/${encodeURIComponent(movieId)}/reviews`, {}, signal)).results;
}

export function getPosterUrl(path, size = 'w500') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}

export function isRequestCanceled(error) {
  return error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError';
}
