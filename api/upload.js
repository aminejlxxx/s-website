import multer from 'multer';
import { promisify } from 'util';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single('selfie');
const runMiddleware = promisify(uploadMiddleware);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  try {
    await runMiddleware(req, res);

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    console.log('Received selfie:', req.file.originalname, req.file.size, 'bytes');

    // TODO: store the file somewhere (DB / cloud storage)
    res.status(200).json({ message: 'Selfie received successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
