//user scheme
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { stringify } from 'node:querystring'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried: [true,"please enter you name"],
        trim: true,
        maxlength: [50,"your name cannot ne longer then 50 character"]
    },
    email:{
        type:String,
        requried: [true,"please enter you email id"],
        unique: true,
        lowercase: true,
        trim: true,
        validate:[validator.isEmail, "please enter valid email"],//testgmail
        },
    password:{
        type:String,
        requried: [true,"please enter your password"],
        minlength: [6,"your password must be longer then 6 character"],
        select:false,
    },
    passwordConfirm :{
        type:String,
        requried: [true,"please enter your correct password"],
        minlength: [6,"your password must be longer then 6 character"],
          validate:{
             validator:function(el){//place holder
               return el === this.password
            },
             message: "password not same"
          }},
    phoneNumber:{
            type:String,//+91
            requried: [true,"please enter your correct phonemumber"],
            unique:true,
            trim:true,
        },
    role:{
            type:String,
            enum:["user","admin"],//only these 2 values
            default:"user",

        },
    avatar:{
            url:{type:String},
            public_id:{type:String}

        },
     passwordChangedAt:{
            type:Date,
        },
     passwordResetToken:{//forgot password
            type:String,
            select:false,
            index:true,
        },
     passwordResetExpires:{
            type:Date,
            select:false,
        },
     wishlist: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    },
],


    },
    {timestamps:true}// auto timestands
)
//settings to not pass in responses from server
userSchema.set("toJSON",{
    trnsform:function(doc,ret){
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpries;
        delete ret._v;//mongo verrsion number
        return ret;

    }
})

//password logic
//hashing password to scramble
//not possible to decrypt
userSchema.pre('save',async function(){// we never call this fun bcz pre auto
     if (!this.isModified("password"))return;

     this.password =await bcrypt.hash(this.password,12);
     this.passwordConfirm = undefined;
})

//login check
userSchema.methods.correctPassword =async function(candidatePassword,userPassword){
return await bcrypt.compare(candidatePassword,userPassword)
}
//steals token then changed old token delete
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if (this.passwordChangedAt){
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTimee()/1000,
            10
        );
        return JWTTimestamp<changedTimeStamp
    }
    return false;
}
//forgot password
userSchema.methods.createPasswordResetToken= function(){
    const resetToken= crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.passwordResetExpires = Date.now()+10*60*1000;//link dies after10mins
    return resetToken;
}

const User = mongoose.model("User", userSchema);

export{User};
