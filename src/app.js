const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const User = require('../db/user-model.js')

//Database config 
mongoose.connect('mongodb://localhost:27017/RestAPI' , { useNewUrlParser : true , useUnifiedTopology : true} ) 
var db=mongoose.connection

//logging
db.on('error', console.log.bind(console, "connection error")) 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

const app = express()
const publicDir = path.join(__dirname , '../public')

app.use(express.static(publicDir)) //to serve public dir in express server 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true //true because if it is false it will only parse array and string datatype2
}))

app.get('/' , (req , res) => {
    res.sendFile(publicDir+'/index.html')
})

app.post('/create' ,  async (req , res) => {                   //CREATE

    const check = await User.findOne({ Id: req.body.id})

    if(check)
       return res.send({exist : true})

    var data = {
         Id : req.body.id ,
         Name : req.body.name , //it fetches data using name property instead of id
         Age : req.body.age ,
         pno : req.body.pno
    }

    const user = new User(data)
    await user.save() //the next code wont execute untill this line runs async-await

    res.send(user) // to get back to front page
})

app.get('/read' , async (req , res) => {                //READ
    const users = await User.find({})
    
    const userslist = {}
    var i = 0
    users.forEach( (user) => {
        userslist[i++] = user
    })

    res.send(userslist)
})

app.patch('/update' ,  async (req , res) => {        //UPDATE

    const user = await User.findOne({ Id : req.body.id })

    if(!user)
        return res.send({ exist : false })

    if(req.body.name != '')
        user.Name = req.body.name
    if(req.body.age != '')
        user.Age = req.body.age   
    if(req.body.pno != '')
        user.pno = req.body.pno

    await user.save()
    console.log(user)
    res.send(user)
})

app.delete('/delete' , async (req , res) => {      //DELETE
    const user = await User.findOneAndDelete({ Id : req.body.id }) 

    if(!user)
        return res.send({ exist : false })
    res.send(user)
})

app.listen(3000 , () => {
    console.log('Server is up and running on 3000')
}) 