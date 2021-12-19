const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  try {
    axios.post("http://localhost:4000/events", event); //post
    axios.post("http://localhost:4001/events", event); // comment
    axios.post("http://localhost:4002/events", event); // query
    axios.post("http://localhost:4003/events", event); // moderation

    res.send({ status: "OK" });
  } catch (e) {
    console.log("Error", e);
    res.send({ status: "Error" });
  }
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
