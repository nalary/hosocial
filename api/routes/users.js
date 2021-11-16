const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).json(err);
            }
        }

        try {
            await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated.");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account.");
    }
});

// delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {        
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted.");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete only your account.");
    }
});

// get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// follow user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(currentUser._id)) {    // req.body.userId
                await user.updateOne({ $push: { followers: currentUser._id } });    // req.body.userId
                await currentUser.updateOne({ $push: { followings: user._id } });   // req.params.id
                res.status(200).json("The user has been followed.");
            } else {
                res.status(403).json("You already followed this user.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cannot follow yourself.");
    }
});

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(currentUser._id)) {    // req.body.userId
                await user.updateOne({ $pull: { followers: currentUser._id } });    // req.body.userId
                await currentUser.updateOne({ $pull: { followings: user._id } });   // req.params.id
                res.status(200).json("The user has been unfollowed.");
            } else {
                res.status(403).json("You don't follow this user.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cannot unfollow yourself.");
    }
});

module.exports = router;