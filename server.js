const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Article = require('./models/page')
const app = express()
const pageRouter = require('./routes/page')

mongoose.connect('mongodb://localhost/blogs')

app.set('view engine', 'ejs')


// any query with the route /page will be redirected to the page.js file in the route folder
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',async(req,res)=>{
    const articles = await Article.find().sort(
     {
         date : 'desc'
     }   
    )
// Variables articles and text are passed from here to index.ejs file
res.render('pages/index',{articles: articles})
})

app.use('/page',pageRouter)
app.listen(5000)