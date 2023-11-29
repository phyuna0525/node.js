const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      console.log(file);
      done(null, file.originalname);
    },
    destination(req, file, done) {
      console.log(file);
      done(null, path.join(__dirname, "public"));
    },
  }),
});

const uploadMiddleware = upload.single("myFile");

app.use(uploadMiddleware);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.end("HOME");
});

app.post("/upload", upload.single("myFile"), (req, res) => {
  console.log(req.file);
  res.status(200).send("uploaded");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
