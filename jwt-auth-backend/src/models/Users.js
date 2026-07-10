const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({

   name:{
    type: String,
    required: true
   },

   email:{
     type: String,
     required: true,
     unique: true
   },

   password: {
      type: String,
      required: true
   },

   role: {
      type: String,
      enum: ["Admin", "Editor", "Viewer"],
      default: "Viewer"
   },

   status: {
      type: String,
      enum: ["Active","Invited","Suspended"],
      default: "Active"
   },

   lastActive: {
      type: Date
   },

   refreshToken: {
       type: String
   }

});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.comparePassword = function(candidatePassword){
   return bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.toSafeJSON = function() {
   const initials = this.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

    return {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      status: this.status,
      initials,
      lastActive: this.lastActive,
    };
};






module.exports = mongoose.model("User", userSchema);