import express, { Request, Response } from "express";
import User from "../models/user.ts";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

// import db from "../../db/connection.js";

// This converts the id from string to ObjectId for the _id.
// import { ObjectId } from "mongodb";

// router is an instance of the express router, used to define routes
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// api/users/register
router.post(
  "/register",
  [
    // add middleware to use built-in checks from express-validator
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        {
          // store userID in web token
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        // only change to true for production. don't require https for dev with localhost
        secure: process.env.NODE_ENV === "production",
        // match expiry of jwt
        maxAge: 86400000,
      });
      return res.status(200).send({ message: "User registered!" });
    } catch (error) {
      // error message from mongoDB could include sensitive info. use generic message on frontend but log the error on the backend
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

// router.get("/", async (req, res) => {
//   let collection = await db.collection("classes");
//   let results = await collection.find({}).toArray();
//   res.send(results).status(200);
// });

// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("classes");
//   let query = { _id: new ObjectId(req.params.id) };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// router.post("/", async (req, res) => {
//   try {
//     let newDocument = {
//       class_name: req.body.class_name,
//       class_description: req.body.class_description,
//       class_image: req.body.class_image,
//       capacity: req.body.capacity,
//       start_date: req.body.start_date,
//       end_date: req.body.end_date,
//     };
//     let collection = await db.collection("classes");
//     let result = await collection.insertOne(newDocument);
//     res.send(result).status(204);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error adding class");
//   }
// });

// router.patch("/:id", async (req, res) => {
//   try {
//     const query = { _id: new ObjectId(req.params.id) };
//     const updates = {
//       $set: {
//         text: req.body.text,
//       },
//     };

//     let collection = await db.collection("classes");
//     let result = await collection.updateOne(query, updates);
//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error updating class");
//   }
// });

// // This section will help you delete a record
// router.delete("/:id", async (req, res) => {
//   try {
//     const query = { _id: new ObjectId(req.params.id) };

//     const collection = db.collection("classes");
//     let result = await collection.deleteOne(query);

//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error deleting class");
//   }
// });

export default router;
