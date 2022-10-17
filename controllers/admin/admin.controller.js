const User = require('../../models/user.model')
const Role = require('../../models/role.model')
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
       return res.status(200).json({users})
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
                    role:'admin',
                    description :'adminRole'
                 })
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
               
                const user = await User.create({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                    role_id: user_role._id
                    

                });
                
                const token = createToken(user._id)
                res.status(200).json({success: "admin added succesfully", token})
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
        const adminRole = user.role_id
        const findAdmin = await Role.findById(adminRole)
        if(findAdmin.role == 'admin'){        
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            throw Error("invalid email  or password")
        }
        const token = createToken(user._id)
        res.status(200).json({message:" admin login successful", token, user})
    }
        else{
            res.status(500).json({message:" admin login failed"})
        }

    }   
    
    catch(err){
        res.status(400).json({error : err.message})
    }
   
}
const addUser = async(req,res)=>{
    const { firstname, lastname, email, password,  role, role_id} = req.body;
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
                    blogs: []
                });
                
                res.status(200).json({success: "author added succesfully"})
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
const delUser = async(req,res)=>{
    const userId = req.params.id
    try{
     const user = await User.findByIdAndDelete(userId);
      return res.status(200).json({message: "user deleted successfully"})
    }
    catch(err){
      return res.status(500).json({message:"no user found" })
    }
}
// module.exports = {signupUser, loginUser}
module.exports = {signupUser, loginUser, addUser, delUser, viewUsers, viewUser}