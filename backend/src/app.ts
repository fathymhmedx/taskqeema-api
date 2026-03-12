import express, { type Application } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import v1Routes from "./routes";
import { requestLogger } from "./shared/utils/logger";

const app: Application = express();
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(compression());
app.use(express.json({ limit: "50kb" }));
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", v1Routes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
