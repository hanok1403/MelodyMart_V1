import loginModel from '../models/LoginModel.js'

async function LoginController(req, res){
    const {email, password} = req.body
    const data = await loginModel.findOne({email: email, password:password})
    console.log(data)
    return checkUser(data)   
}

function checkUser(data){
    if(data){
        return true;
    }
    else{
        return false;
    }
}

export default LoginController;