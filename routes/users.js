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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const { username, password} = req.header;

    try{
        const user = await User.findOne({
            username: username,
            password: password
        })
        if(user){
            User.updateOne({
                username: username
            },{
                "$push": {
                    purchasedCourses: courseId
                }
            })
            res.json({
                msg: "Purchased Complete!"
            })
        }else{
            return req.status(403).json({msg: "User Doesn't exist"});
        }
    }catch(error){
        console.log("This is the error: ", error);
        return req.status(403)
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router