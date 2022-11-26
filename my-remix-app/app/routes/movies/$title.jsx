import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

const axios = require("axios");

export let loader = async ({ params }) => {
  invariant(params.title, "expected params.title");

  let data = JSON.stringify({
    collection: "movies",
    database: "sample_mflix",
    dataSource: process.env.MONGO_URI,
    filter: { title: params.title },
  });

  let config = {
    method: "post",
    url: process.env.DATA_API_BASE_URL + "/action/findOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.DATA_API_KEY,
    },
    data,
  };

  let result = await axios(config);
  let movie = result?.data?.document || {};

  return {
    title: params.title,
    plot: movie.fullplot,
    genres: movie.genres,
    directors: movie.directors,
    year: movie.year,
    image: movie.poster,
  };
};
