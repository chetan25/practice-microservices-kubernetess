const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.get("/events", async (req, res) => {
  const { type } = req.body;
  if (type === "CommentCreated");
  {
    const { content } = data;
    const isValid = content.includes("orange");
    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        ...data,
        status: isValid ? "approved" : "rejected",
      });
      res.send({});
    } catch (e) {
      console.log("Error", e);
      res.send({});
    }
  }
});

app.listen(4003, () => {
  console.log("Server litening on 4003");
});
