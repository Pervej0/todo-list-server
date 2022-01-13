const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongoDb").ObjectId;
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
    const database = client.db("ToDo_List");
    const taskListCollection = database.collection("TaskList");

    // Inset a task
    app.post("/task", async (req, res) => {
      const data = req.body;
      const result = await taskListCollection.insertOne(data);
      res.json(result);
    });
    // get all tasks
    app.get("/task", async (req, res) => {
      const allTask = await taskListCollection.find().toArray();
      res.send(allTask);
    });

    // update the task

    app.put("/task/:id", async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const updateDoc = { $set: data };
      const result = await taskListCollection.updateOne(query, updateDoc);
      res.json(result);
    });

    // delete the task
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await taskListCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close()
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Server Site");
});

app.listen(port, () => console.log("Server is running on port", port));
