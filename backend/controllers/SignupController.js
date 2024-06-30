import userModel from '../models/UserModel.js';

const SignupController = async (req, res) => {
  const { email, password, username, mobileNumber } = req.body;

  try {
    //Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    //Create a new instance of userModel
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
};

export default SignupController;
