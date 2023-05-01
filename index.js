const express = require("express");
const app = express();
const connection = require("./db.js");
const userRouter = require("./routes/user.router.js");
const posts = require("./routes/posts.router.js");
const auth = require("./middleware/auth.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRouter);
app.use("/posts", auth, posts);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("mongodb is connected...");
  } catch (error) {
    console.log(error.message);
  }
  console.log("server is running on port 8000");
});
