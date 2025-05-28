import productRoute from "./products/routes/product.routes";
import errorHandler from "./middlewares/exceptionHandler";
import publicRoute from "./users/routes/public.routes";
import authRoute from "./users/routes/auth.routes";
import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "auth_token", "authorization"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/", publicRoute);
app.use("/api/users", authRoute);
app.use("/api/products", productRoute);
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use(errorHandler);
const server = http.createServer(app);

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://admin:adminpass@mongo:27017/auth?authSource=admin"
  )
  .then(() => console.log("Connected to DB..!"))
  .catch((err: Error) => console.error("Database connection error:", err));

server.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
