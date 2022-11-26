import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "remix";
const axios = require("axios");

export default function Movies() {
  let [searchParams, setSearchParams] = useSearchParams();
  let submit = useSubmit();
  let movies = useLoaderData();
  let totalFound = movies.totalCount;
  let totalShow = movies.showCount;

  return (
    <div>
      <h1>Movies</h1>
      <Form method="get">
        <input
          onChange={(e) => submit(e.currentTarget.form)}
          id="searchBar"
          name="searchTerm"
          placeholder="Search movies..."
        />
        <p>
          Showing {totalShow} of total {totalFound} movies found
        </p>
      </Form>
      <ul>
        {movies.documents.map((movie) => (
          <li key={movie.title}>
            <Link to={movie.title}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
