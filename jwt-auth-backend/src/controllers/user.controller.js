const User = require('../models/Users');



async function getAllUsers(req,res){
    try {
    const users = await User.find().select("-password -refreshToken");
    const formattedUsers = users.map(user => user.toSafeJSON());
    res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ msg: 'failed to fetch users', error: error.message});
    }
}

async function getStats(req,res){
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: "Active"});

      const stats = [
          { label: "Total Users", value: totalUsers.toString(), delta: "Live data", icon: "Users" },
          { label: "Active Sessions", value: activeUsers.toString(), delta: "Currently active", icon: "ShieldCheck" },
          { label: "Defined Roles", value: "3", delta: "Admin · Editor · Viewer", icon: "KeySquare" },
          { label: "Avg. Token TTL", value: process.env.JWT_EXPIRES_IN || "15m", delta: "Auto-refresh on", icon: "Clock" },
        ];

        res.json(stats);
    } catch (error) {
        res.status(500).json({ msg: "failed to fetch stats", error: error.message});
    }
}


async function inviteUser(req,res){
    try {
        const {name,email,role} = req.body;
        if(!name || !email){
            return res.status(409).json({ msg: "name and email are required"});
        }
       
        const existingUser = await User.findOne({email});
        if(existingUser){
          return res.status(409).json({ msg: 'user already exists'});
        }

        const user = new User({
            name,
            email,
            password: "welcome123",
            role: role || "Viewer",
            status: "Invited"
        });
        await user.save();

        res.status(201).json(user.toSafeJSON());

    } catch (error) {
        res.status(500).json({ msg: "failed to invite user", error: error.message});
    }
}

async function updateUserRole(req,res){
    try {
        const {role} = req.body;
        const validRoles = ["Admin", "Editor", "Viewer"];

        if(!validRoles.includes(role)){
            return res.status(400).json({ msg: "Invalid role"});
        }

         const user = await User.findByIdAndUpdate(
            req.params.id,
            { role},
            { new: true }
         );

         if(!user){
            return res.status(404).json({ msg: "User not found"});
         }

         res.json(user.toSafeJSON());

    } catch (error) {
        res.status(500).json({ msg: 'Failed to update role', error: error.message});
    }
}


async function updateUserStatus(req,res){
    try {
        const {status} = req.body;
        const validStatus = ["Active","Invited","Suspended"];

        if(!validStatus.includes(status)){
            return res.status(400).json({ msg: "Invalid status"});
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}
        );

        if(!user){
            return res.status(404).json({ msg: "user not found"});
        }

        res.json(user.toSafeJSON());
    } catch (error) {
        res.status(500).json({ msg: "Failed to update status", error: error.message});
    }
}

module.exports = { getAllUsers, getStats, inviteUser, updateUserRole, updateUserStatus };
