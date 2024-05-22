import loginModel from '../models/LoginModel.js'

async function LoginController(req, res){
    const {email, password} = req.body
    const data = await LoginModel.findOne({email: email, password:password})
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