import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { login ,register } from './Controllers/user.controllers.js';

const app = express();


app.use(morgan("dev"));
dotenv.config();
app.use(cors());
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Working...")
})

app.post('/register', register)
app.post('/login', login)



mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Conncted to DB.")
}).catch((error) => {
  console.log("Error while DB connection:", error)
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000.")
})