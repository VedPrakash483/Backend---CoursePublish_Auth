const { Router } = require('express');
const { User, Course } = require('../db');

const router = Router();

const userMiddleware = require('../middleware/users')


// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({
            username: username,
            password: password
        })
        if(user){
            return req.status(403).json({msg: "User Already exists"});
        }else{
            User.create({
                username: username,
                password: password
            })
            return req.status(201).json({msg: "User Created Sucessfully!"});
        }
    }catch(error){
        console.log("This is the error: ", error);
        return req.status(403)
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.log("Error fetching courses:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router