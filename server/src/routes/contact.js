import express from 'express';
import protect from '../middleware/auth.js';
import { submitContact, getContacts, deleteContact } from '../controllers/contact.js';

const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(protect, getContacts);

router.route('/:id')
  .delete(protect, deleteContact);

export default router;
