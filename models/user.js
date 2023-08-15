import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  phone: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    experience: [
      {
        
        company: String,
        title: String,
      
       
      },
    ],
   
    education: [
      {
        degree: String,
        college: String,
        graduationYear: String,
      },
    ]
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
