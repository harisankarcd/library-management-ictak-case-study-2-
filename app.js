const express=require('express')
const bookdata=require("./src/model/bookdata")
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./scratch'); 
// localStorage.setItem('add',false)
localStorage.setItem('logged',false)
localStorage.setItem('add',false)


const nav=[
    {
        link:'/books',
        name:'books'
    },
    {
        link:"/authors",
        name:"Authors"
    
    },
    {
        link:"/admin",
        name:"Add books"
    
    }
,  {
    link:"/login",
    name:"log in"

}
,
{
    link:"/signup",
    name:"sign up"

}
,
{
    link:"/logout",
    name:"logout"
}]
const bookRouter=require("./src/routes/bookRouter")(nav)
const addbookRouter=require("./src/routes/addbook")(nav)
const loginRouter=require("./src/routes/login")(nav)
const SignUpRouter=require("./src/routes/signup")(nav)
const mongoose=require('mongoose')
const editbookrouter=require("./src/routes/editbooks")(nav)
const addAuthorRouter=require("./src/routes/authors")(nav)
const logOutRouter=require('./src/routes/logout')(nav)

var app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))
app.set('view engine','ejs')
app.set('views','./src/views')
app.use("/books",bookRouter)
app.use("/admin",addbookRouter)
app.use('/login',loginRouter)
app.use('/signup',SignUpRouter)
app.use('/authors',addAuthorRouter)
app.use('/logout',logOutRouter)
app.get("/",(req,res)=>
{
var add=localStorage.getItem('add')

    // console.log(localStorage.getItem('add'))

    if(add=='false')
    {
        add=false
    }
    else{
        add=true
    }
    logged=localStorage.getItem('logged')

    if(logged=='false')
    {
        logged=false
    }
    else{
        logged=true
    }
    console.log(logged)
    res.render("index",
    {nav,
    title:"Library",
add:add,logged:logged})
})
app.get("/view",async (req,res)=>
{
    let result= await bookdata.find()
    res.send(result)

})
app.all("*",(req,res)=>
{
    res.status(404).send("<h1>404 page not found</h1>")
})

app.listen(3000)