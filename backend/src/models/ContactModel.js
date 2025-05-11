import Database from '../config/DB.js';
import { ObjectId } from 'mongodb';

class ContactModel{

    async create(contact){
        const contactsCollection = Database.db.collection('contacts');
        return await contactsCollection.insertOne(contact);
    }

    async getAll(){
        const contactsCollection = Database.db.collection('contacts');
        return await contactsCollection.find().toArray();
    }

    async getById(id){
        const contactsCollection = Database.db.collection('contacts');
        return await contactsCollection.findOne({_id: new ObjectId(id)});
    }

    async delete(id){
        const contactsCollection = Database.db.collection('contacts');
        return await contactsCollection.deleteOne({_id: new ObjectId(id)});
    }

}

export default new ContactModel();