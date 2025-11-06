const express = require('express');
const multer = require('multer');

const app = express();

// Multer 2.x memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route to test server
app.get('/', (req, res) => {
res.send('Auto Selfie Backend is running');
});

// Upload route
app.post('/upload', upload.single('selfie'), (req, res) => {
if (!req.file) return res.status(400).send('No file uploaded');

// req.file.buffer contains the image bytes
console.log('Received selfie:', req.file.originalname, req.file.size, 'bytes');

// For now, just respond OK (you could send it to cloud storage)
res.json({ message: 'Selfie received successfully' });
});

// Start server locally (for testing)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
