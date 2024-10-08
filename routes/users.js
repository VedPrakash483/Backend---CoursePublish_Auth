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
            return res.status(403).json({msg: "User Already exists"});
        }else{
            User.create({
                username: username,
                password: password
            })
            return res.status(201).json({msg: "User Created Sucessfully!"});
        }
    }catch(error){
        console.log("This is the error: ", error);
        return res.status(403).json({ msg: "Internal server error" });
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
    const courseId = req.params.courseId;
    const { username } = req.headers;  // Get username from headers

    try {
        // Check if user exists
        const user = await User.findOne({ username: username });

        if (user) {
            console.log("User found:", user);

            // Validate that the course exists
            const courseExists = await Course.exists({ _id: courseId });
            if (!courseExists) {
                return res.status(404).json({ msg: "Course not found." });
            }

            // Check if courseId is already in purchasedCourses
            if (user.purchasedCourses.includes(courseId)) {
                return res.status(400).json({ msg: "Course already purchased." });
            }

            // Update user's purchasedCourses
            const updateResult = await User.updateOne(
                { username: username }, 
                { "$push": { purchasedCourses: courseId } }
            );

            // Log update result for debugging
            console.log("Update Result:", updateResult);

            // Check if any documents were modified
            if (updateResult.modifiedCount > 0) {
                // Verify user after update
                const updatedUser = await User.findOne({ username: username });
                console.log("User after update:", updatedUser);
                return res.json({ msg: "Purchase Complete!" });
            } else {
                return res.status(400).json({ msg: "Course not added. Update failed." });
            }
        } else {
            return res.status(403).json({ msg: "User Doesn't exist" });
        }
    } catch (error) {
        console.log("This is the error:", error);
        return res.status(500).json({ msg: "Internal Error!" });
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