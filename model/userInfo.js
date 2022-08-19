const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    imageUrl:String,
    universityName:String,
    facultyProfile:String,
    learningHours:Number,
    price:Number,
    certificateUrl:String,
    eligibilityCriteria:String
})
mongoose.model('here',userSchema);
module.exports = mongoose.model('here');
// ! collection name of userInfo of course