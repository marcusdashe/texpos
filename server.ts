import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./app/models";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
};

const app: Express = express();

app.use(cors(corsOptions));

// Parse request of content-type: application/json
app.use(express.json());

// Parse request of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync({ force: false })
  .then(() => console.log("Sync DB Successfully..."))
  .catch((err: any) => {
    console.log("Failed to sync db: " + err.message);
  });

const port: string | undefined = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Express + Typescript + Postgresql Web Service" });
});

import routes from "./app/routes/tutorial.routes";

routes(app);

app.listen(port !== "undefined" ? port : 8000, () => {
  console.log(`[Server]: Server is running on http://localhost:${port}`);
});
