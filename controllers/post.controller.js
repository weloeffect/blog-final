// const Img = require('../models/image.model')
const Post = require('../models/post.model')
const slugify = require('slugify');
const User = require('../models/user.model');
const Test = require('../models/test')
const Cat = require('../models/category.model')
const mongoose = require('mongoose')
const Img = require('../models/image.model')


const viewPosts = async(req, res) => {
  
  try{

    posts = await Post.find().populate('user');
   return res.status(200).json({ posts})
  }
  catch(err){
    return res.status(500).json({message:"no post found" })
  }
  
}
const viewPost = async(req, res) => {
  const postId = req.params.id
  // const slugId = req.params.slug
  try{

   const post = await Post.findById(postId);
   return res.status(200).json({post: post})
  }
  catch(err){
    return res.status(500).json({message:"no post found" })
  }
  
}
const viewPost2 = async(req, res) => {
  // const postId = req.params.id
  // const slugId = req.params.slug
  try{

  //  const post = await Post.findById(postId);
  //  return res.status(200).json({post: post})
  const post = await Post.findOne({slug:req.params.slug});
  return res.status(200).json({post: post})
  }
  catch(err){
    return res.status(500).json({message:"no post found" })
  }
  
}

const addPost = async(req,res)=>{
  const thumbnail = req.file.filename; 
  const {  title, slug, description,user} = req.body
  const catId = req.params.id
  var existingCat;
  var existingUser;
  
  try{
       existingCat = await Cat.findById(catId)
       existingUser = await User.findById(user)
    if(!existingCat || !existingUser){
      return res.status(400).json({message:"unexpected error happened" })
    
  }
  //      existingUser = await User.findById(user)
  //   if( !existingUser){
  //     return res.status(400).json({message:"unexpected error happened" })
    
  // }
}
    catch(err){
      console.log(err)
    }
    
    const post = new Post({
      thumbnail,
      title,
      slug: slugify(title,{
        lower: true,
        strict: true
    } ),
      description,
      category: catId,
      user,
      
        
  
  })
  try{
  const session = await mongoose.startSession()
  session.startTransaction();
  await post.save({session});
  existingCat.posts.push(post)
  existingUser.posts.push(post)
  await existingCat.save({session})
  await existingUser.save({session})
  await  session.commitTransaction();

  return res.status(200).json({message:"post created succesfully" })
  }
  catch(err){
    return  res.status(500).json({error:err })
    }
  
}

const editPost = async (req,res) =>{
  const thumbnail = req.file.filename; 
  const {title, description} = req.body
  const postId = req.params.id

  try{
  
    const editPost = await Post.findByIdAndUpdate(postId,{
      thumbnail,
      title,
      description
    })
    return res.status(200).json({message:"post updated succesfully" })
  }
  catch(err){
    return res.status(500).json({message:"Something went wrong" })
  }
  
}
const delPost = async (req,res) =>{
  const postId = req.params.id
  try{

   const post = await Post.findByIdAndRemove(postId).populate('user');
   await post.user.blogs.pull(post)
   await post.user.save()
    return res.status(200).json({message: "post deleted successfully"})
  }
  catch(err){
    return res.status(500).json({message:"no post found" })
  }
}

const userPosts = async (req, res) =>{
  const userId = req.params.id
  try{

    const userPost = await User.findById(userId).populate('posts');
     return res.status(200).json({user: userPost})
   }
   catch(err){
     return res.status(400).json({message:"no post found" })
   }
}

// Image related data 
const addImg = async (req, res) => {
    const image = req.file.filename;
    
  try{
    const img = await Img.create({
      image,
   });
   res.status(200).json({success: "image added succesfully", photo: img})
  }
  catch(err){
    res.status(400).json({Error: err})
  }
   
}

const viewImg = async (req, res) =>{
  const allData = await Img.find();
  res.json(allData)
}

module.exports = {viewPosts, viewPost ,addPost, editPost, delPost, userPosts, addImg, viewImg, viewPost2}