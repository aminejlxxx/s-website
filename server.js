const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/[^\w.-]/g, '_');
    cb(null, `${ts}_${safe}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const app = express();
app.use(express.static(path.join(__dirname)));

app.post('/upload', upload.single('selfie'), (req, res) => {
  if(!req.file) return res.status(400).json({ error: 'no-file' });
  const consent = req.body.consent || '';
  const logLine = `${new Date().toISOString()} | ${req.ip} | ${req.file.filename} | consent=${consent}\n`;
  fs.appendFileSync(path.join(UPLOAD_DIR, 'upload-log.txt'), logLine);
  res.json({ ok: true, filename: req.file.filename });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
