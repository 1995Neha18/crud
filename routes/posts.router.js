const express = require("express");
const router = express.Router();
const Posts = require("../model/posts.model");

router.get("/", async (req, res) => {
  const { authorID } = req.body;
  const userPosts = await Posts.find({ authorID });
  res.send(userPosts);
});

router.post("/add", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    await newPost.save();
    res.send({ msg: "post has been created" });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { authorID } = req.body;
  const userPosts = await Posts.find({ authorID });
  if (!userPosts) return res.send({ msg: "post not found" });

  await Posts.findByIdAndUpdate(id, req.body);
  res.send({ msg: "post has been updated" });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { authorID } = req.body;
  const userPosts = await Posts.find({ authorID });
  if (!userPosts) return res.send({ msg: "post not found" });

  await Posts.findByIdAndDelete(id);
  res.send({ msg: "post has been deleted" });
});

module.exports = router;
