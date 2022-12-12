import express, { NextFunction, Request, Response } from "express";
import STATUS_CODES from "../config/statusCodes";
const router = express.Router();

import authorRoutes from './authorRoutes';
import bookRoutes from "./bookRoutes";

// split up route handling
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
//*homepage
router.get('', (req: Request, res: Response, next: NextFunction) => {

      return res.status(STATUS_CODES.SUCCESS_200).json({message:'Welcome to Node app made using Express Typescript with Mongo database. visit /authors to start'});
    
  });

export default router;


