import express, { json } from "express";
import cors from "cors";

import gql from "./graphql/index";

import notFound from "./middleware/not-found";
import error from "./middleware/error";

const app = express();

app.use(cors({ "Access-Control-Allow-Origin": "*" }));
app.use(json());

app.use("/", gql);

app.use(notFound);
app.use(error);

export default app;
