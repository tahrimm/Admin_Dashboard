import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userdata } from './data.js'; // Importing the userdata array from data.js
import User from "./user.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Insert data into your database collection
    // User.insertMany(userdata)
    //   .then(() => console.log("Data inserted successfully"))
    //   .catch(error => console.error("Error inserting data:", error));
  })
  .catch((error) => console.error(`${error} did not connect`));
  app.get('/api/users', async (req, res) => {
    try {
      // Fetch data from the User collection
      const users = await User.find({});
      res.json(users); // Send the fetched data as a JSON response
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });