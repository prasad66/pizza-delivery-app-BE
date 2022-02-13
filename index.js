import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { pizzaRouter } from "./routes/pizza.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
dotenv.config();
app.use(cors()); //thid party middleware

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL)

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongodb is connected");
  return client;
}

export const client = await createConnection();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use("/users", userRouter);
app.use("/pizzas", pizzaRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log("App is started in ", PORT));
