const Cat = require('../../models/category.model')
const slugify = require('slugify');
const addCat = async(req,res)=>{
    // const {name, description} = req.body
    const name = req.body.name
    const description = req.body.description

    try{
        const cat = new Cat({
            name,
            description,
            slug: slugify(name,{
                            lower: true,
                            strict: true
                        } ),
            posts: []

        })
        await cat.save()
        return res.status(200).json({message:"category added succesfully" })
      }
      catch(err){
        return res.status(500).json({err:"something went wrong" })
      }
      
    }
const viewCats = async(req, res)=>{
 
 try{

    const cats = await Cat.find().populate('posts')
    return res.status(200).json({cats})
   }
   catch(err){
     return res.status(500).json({message:"no category  found" })
   }

}
const viewCat = async(req, res)=>{
//  const slug = req.params.slug
const catId = req.params.id
 try{

    // cat = await Cat.findOne({slug:req.params.slug}).populate('posts');
    const cat = await Cat.findById(catId).populate('posts')
    return res.status(200).json({cat})
   }
   catch(err){
     return res.status(500).json({message:"no category  found" })
   }

}
const editCat = async (req,res) =>{
    const {name, description, slug} = req.body
    // const slugId = req.params.slug
    const id = req.params.id
    try{
    //   const cat = await Cat.findOneAndUpdate(slugId,{
    //     name,
    //     description,
    //     slug: slugify(name,{
    //         lower: true,
    //         strict: true
    //   })
    // })
      const cat = await Cat.findByIdAndUpdate(id,{
        name,
        description,
        slug: slugify(name,{
            lower: true,
            strict: true
      })
    })
    //   const edit_cat = await cat.updateOne({
    //     name,
    //     description,
    //     slug: slugify(name,{
    //         lower: true,
    //         strict: true
    //   })  
    // })
    // const cat = await Cat.findByIdAndUpdate(slugId,{
    //     name,
    //     description,
    //     slug: slugify(name,{
    //                 lower: true,
    //                 strict: true
    //           })  
    // })
    //     name,
    //     description,
    //     slug: slugify(name,{
    //         lower: true,
    //         strict: true
    //     } )
    //   })
      return res.status(200).json({message:"category updated succesfully" })
    }
    catch(err){
      return res.status(500).json({message:"Something went wrong" })
    }
    
  }
  const delCat = async(req, res) =>{
    const catSlug = req.params.slug
    try{
     const post = await Cat.findOneAndDelete(catSlug);
      return res.status(200).json({message: "category deleted successfully"})
    }
    catch(err){
      return res.status(500).json({message:"no post found" })
    }
  }
    module.exports = {addCat, viewCats, viewCat, editCat, delCat}