export function validateComplaint(req, res, next) {
  const { category, message } = req.body;
  if (!category || !message) {
    return res.status(400).json({ error: 'category ו-message נדרשים' });
  }
  next();
}
