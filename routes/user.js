const { verify } = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken, verifyTokenandAuth } = require("./verifyToken");

const router = require("express").Router();



router.put("/:id", verifyTokenandAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()

    }
    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,

        },
            { new: true }
        );
        res.status(200).json(updateduser)
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;