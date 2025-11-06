const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Multer 2.x memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple route to test server
app.get('/api', (req, res) => {
  res.send('Auto Selfie Backend is running');
});

// Upload route
app.post('/upload', upload.single('selfie'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  console.log('Received selfie:', req.file.originalname, req.file.size, 'bytes');
  res.json({ message: 'Selfie received successfully' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
