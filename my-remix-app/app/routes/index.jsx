import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <nav aria-label="Main navigation" className="remix-app__header-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies Search Demo</Link>
          </li>
          <li>
            <Link to="/facets">Facet Search Demo</Link>
          </li>
          <li>
            <a href="https://github.com/ch2isk4kos/remix-test-drive">GitHub</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
