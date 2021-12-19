const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// local db
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const id = randomBytes(4).toString("hex");
  // will only have content in body
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];
  const newComment = {
    id,
    content,
    status: "pending",
  };
  comments.push(newComment);
  commentsByPostId[postId] = comments;

  // emit event
  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        id: id,
        content,
        postId,
        status: "pending",
      },
    });
    res.status(201).send(commentsByPostId[postId]);
  } catch (e) {
    res.status(500).send("Error");
  }
});

app.post("/events", async (req, res) => {
  console.log("Received Events", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((cmt) => cmt.id === id);
    comment.status = status;
    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentUpdated",
        data: {
          id: id,
          content,
          postId,
          status,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comments Service running on port 4001");
});
