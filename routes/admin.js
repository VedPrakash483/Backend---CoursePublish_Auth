const { Router } = require('express');
const { Admin, Course } = require('../db');
const adminMiddleware = require('../middleware/admin');

const router = Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;  // Use destructuring for cleaner code

    try {
        // Find if the admin already exists
        const user = await Admin.findOne({ username, password });
        
        if (user) {
            return res.status(403).json({ msg: "Admin Already exists!" });
        } else {
            // Create a new admin
            await Admin.create({ username, password });
            return res.status(201).json({ msg: "Admin created successfully!" });
        }
    } catch (error) {
        console.log("This is the error: ", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Other routes...
router.post('/courses', adminMiddleware, async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const { title, description, price, imageLink} = req.body;

    try{
        const course = await Course.findOne({ title });
        if(course){
            return res.status(403).json({msg: "Course already exists!"});
        }else{
            const newCourse = await Course.create({
                title: title,
                description: description,
                imageLink: imageLink,
                price: price
            })
            console.log(newCourse);
            return res.status(201).json({ msg: "Course created successfully!", courseId: newCourse._id});
        }
    }catch(error){
        console.log("This is the error: ", error);
        res.status(500).json({
            msg: "Internal Error!"
        })
    }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.log("Error fetching courses:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
