import multer from "multer";
import nextConnect from "next-connect";

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect();

apiRoute.use(upload.single("selfie"));

apiRoute.post((req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  console.log("Received selfie:", req.file.originalname, req.file.size, "bytes");
  res.json({ message: "Selfie received successfully" });
});

export const config = {
  api: {
    bodyParser: false, // Important: multer handles parsing
  },
};

export default apiRoute;
