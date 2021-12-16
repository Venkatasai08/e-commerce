const router = require("express").Router();
const User = require("../models/User");
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),

    });
    try {
        const saveduser = await newUser.save();
        res.status(201).json(saveduser)
    } catch (err) {
        res.status(500).json(err)
    }

});
//login
router.post("/login", async (req, res) => {
    // const name=req.body.username
    try {
        const user = await User.findOne({ username: req.body.username })
        // res.send(user)
        !user && res.status(401).json("wrong credentials")

        const hashedpassword = Cryptojs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalpassword = hashedpassword.toString(Cryptojs.enc.Utf8);
        originalpassword !== req.body.password &&
            res.status(401).json("worng credentials")
        
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}
        );
        const {password ,...others}=  user._doc

        res.status(200).json({...others,accessToken})


    } catch (err) {
        res.status(500).json(err)
    }

});

module.exports = router;