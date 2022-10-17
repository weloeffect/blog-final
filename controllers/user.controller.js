const User = require('../models/user.model')
const Role = require('../models/role.model')
const Testmodel = require('../models/test')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//signup controller
function createToken(_id){
    return   jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )
  }

const viewUsers = async (req,res) => {
    try{

       users= await User.find();
       return res.status(200).json({user: users})
      }
      catch(err){
        return res.status(500).json({message:"no user  found" })
      }
}  
const viewUser = async (req,res) => {
    const id = req.params.id
    let user;
    try{

       user= await User.findById(id);
       return res.status(200).json({user: user})
      }
      catch(err){
        return res.status(500).json({message:"no user  found" })
      }
}  
const signupUser = async (req, res) => {
    const { firstname, lastname, email, password, role, role_id} = req.body;
    if (!( firstname || lastname || email || password )) {
        res.status(400).json({ message: "all fields must be filled!" });
    } else {
        try{
            if(!validator.isEmail(email)){
                throw Error('email is not valid')
            }
            if(!validator.isStrongPassword(password)){
                throw Error('password is not strong enough')
            }
            
            const resultEmail = await User.findOne({
                email: email,
                
            })
            if(resultEmail){
                res.status(400).json({
                    message: 'User already exists!',
                });

            }
            else{
                const user_role = await Role.create({
                    role:'user',
                    description :'userRole'
                 })
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                const user = await User.create({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                    role_id: user_role._id,
                    posts: []

                });
                const token = createToken(user._id)
               return  res.status(200).json({success: "user added succesfully", token, user: user})
            
            }
        }
        catch(err){
            res.status(500).json({
                message: 'Something went wrong!',
                error: err
            });
        }
}
}
const signupUser2 = async (req, res) => {
    const { firstname, lastname, email, password,role, role_id} = req.body;
    if (!( firstname || lastname || email || password )) {
        res.status(400).json({ message: "all fields must be filled!" });
    } else {
        try{
            if(!validator.isEmail(email)){
                throw Error('email is not valid')
            }
            if(!validator.isStrongPassword(password)){
                throw Error('password is not strong enough')
            }
            
            const resultEmail = await User.findOne({
                email: email,
                
            })
            if(resultEmail){
                res.status(400).json({
                    message: 'User already exists!',
                });

            }
            else{
                const user_role = await Role.create({
                    role:'user',
                    description :'userRole'
                 })
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                const user = await Testmodel.create({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                    role_id: user_role._id,
                    posts: []

                });
                const token = createToken(user._id)
               return  res.status(200).json({success: "user added succesfully", token, user})
            
            }
        }
        catch(err){
            res.status(500).json({
                message: 'Something went wrong!',
                error: err
            });
        }
}
}
//login controller
const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // const adminRole = req.body.role_id;
    // const {email, password, role_id} = req.body
    if(!email || !password){
        throw Error('all fields must be filled')
    }
    try{
        
         const user = await  User.findOne({
            email
        })
        if(!user){
            throw Error("invalid email or password")
        }
        const userRole = user.role_id
        const findUser = await Role.findById(userRole)
        if(findUser.role == 'user'){        
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            throw Error("invalid email  or password")
        }
        const token = createToken(user._id)
        res.status(200).json({message:" user login successful", token, user})
    }
        else{
            res.status(500).json({message:" user login failed"})
        }

    }   
    
    catch(err){
        res.status(400).json({error : err.message})
    }

    
   
}

module.exports = {viewUsers,signupUser, loginUser, viewUser, signupUser2}
