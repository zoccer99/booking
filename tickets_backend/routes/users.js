import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRoutes = express.Router();

import authentification from "../Middleware/authentification.js";




let users = [
    {       
        username : "leon",
        password: "$2b$10$UNhJjqPTiBmjAjEYk8jz0.J922P6nOfes/oz81BM80wDpnFlBWdFC" //12345
    }
]

function generateAccessToken(username) {
  return jwt.sign({ username: username },process.env.TOKEN_SECRET , { //process.env.TOKEN_SECRET
    expiresIn: "2hr",
  });
}

async function isUserExisting(username, email) {
  const element = await collections.events.findOne({
    $or: [{ username: username }, { email: email }],
  });
  return element;
}

async function isPasswordExisting(password) {
  let element = await collections.events.findOne({
    password: password,
  });
  return element;
}

userRoutes.post("/Users", async (req, res) => {
  const userData = await req.body;
  if (users) {
    const user = await users.find((e) => e.username == userData.username);
    if (!user || user === null) return res.status(401).send("User not found!");
    const isCorrect = await bcrypt.compare(userData.password, user.password);
    if (isCorrect) {
      const token = generateAccessToken(user.username);
      res.status(200).json({ accessToken: token });
    } else {
      res.status(401).json({ message: "invalid username or password!" });
    }
  }
});

userRoutes.get("/isUserAuthenticated", authentification, (req, res) => {
  res.sendStatus(200);
});

// userRoutes.post("/register", async (req, res) => {
//   const userData = req.body;
//   userData.password = await bcrypt.hash(userData.password, 10);
//   let userExisting = await isUserExisting(userData.username, userData.email);
//   let passwordExisting = await isPasswordExisting(userData.password);
//   if (userExisting) {
//     res.status(409).json("User existiert bereits"); //coflict
//     return;
//   }
//   if (passwordExisting) {
//     res.status(409).json("Password schon vergeben");
//     return;
//   }
//   collections.users.insertOne(userData, (err, res) => {
//     if (err) throw err;
//   });
//   const token = generateAccessToken(userData.username);
//   res.status(200).send({ accessToken: token });
// });

export default userRoutes;
