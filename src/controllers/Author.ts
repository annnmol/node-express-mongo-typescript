import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import STATUS_CODES from "../config/statusCodes";
import Author from "../models/Author";
import Logging from "../utils/Logging";

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  const author = new Author({
    id: new mongoose.Types.ObjectId(),
    name: name,
  });

  return author
    .save()
    .then((author) => {
      res
        .status(STATUS_CODES.CREATED_201)
        .json({ author, message: "author created" });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

const readAllAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Author.find()
    .then((authors) => {
      res.status(STATUS_CODES.SUCCESS_200).json({ authors });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.id;

  return Author.findById(authorId)
    .then((author) => {
      author
        ? res.status(STATUS_CODES.SUCCESS_200).json({ author })
        : res
            .status(STATUS_CODES.NOT_FOUND_404)
            .json({ message: "author not found for given id" });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.id;

  return Author.findById(authorId)
    .then((author) => {
      if (author) {
        author?.set(req.body);

        return author
          .save()
          .then((author) => {
            res
              .status(STATUS_CODES.SUCCESS_200)
              .json({ author, message: "author updated" });
          })
          .catch((error) => {
            Logging.error(error);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
          });
      } else {
        res
          .status(STATUS_CODES.NOT_FOUND_404)
          .json({ message: "author not found for given id" });
      }
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.id;

  return Author.findByIdAndDelete(authorId)
    .then((author) => {
      author
        ? res
            .status(STATUS_CODES.CREATED_201)
            .json({ message: "author deleted" })
        : res
            .status(STATUS_CODES.NOT_FOUND_404)
            .json({ message: "author not found for given id" });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

export default {
  createAuthor,
  readAllAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor,
};
