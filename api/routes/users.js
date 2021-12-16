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
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body,
                },
                { new : true }
            );
            const { password, ...others } = updatedUser._doc;
            res.status(200).json(others);
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
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({ username: username});
        const { password, updatedAt, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all users
router.get("/all", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get recommend friends
router.get("/recommend/:userId", async (req, res) => {
    try {        
        const currentUser = await User.findById(req.params.userId);

        let exceptUsers = currentUser.followings;
        exceptUsers.push(currentUser._id);
   
        const friendsList = await User.aggregate([
            { $match: { _id: {$nin: exceptUsers} } },
            { $sample: { size: 5 } },
        ]);

        res.status(200).json(friendsList);

        // const users = await User.find(
        //     { _id: {$ne: currentUser._id} }
        // );
      
        // let friendsList = [];
        // friendsList = users.filter(user => !currentUser.followings.includes(user._id));

        // res.status(200).json(friendsList);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId);
            })
        );

        let friendsList = [];
        friends.map(friend => {
            const { _id, username, fullName, profilePicture } = friend;
            friendsList.push({ _id, username, fullName, profilePicture });
        });
        res.status(200).json(friendsList);
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