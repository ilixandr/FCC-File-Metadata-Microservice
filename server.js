'use strict';
const express = require("express");
const cors = require("cors");
/* require "multer" */
const multer = require("multer");
const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.get("/", (req, res) => res.sendFile(process.cwd() + '/views/index.html'));
app.get("/hello", (req, res) => res.json({greetings: "Hello, API"}));

/* use multer: store in memory, set upload to memory, then use upload.single */
const memoryStorage = multer.MemoryStorage;
const upload = multer({storage: memoryStorage});
app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  /* 
  req.file is the `upfile` file
  req.body will hold the text fields, if there were any
  see https://www.npmjs.com/package/multer for usage
  */
  res.json({"file name": req.file.originalname, "ecoding": req.file.encoding, "mimetype": req.file.mimetype, "size [bytes]": req.file.size });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
