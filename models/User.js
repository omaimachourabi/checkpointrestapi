const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({
    userName : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    telephone : {type : String, required : true},
    adresse : {type : String, required : false}
});

module.exports = mongoose.model('User',userSchema)