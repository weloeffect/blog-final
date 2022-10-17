const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images')); 

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Mongodb database connection established successfully");
})

const userRouter =  require('./routes/user.route')
const adminRouter =  require('./routes/admin/admin.route')
const postRouter =  require('./routes/post.route')
const catRouter =  require('./routes/category.route')
// const categoryRouter =  require('./routes/category.route')
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/posts', postRouter)
app.use('/categories', catRouter)
// app.use('/categories', categoryRouter)


if (process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})