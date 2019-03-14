const express = require('express');
const mongoose = require('mongoose');
const secrets = require('./keys/keys').dbUri;
const Model = require('./models/model');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require("morgan");
const app = express();
const PORT = 3001;

// This is our MongoDB database
// connect backend with the database
mongoose.connect(secrets, { useNewUrlParser: true });


//Listen on PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Check if db is connected succesfully
let db = mongoose.connection;
db.once("open", () => console.log("Connected to DB"));
db.on("error", () => console.error("Connection error"));

//* bodyparser to parse the request body in json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Loger to log the requests to and from server
app.use(logger("dev"));

// Use thi library to cross origin request
app.use(cors({ credentials: true, origin: true }));

//! this is our READ method
// method to fetch all data from database
app.get("/getData", (req, res) => {
  Model.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//! this is UPDATE method
// it overwrites existing data in our database
app.post("/updateData", (req, res) => {
  /* 
  const id = req.body.id;
  const message = req.body.message
   */
  console.log(req.body);
  const { id, message } = req.body;
  console.log(message);
  Model.findOneAndUpdate({ id }, { message }, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//! this is our DELETE method
// this method removes existing data from our database
app.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Model.findOneAndDelete(id, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//!this is our CREATE method
// this method adds new data in our database
app.post("/createData", (req, res) => {
  let data = new Model();
  const { id, message } = req.body;
  //! Fill the error condition. fields can never be empty or 0

  /*   if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "Invalid Input"
    });
  }
 */
  data.id = id;
  data.message = message;

  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

