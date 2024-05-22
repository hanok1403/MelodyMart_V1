const userModel = require('../models/UserModel')
const loginModel = require('../models/LoginModel')


async function SignupController(req, res){

    

    data = req.body
    const login = {
        email:req.body.email,
        password: req.body.password
    }

    
    const user = await userModel.create(data)
    await loginModel.create(login)
    console.log(user)
    return saveUser(user)
}

function saveUser(user){
    if(user){
        return true;
    }
    return false;
}

module.exports = SignupController;