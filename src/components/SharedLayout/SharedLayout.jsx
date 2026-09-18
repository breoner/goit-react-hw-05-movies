import { Outlet, Link } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      <header style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </header>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;