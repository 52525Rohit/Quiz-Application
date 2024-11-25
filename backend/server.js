import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import connect from "./database/connection.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
config();

const port = process.env.PORT || 5500;

app.use("/api", router);

app.get("/", (req, res) => {
  try {
    res.json("Get Resqest");
  } catch (error) {
    res.json(error);
  }
});

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server conneted to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the sever");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection");
  });
