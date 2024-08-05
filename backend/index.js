import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import pkg from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import userModel from './models/UserModel.js';
import adminRouter from './router/adminRouter.js';
import userRouter from './router/userRouter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: 'https://melodymart.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200
};

mongoose.connect(process.env.DBClient)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log("Cannot connect to DB..!", error));

const PORT = process.env.PORT || 5001;
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';
const { sign } = pkg;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'build')));

app.use('/api/admin', adminRouter);
app.use('/api/', userRouter);

app.get('/api/', (req, res) => {
  res.send("Welcome to Melody Mart API");
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userModel.findOne({ email, password });

    if (!data) throw new Error("User not found");

    const token = generateToken(data);

    res.status(200).json({
      user: {
        id: data._id,
        username: data.username,
        email: data.email,
        mobileNumber: data.mobileNumber
      },
      token: token,
      role: data.role
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error: error.message
    });
  }
});

app.post('/api/signup', async (req, res) => {
  const { email, password, username, mobileNumber } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists', userExists: true });
    }

    const newUser = new userModel({
      email,
      password,
      username,
      mobileNumber,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  return sign(payload, JWT_SECRET, { expiresIn: '24h' });
}


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
