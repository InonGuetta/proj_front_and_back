export function validateComplaint(req, res, next) {
  const { category, message } = req.body;
  if (!category || !message) {
    return res.status(400).json({ error: 'אתה צריך category וגם הודעת טקסת חופשי של תלונה' });
  }
  next();
}
