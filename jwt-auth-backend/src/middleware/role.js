function checkRole(...allowedRoles){
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({msg : 'Access denied: insufficient permission'})
        }
        next();
    }
}

module.exports = checkRole;