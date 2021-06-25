import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import JWT_SECRET from './jwt_secret.js';

export const add_user = async(body)=>{
  if(await User.findOne({'username':body.username}, (err,data)=>{})){
    return {error:'username exists'};
  }else{
    if(pass_validation(body.password)){
      const hashedPassword = await bcrypt.hash(body.password, 10);
      User.create({
        "username":body.username,
        "password":hashedPassword,
        "contacts":[]
      }); 
      const token = jwt.sign(
        {
          username:body.username
        },
        JWT_SECRET
      );
      return {status:'ok', token:token};
    }else{
      return {error:'unsuccesful'};
    }
  }
}

const pass_validation = (pass)=>{
  if(pass.length < 2){
    return false;
  }
  return true;
}
