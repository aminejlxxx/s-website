const express = require('express');
const multer = require('multer');
const path = require('path');
HEAD

const fs = require('fs');
bd30eb2 (Initial commit: setup auto-selfie-backend)

const app = express();

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir);
}

// Multer 2.x disk storage
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, uploadDir);
},
filename: function (req, file, cb) {
const timestamp = Date.now();
const ext = path.extname(file.originalname);
cb(null, `selfie_${timestamp}${ext}`);
},
});
const upload = multer({ storage });

// Parse JSON & URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

HEAD
// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple route to test server
app.get('/api', (req, res) => {
  res.send('Auto Selfie Backend is running');

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Root route (serves index.html)
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
bd30eb2 (Initial commit: setup auto-selfie-backend)
});

// Upload route
app.post('/upload', upload.single('selfie'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

HEAD
  console.log('Received selfie:', req.file.originalname, req.file.size, 'bytes');
  res.json({ message: 'Selfie received successfully' });
});


console.log('Received selfie:', req.file.filename, req.file.size, 'bytes');
res.json({ message: 'Selfie received successfully' });
});

// Start server locally or via Vercel
bd30eb2 (Initial commit: setup auto-selfie-backend)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
