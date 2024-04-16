import express from "express";

import db from "../db/connection.js";

// This converts the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router, used to define routes
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("classes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("classes");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      class_name: req.body.class_name,
      class_description: req.body.class_description,
      class_image: req.body.class_image,
      capacity: req.body.capacity,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    };
    let collection = await db.collection("classes");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding class");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        text: req.body.text,
      },
    };

    let collection = await db.collection("classes");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating class");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("classes");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting class");
  }
});

export default router;
