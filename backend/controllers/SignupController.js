import userModel from '../models/UserModel.js'
import loginModel from '../models/LoginModel.js'


async function SignupController(req, res){
    const data = req.body
    const login = {
        email:req.body.email,
        password: req.body.password
    }

    const user = await userModel.create(data)
    // await loginModel.create(login)
    // console.log(user)
    return saveUser(user)
}

function saveUser(user){
    if(user){
        return true;
    }
    return false;
}

export default SignupController;