// api/index.js
import express from 'express';
import multer from 'multer';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Auto Selfie Backend is running');
});

app.post('/upload', upload.single('selfie'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  console.log('Received selfie:', req.file.originalname, req.file.size, 'bytes');
  res.json({ message: 'Selfie received successfully' });
});

// Export the app as a Vercel handler
export default (req, res) => app(req, res);
