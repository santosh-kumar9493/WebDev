const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email : { type: String, unique : true},
    password : String, 
    username: String,
    password: String
});

const adminSchema = new Schema({
    email : { type: String, unique : true},
    password : String, 
    username: String,
    password: String    
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl : String,
    creatorId: ObjectId
});
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin',adminSchema);
const Course = mongoose.model('Course',courseSchema);
const Purchase = mongoose.model('Purchase',purchaseSchema);


module.exports = {
    User,
    Admin,
    Course,
    Purchase
}