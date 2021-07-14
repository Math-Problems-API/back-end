import express, { json } from "express";
import cors from "cors";

import gql from "./graphql/index";

import notFound from "./middleware/not-found";
import error from "./middleware/error";

const app = express();

app.use(cors({ "Access-Control-Allow-Origin": "*" }));
app.use(json());

app.use("/operator-views/:operatorId", (req, res) => {
  const { operatorId } = req.params;

  const operatorPath = `${__dirname}/views/operators/${operatorId}.html`;

  res.sendFile(operatorPath)
});

app.use("/", gql);

app.use(notFound);
app.use(error);

export default app;
