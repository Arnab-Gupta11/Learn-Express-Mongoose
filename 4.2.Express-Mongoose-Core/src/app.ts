import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

//middlware
app.use(express.json());
app.use(cors());

const test = 10;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello" + test);
});

export default app;
