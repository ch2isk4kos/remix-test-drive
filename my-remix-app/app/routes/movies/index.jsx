import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "remix";
const axios = require("axios");

export let loader = async ({ request }) => {
  let pipeline = [{ $limit: 100 }];

  let data = JSON.stringify({
    collection: "movies",
    database: "sample_mflix",
    dataSource: process.env.MONGO_URI,
    pipeline,
  });

  let config = {
    method: "post",
    url: `${process.env.DATA_API_BASE_URL}/action/aggregate`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.DATA_API_KEY,
    },
    data,
  };

  let movies = await axios(config);
  let totalFound = await getCountMovies();

  return {
    showCount: movies?.data?.documents?.length,
    totalCount: totalFound,
    documents: movies?.data?.documents,
  };
};

const getCountMovies = async (countFilter) => {
  let pipeline = countFilter
    ? [{ $match: countFilter }, { $count: "count" }]
    : [{ $count: "count" }];

  let data = JSON.stringify({
    collection: "movies",
    database: "sample_mflix",
    dataSource: process.env.MONGO_URI,
    pipeline,
  });

  let config = {
    method: "post",
    url: `${process.env.DATA_API_BASE_URL}/action/aggregate`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.DATA_API_KEY,
    },
    data,
  };

  let result = await axios(config);

  return result?.data?.documents[0]?.count;
};

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
