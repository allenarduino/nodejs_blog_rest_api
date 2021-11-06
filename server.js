//importing dependencies
const express = require("express");
const app = express();

app.get("/welcome", (req, res) => {
  res.send(`<h1>Welcome to my blog</h1>`);
})

const PORT = process.env.PORT || 5000;
module.exports = app.listen(PORT, function () {
  console.log(`Server running on port:${PORT}`);
});