const router = require("express").Router()
const User = require("../model/user")
const { registerValidation, } = require("../validation")



router.post("/register", async (req,res) => {

    // lets validate the data before we create user
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if the user already in our database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("email already exist")

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(err)
    }
})

module.exports = router