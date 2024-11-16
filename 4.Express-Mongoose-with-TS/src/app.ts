import express, { Request, Response } from "express";
const app = express();

//Middleware
app.use(express.json());
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  res.send("hello coders");
});
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send(req.body);
});

export default app;
