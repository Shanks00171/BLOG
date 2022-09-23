const express = require('express')
const req = require('express/lib/request')
const { redirect } = require('express/lib/response')
const res = require('express/lib/response')
const router = express.Router()
const Article = require('./../models/page')


router.get('/',(req,res)=>{
    res.render("pages/page", {bozo: new Article()})
})

router.get('/edit/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('pages/edit',{bozo:article})
})

router.get('/:slug', async (req,res)=>{

    const article = await Article.findOne({slug : req.params.slug})
    if(article==null) res.redirect('/')
    res.render('pages/show',{article:article})
})

router.post('/',async (req,res,next)=>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('page'))

router.put('/:id',async (req,res,next) => {
    req.article = await Article.findById(req.params.id)
    console.log(req.article)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async(req,res)=>{
        let article = req.article
        console.log(req.article)
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
        try{    
            article = await article.save(),
            // console.log('Id = '+article.id)
            res.redirect(`page/${article.slug}`)
        }catch(err){
            // res.send(err)
            // in the next line the within {} the first term is the variable name that is being passed and the second is the value which is being passed to the location within the qoutes.
            console.log(err)
            res.render(`page/${path}`, {bozo:article})
    
        }
    }
}


module.exports = router