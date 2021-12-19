const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// local db
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  // will only have title in body
  const { title } = req.body;
  const newPost = {
    id,
    title,
  };
  posts[id] = newPost;

  // emit event
  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: newPost,
    });
    res.status(201).send(posts[id]);
  } catch (e) {
    res.status(500).send("Error");
  }
});

app.post("/events", (req, res) => {
  console.log("Received Events", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Post Service running on port 4000");
});
