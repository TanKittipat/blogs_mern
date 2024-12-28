const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");

require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
const frontend = process.env.BASE_URL;

app.use(cors({ origin: frontend, credentials: true }));
// make app can read json.
app.use(express.json());

// connect to mongodb.
try {
  mongoose.connect(uri);
  console.log("MongoDB connected");
} catch (error) {
  console.log("An error occurred while connect to DB: ", error);
}

app.get("/", (req, res) => {
  res.send("<h1>Server is ready</h1>");
});

// use router
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/posts", postRouter);

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
