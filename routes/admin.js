const adminmiddleware = require('../middleware/adminmiddleware');

const Router = require('express').Router;

const adminRouter = Router();

const {Admin,Course}  = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_ADMIN_SECRET} = require('../config');

adminRouter.post('/signin', async function(req, res) {

        try{
                const { email, password } = req.body;

                const findedAdmin = await Admin.findOne({ email, password });

                if (!findedAdmin) {
                return res.status(401).json({ message: 'Unauthorized' });
                }
                
                const token = jwt.sign({email}, JWT_ADMIN_SECRET);

                return res.json({ token,message: 'Logged in' });
        }

        catch(err){
                return res.json({ message: 'Error during signin' });
        }
});

adminRouter.post('/signup', async function(req, res) {
        const { email, password } = req.body;

        try{

                await Admin.create({ email, password });

                res.json({ message: 'signed up' });
        }

        catch(err){
                res.json({ message: 'Error during signup' + err.message });
        }

});

adminRouter.post('/addcourse',adminmiddleware, async function (req, res) {
        try{
                const {title,description,price,imageUrl} = req.body;
                const creatorId = req.userid;
                await Course.create({title,description,price,imageUrl,creatorId});

                return res.json({ message: 'added' });
        }
        catch(err){
                return res.json({ message: 'Error while adding course' + err.message });
        }
});


module.exports = adminRouter;