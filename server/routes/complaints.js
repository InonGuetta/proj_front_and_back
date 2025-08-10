import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Complaint } from '../models/complaint.model.js';
import { validateComplaint } from '../middlewares/validateComplaint.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = Router();

// Serve the home page
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '..', '..', 'client') });
});

router.post('/submit-complaint', validateComplaint, async (req, res) => {
  try {
    const { category, message } = req.body;
    const doc = await Complaint.create({
      category,
      message,
    });
    
    // If it's an HTML form submission, redirect back with success
    if (req.is('application/x-www-form-urlencoded')) {
      return res.redirect(303, '/complaints.html?sent=1');
    }
    
    return res.status(201).json({ msg: 'complaint saved', id: doc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
