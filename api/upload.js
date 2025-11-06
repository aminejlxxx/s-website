import multer from "multer";
HEAD

import { writeFile } from "fs/promises";
8332599 (Prepare project for Vercel serverless)

const storage = multer.memoryStorage();
const upload = multer({ storage });

HEAD
export const config = { api: { bodyParser: false } };

export const config = {
  api: {
    bodyParser: false,
  },
};
8332599 (Prepare project for Vercel serverless)

export default async function handler(req, res) {
  if (req.method === "POST") {
    await new Promise((resolve, reject) =>
      upload.single("selfie")(req, res, (err) => (err ? reject(err) : resolve()))
    );
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

HEAD
    console.log("Received file:", req.file.originalname, req.file.size);

    // For now just log file name and size
    console.log("Received file:", req.file.originalname, req.file.size);

    // If you want to store locally, you need cloud storage instead
8332599 (Prepare project for Vercel serverless)
    res.status(200).json({ message: "Selfie received successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
