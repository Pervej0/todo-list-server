const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.sjbgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();
    console.log(uri);
  } finally {
    // await client.close()
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Server Site");
});

app.listen(port, () => console.log("Server is running on port", port));
