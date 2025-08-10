import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Complaint } from '../models/complaint.model.js';
import { validateComplaint } from '../middlewares/validateComplaint.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

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

    if (req.is('application/x-www-form-urlencoded')) {
      return res.redirect(303, '/complaints.html?sent=1');
    }

    return res.status(201).json({ msg: 'complaint saved', id: doc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/admin-to-show-all', async (req, res) => {
  const { password } = req.body;
  if (password !== process.env.PASSWORD_ADMIN) {
    res.status(403).send('<h2 style="color:red"> סיסמה שגויה - אין הרשאה לצפות בתלונות חזור לדף הקודם באמצעות החץ שמאלה למעלה בדפדפן </h2>');
    return;
  }
  const complaints = await Complaint.find({});
  let html = '<h2>רשימת תלונות</h2>';
  if (complaints.length === 0) {
    html += '<p>אין תלונות במערכת.</p>';
  } else {
    html += '<ul>' + complaints.map(c => `<li><b>${c.category}:</b> ${c.message} <small>(${new Date(c.createdAt).toLocaleString('he-IL')})</small></li>`).join('') + '</ul>';
  }
  html += '<a href="/">חזרה לדף הבית</a>';
  res.send(html);
});


export default router;
