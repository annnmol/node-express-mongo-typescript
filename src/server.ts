import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CONFIG } from "./config/config";
import STATUS_CODES from "./config/statusCodes";
import router from "./routes/Index";
import Logging from "./utils/Logging";

const app = express();

//* to supress mongo v7 warning of strict query
mongoose.set("strictQuery", true);

//* used this to replace _id with id field
mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

//** Connect to Mongo Database */
mongoose
  .connect(CONFIG.MONGO.URL)
  .then(() => {
    Logging.success("Conneted to Mongo Database");
    startServer();
  })
  .catch((error: any) => {
    Logging.error("Unable to connect to Mongo database");
    Logging.error(error);
  });

const startServer = () => {
  //* Log the request
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logging.info(
      `Incoming Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(`Outgoing Status: [${res.statusCode}]`);
    });

    next();
  });

  //* body parsing data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //* Rules for cors
  // app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(STATUS_CODES.SUCCESS_200).json({});
    }

    next();
  });

  //* Routes
  app.use("", router);

  //* HealthCheck
  app.use("/health", (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(STATUS_CODES.SUCCESS_200)
      .json({ message: "Server is live" });
  });

  //* Error Handling
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Route not found");
    Logging.error(error);

    return res
      .status(STATUS_CODES.NOT_FOUND_404)
      .json({ message: error?.message, error });
  });

  //* start the server
  app.listen(CONFIG.SERVER.PORT, () => {
    Logging.success(`Hello from server ${CONFIG.SERVER.PORT}`);
  });
};
