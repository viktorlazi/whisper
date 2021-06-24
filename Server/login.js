import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import JWT_SECRET from './jwt_secret.js';

export const login_user = async(body)=>{
  const user = await User.findOne({"username":body.username});
  if(!user){
    return {status:'error', error:'invalid username/password'};
  }
  if(await bcrypt.compare(body.password, user.password)){
    if(user_token){
      return {status:'ok', token:user_token.token};
    }
    const token = jwt.sign(
      {
        username:user.username
      },
      JWT_SECRET
    );
    return {status:'ok', token:token};
  }
  return {status:'error', error:'invalid username/password'};
}