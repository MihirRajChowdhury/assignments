const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
        console.log("This is the request body",req.body);
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username,
        password
    })
    res.status(200).json({
        msg: "User created successfully"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.status(200).json({
        courses:courses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username
    const user = await User.updateOne({
        username:username
    },{
        "$push":{
        purchasedCourses:courseId
        }
    })
    res.json({
        msg:"Course Purchased Successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username:req.headers.username
    })
    const purchasedCourses = await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.json({
        msg:"here is all your purchased courses",
        courses:purchasedCourses
    })
});

module.exports = router