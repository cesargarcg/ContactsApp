import express from 'express';
const ContactRouter = express.Router();
import ContactController from '../controllers/ContactController.js';
import ContactValidator from '../validators/ContactValidator.js';

ContactRouter.post('/', ContactValidator.validateCreateContact(), ContactController.create);
ContactRouter.get('/', ContactController.getAll);
ContactRouter.get('/:id', ContactValidator.validateId(), ContactController.getById);
ContactRouter.delete('/:id', ContactValidator.validateId(), ContactController.delete);

export default ContactRouter;