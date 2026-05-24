const mongoose=require("mongoose");
const validator=require("validator")

const userSchema=mongoose.Schema({
  firstName:{
    type:"String",
    required:true,
    minLength:4,
    maxLength:200
  },
  lastName:{
    type:"String",
    minLength:4,
    maxLength:200
  },
  emailId:{
    type:"String",
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    minLength:4,
    maxLength:200,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address:" + value);
      }
    }
  },
  password:{
    type:"String",
    required:true,
    minLength:4,
    maxLength:200,
     validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("plz enter strong password");
      }
    }
  },
  age:{
    type:"Number",
    min:18
  },
  gender:{
    type:"String",
    required:true,
    validate(value){
      if(!["male", "female", "other"].includes(value)){
        throw new Error("Gender name not valid!");
      }
    }
  },
  photoUrl:{
    type:"String",
    minLength:1,
    maxLength:5000
  },
  about:{
    type:"String",
    default:'this is default value',
    minLength:4,
    maxLength:5000
  },
  skills:{
    type:[String],
  }
},{
  timestamps:true
})

module.exports=mongoose.model("User", userSchema)