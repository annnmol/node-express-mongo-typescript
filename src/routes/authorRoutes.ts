import express from 'express';
import controller from '../controllers/Author';
import { Schema, ValidationSchema } from '../middleware/ValidationSchema';

const authorRoutes = express.Router();

authorRoutes.get('',controller.readAllAuthor);
authorRoutes.post('', ValidationSchema(Schema.author.create),controller.createAuthor);

authorRoutes.get('/:id', controller.readAuthor);
authorRoutes.put('/:id', ValidationSchema(Schema.author.update),controller.updateAuthor);
authorRoutes.delete('/:id', controller.deleteAuthor);

export default authorRoutes;