import express from "express";
const router = express.Router();

import authorRoutes from './authorRoutes';
import bookRoutes from "./bookRoutes";

// split up route handling
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);

export default router;


