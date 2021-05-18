let mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    street:{type:String,required:true},
    postcode:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;

