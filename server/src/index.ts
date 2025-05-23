import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db/models";
import env from "./config/env.config";
import router from "./routes";
import errorHandler from "./middleware/error-handler";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(
  cors({
    origin: "*",
  })
);
app.use(router);

const port = env.PORT;
db.sequelize.sync();

export default app;
