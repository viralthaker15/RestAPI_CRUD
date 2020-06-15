const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    Id : {
        type : String,
        required : true,
        trim : true
    } ,

    Name : {
        type : String,
        required : true,
        trim : true
    } , 
    Age : {
        type : Number,
        required : true,
        trim : true
    } ,

    pno : {
        type : Number,
        required : true,
        trim : true
    }
})

const User = mongoose.model('User' , userSchema)

module.exports = User