var mongoose = require('mongoose'),
user = new mongoose.Schema({
name: {
type:String,
index:1
},
age: Number,
status: {
type:String,
required:true
},
groups: [String]
});

var  User= mongoose.model('User',user);
module.exports =  User;