import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method === "POST") {
    await new Promise((resolve, reject) =>
      upload.single("selfie")(req, res, (err) => (err ? reject(err) : resolve()))
    );
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("Received file:", req.file.originalname, req.file.size);
    res.status(200).json({ message: "Selfie received successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
