import express from 'express';
import controller from '../controllers/Book';
import { Schema, ValidationSchema } from '../middleware/ValidationSchema';

const bookRoutes = express.Router();

bookRoutes.get('', controller.readAllBook);
bookRoutes.post('', ValidationSchema(Schema.book.create),controller.createBook);

bookRoutes.get('/:id', controller.readBook);
bookRoutes.put('/:id', controller.updateBook);
bookRoutes.delete('/:id', controller.deleteBook);

export default bookRoutes;