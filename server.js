const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Storage config for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `selfie-${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

// Serve your frontend (place your HTML file in 'public')
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to receive selfies
app.post('/upload', upload.single('selfie'), (req, res) => {
  console.log('Selfie received:', req.file.filename);
  res.json({ status: 'success', filename: req.file.filename });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
