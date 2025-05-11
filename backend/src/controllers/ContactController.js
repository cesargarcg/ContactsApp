import ContactModel from '../models/ContactModel.js';
import { validationResult } from 'express-validator';

class ContactController {
    constructor() {

    }

    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const data = await ContactModel.create(req.body);
            res.status(200).json(data);
        } catch (e){
            res.status(500).json({message: 'Create error'});
        }
    }

    async getAll(req, res) {
        try{
            const data = await ContactModel.getAll();
            if (!data) {
                return res.status(404).json({message: 'No contacts found'});
            }
            res.status(201).json(data);
        } catch (e){
            res.status(500).json({message: 'Get all error'});
        }
    }

    async getById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const data = await ContactModel.getById(req.params.id);
            if (!data) {
                return res.status(404).json({message: 'Contact not found'});
            }
            res.status(200).json(data);
        } catch (e){
            res.status(500).json({message: 'Get by id error'});
        }
    }

    async delete(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const data = await ContactModel.delete(req.params.id);
            res.status(200).json(data);
        } catch (e){
            res.status(500).json({message: 'Delete error'});
        }
    }
}

export default new ContactController();