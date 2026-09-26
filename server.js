const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Dummy user (you can later connect DB)
const user = {
  username: "admin",
  password: "1234"
};

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});