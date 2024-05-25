import userModel from '../models/UserModel.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const JWT_SECRET = 'your_secret_key'; 

async function LoginController(req, res) {
    try {
        const user = req;
        // console.log(user)
        const login = {
            email: req.body.email,
            password: req.body.password
        };
        
       
        const data = await userModel.findOne(login);
        console.log("data   ", data)
        if (data.length <= 0)
            throw new Error("User not found");
        
        
        
        const token = generateToken(login);

        

        return {
            user:{
                username:data.username,
                email:data.email,
                mobileNumber:data.mobileNumber
            },
            token: token,
            role:data.role
        };
    } catch (error) {
        console.error(error);
        return {
            message: 'Error Logging in',
            error: error.message
        };
    }
}


function generateToken(user) {
    const payload = {
        id: user._id, 
        email: user.email,
        role: user.role
    };
    return sign(payload, JWT_SECRET, { expiresIn: '24h' }); 
}

export default LoginController;