import dotenv from "dotenv";
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@anmol.keynylf.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 9001;

export const CONFIG = {
  MONGO: {
    URL: MONGO_URL,
  },
  SERVER: {
    PORT: SERVER_PORT,
  },
};

export default class STATUS_CODES {
  public static SUCCESS_200 = 200;
  public static CREATED_201 = 201;
  public static BAD_REQUEST_400 = 400;
  public static UNAUTHORIZED_401 = 401;
  public static PAYMENT_REQUIRED_402 = 402;
  public static FORBIDDEN_403 = 403;
  public static NOT_FOUND_404 = 404;
  public static METHOD_NOT_ALLOWED_405 = 405;
  public static INTERNAL_SERVER_ERROR_500 = 500;
}
