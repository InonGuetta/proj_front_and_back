import { Router } from 'express';
import { Complaint } from '../models/complaint.model.js';


const router = Router();

router.post('/submit-complaint', async (req, res) => {
  try {
    const { category, message, createdAt } = req.body;

    if (!category || !message) {
      return res.status(400).json({ error: 'category ו-message נדרשים' });
    }

    const doc = await Complaint.create({
      category,
      message,
      createdAt, 
    });

    return res.status(201).json({ msg: 'complaint saved', id: doc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
