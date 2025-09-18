const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} = require("../db/index")
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    console.log("This is the request body",req.body);
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username,
        password
    })
    res.status(200).json({
        msg: "Admin created successfully"
    })

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const {title,description,price,imageLink} = req.body;
    const course = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.status(200).json({
        msg:"Course created Successfully",
        courseId:course._id
    })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({
        courses:allCourses
    })
});

module.exports = router;