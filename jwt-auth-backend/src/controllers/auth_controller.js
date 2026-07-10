const jwt = require('jsonwebtoken');
 const User = require('../models/Users');
const { generateAccessToken,  generateRefreshToken} = require('../utils/generateTokens');
const bcrypt = require('bcryptjs');
async function register(req,res){
  try { 
    const {name , email , password} = req.body;
   //validation
   if(!name || !email || !password){
     return res.status(400).json({msg: 'Name, email and password are required'});
   }

   // email phele se exist karta ho
   const existingUser = await User.findOne({email});
   if(existingUser){
     return res.status(409).json({msg: 'email already registered'});
   }

  //first user is always admin
  const usercount = await User.countDocuments();
  const role = usercount === 0 ? 'Admin' : 'Viewer';

  //user banao

  const user  = new User({name,email,password,role});

  // tokens banao

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  //refreah token ko db me save karo
  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    accessToken,
    refreshToken,
    user: user.toSafeJSON()
  });

  } catch (error) {
    res.status(500).json({ msg: 'Registration failed', error: error.message});
  }

}


async function  Login(req, res){
     try {
        const { email, password } = req.body;

        if(!email || !password){
          return  res.status(400).json({ msg: 'email and password is required'});
        }
          
        const user = await User.findOne({email});
        if(!user){
             return res.status(401).json({ msg: 'Invalid Email aur Password'});
        }

        if(user.status === 'Suspended'){
            return res.status(403).json({msg: 'Account suspended'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({ msg: 'Invalid password'});
        }

       const accessToken = generateAccessToken(user);
       const refreshToken = generateRefreshToken(user);

       user.refreshToken = refreshToken;
       user.lastActive = new Date();
       await user.save();

        res.json({
            accessToken,
            refreshToken,
            user: user.toSafeJSON()
        });

     } catch (error) {
        res.status(500).json({ msg: 'Login failed', error:error.message});
     }
}



 async function refresh(req,res){
    try {
        
      const {refreshToken} = req.body;

      if(!refreshToken){
        return res.status(401).json({ msg: 'Refresh token required'});
      }

      const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);

      const user = await User.findById(decoded.id);

      if(!user || user.refreshToken !== refreshToken){
        return res.status(401).json({ msg: 'Invalid refresh token'});
      }

     const accessToken = generateAccessToken(user);

     res.json({accessToken});

    } catch (error) {
        res.status(401).json({ msg: 'Refresh token expired or Invalid'});
    }
 }


 async function Logout(req,res){
    try {
        const{refreshToken} = req.body;

        if(refreshToken){
            await User.findOneAndUpdate(
                {refreshToken},
                { refreshToken: null}
            );
        }

       return res.json({ msg: 'Logged out successfully'});
    } catch (error) {
       return9-
       
       
       
        res.json(500).json({msg:'logout failed', error: error.message});
    }
 }


module.exports = { register, Login, refresh , Logout};