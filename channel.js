var mongoose = require('mongoose'),
channel = new mongoose.Schema({
name: String,
broadcast_hour_start: String,
broadcast_hour_end:String,
isBlock: Boolean,
details:{
    number_channel:Number,
    content:[String]
}
});

var  Channel= mongoose.model('Channel',channel);
module.exports =  Channel;