
require('dotenv').config()

const express = require("express");

const app = express();
const discord = require("./services/discord/zmain");
var cors = require('cors')
app.use(cors())

let port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Glad You Are Here :wink:_dsl2-al;wlz'lvvmsdk30kasoekam")
})


app.listen(port, () => {
  console.log("Listening on "+port);
})
