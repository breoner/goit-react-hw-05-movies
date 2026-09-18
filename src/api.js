import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'bf8e9f8e5c8a5169fe90fb62e5ab9c2d'; 


export async function fetchTrendingMovies() {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.data.cast;
}

export async function fetchMovieReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
  return response.data.results;
}