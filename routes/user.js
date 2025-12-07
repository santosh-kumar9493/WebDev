const usermiddleware = require('../middleware/usermiddleware');
const Router = require('express').Router;
const userRouter = Router();
const {User,Purchase,Course}  = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_USER_SECRET} = require('../config');

userRouter.post('/signin', async function(req, res) {
    try{
        const { email, password } = req.body;

        const findedUser = await User.findOne({ email, password });

        if (!findedUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = jwt.sign({ email},JWT_USER_SECRET);

        res.json({ token, message: 'Login successful' });
    }
    catch(err){
        console.log(err);
        return res.json({ message: 'Error during signin' });
    }
});

userRouter.post('/signup', async function(req, res) {
    const { email, password } = req.body;
    try{
            await User.create({ email, password });

            return res.json({ message: 'SignUp successful' });
    }
    catch(err){
        console.log(err);
        return res.json({ err});

    }
});

userRouter.get('/purchases',usermiddleware, async function(req, res)  {
    try{
        const userId = req.userId;
        const purchases  = await Purchase.find({userId});
 
        if(!purchases){
            return res.json({ message: 'No purchased courses found' });
        }
        
        else{
            const purchasedCourses = await Course.find({_id: {$in: purchases.map(p => p.courseId)} });
            return await res.json({ purchasedCourses });
        }
    }
    catch(err){
        return res.json({ message: 'Error while fetching purchased courses' + err.message });
    }
});


module.exports = userRouter;