const express = require("express");
const jwt = require("jsonwebtoken");
const Event = require("../model/Event");
const router = express.Router();
const secretKey = "kodaliramu1234";

const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Authentication required");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.user = decoded;
    next();
  });
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === username && password === password) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "9h" });
    res.send({ msg: "Wlcome Admin Bro", token });
  } else {
    res.status(401).send("Invalid credentials.");
  }
});
//create
router.post("/events", jwtAuth, async (req, res) => {
  try {
    const { name, date, description, maxSeats } = req.body;
    const newEvent = new Event({ name, date, description, maxSeats });
    await newEvent.save();
    res.status(201).send(newEvent);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//update
router.put("/events/:id", jwtAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, description, maxSeats, bookedSeats } = req.body;
    const event = await Event.findById(id);

    if (event) {
      event.name = name;
      event.date = date;
      event.description = description;
      event.maxSeats = maxSeats;
      event.bookedSeats = bookedSeats;
      await event.save();
      res.send(event);
    } else {
      res.status(404).send("Event not found.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete
router.delete("/events/:id", jwtAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (event) {
      res.status(204).send();
    } else {
      res.status(404).send("Event not found.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//get all events
router.get("/events", jwtAuth, async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
