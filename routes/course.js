const usermiddleware = require('../middleware/usermiddleware');
const Router = require('express').Router;
const {Course,Purchase}  = require('../db');
const courseRouter = Router();

courseRouter.get('/', usermiddleware, async function (req, res) {
        try{
                const courses = await Course.findAll();
                return res.json({ courses } );
        }
        catch(err){
                return res.json({message:"Error while fetching courses" + err.message});
        }
});

courseRouter.post('/purchase', usermiddleware, async function (req, res) {
        try{
                const userId = req.userid;
                const { courseId } = req.body;
                await Purchase.create({ userId, courseId });
                return res.json({ message: 'course purchase successful' });
        }
        catch(err){
                return res.json({ message: 'Error during course purchase' + err.message });
        }

});
courseRouter.get('/preview', usermiddleware, async function(req, res) {

        try{
                const {courseId} = req.body;
                const course = await Course.findById(courseId);
                return res.json({ course } );
        }
        catch(err){
                return res.json({ message: 'Error during fetching preview' + err.message });
        }
});


module.exports = courseRouter;