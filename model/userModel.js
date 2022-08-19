const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone: Number,
    role:String
})
mongoose.model('here',userSchema);
module.exports = mongoose.model('here');
// ! collection name of user info data