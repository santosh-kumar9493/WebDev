const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const adminRouter = require('./routes/admin');


app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);


async function main(){
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
    app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
    });
}
console.log('Starting server...');
 main()
console.log('Server started');


