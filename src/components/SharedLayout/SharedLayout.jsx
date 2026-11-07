import { NavLink, Outlet } from 'react-router-dom';
import styles from './SharedLayout.module.css';

export default function SharedLayout() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Основна навігація">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Головна
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Пошук фільмів
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
