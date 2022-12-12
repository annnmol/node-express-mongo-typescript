import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import STATUS_CODES from "../config/statusCodes";
import Book from "../models/Book";
import Logging from "../utils/Logging";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;

  const book = new Book({
    id: new mongoose.Types.ObjectId(),
    title,
    author,
  });

  return book
    .save()
    .then((book) => {
      res
        .status(STATUS_CODES.CREATED_201)
        .json({ book, message: "book created" });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

const readAllBook = async (req: Request, res: Response, next: NextFunction) => {
  return (
    Book.find()
      .populate("author")
      // .select("-createdAt")
      .then((books) => {
        res.status(STATUS_CODES.SUCCESS_200).json({ books });
      })
      .catch((error) => {
        Logging.error(error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
      })
  );
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id;

  return Book.findById(bookId)
    .populate("author")
    .then((book) => {
      book
        ? res.status(STATUS_CODES.SUCCESS_200).json({ book })
        : res
            .status(STATUS_CODES.NOT_FOUND_404)
            .json({ message: "book not found for given id" });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id;

  return Book.findById(bookId)
    .populate("author")
    .then((book) => {
      if (book) {
        book?.set(req.body);

        return book
          .save()
          .then((book) => {
            res
              .status(STATUS_CODES.SUCCESS_200)
              .json({ book, message: "book updated" });
          })
          .catch((error) => {
            Logging.error(error);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
          });
      } else {
        res
          .status(STATUS_CODES.NOT_FOUND_404)
          .json({ message: "book not found for given id" });
      }
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id;

  return Book.findByIdAndDelete(bookId)
    .populate("author")
    .then((book) => {
      book
        ? res.status(STATUS_CODES.CREATED_201).json({ message: "book deleted" })
        : res
            .status(STATUS_CODES.NOT_FOUND_404)
            .json({ message: "book not found for given id" });
    })
    .catch((error) => {
      Logging.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).json({ error });
    });
};

export default {
  createBook,
  readAllBook,
  readBook,
  updateBook,
  deleteBook,
};
