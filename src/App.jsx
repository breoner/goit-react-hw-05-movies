import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const Home = lazy(() => import("./components/Home/Home"));
const Movies = lazy(() => import("./components/Movies/Movies"));
const MovieDetails = lazy(() => import("./components/MovieDetails/MovieDetails"));
const Cast = lazy(() => import("./components/Cast/Cast"));
const Reviews = lazy(() => import("./components/Reviews/Reviews"));

export const App = () => {
  return (
    <Suspense fallback={<div>Завантаження сторінки...</div>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;