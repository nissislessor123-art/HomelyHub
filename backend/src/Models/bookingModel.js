//which property which user price dates guests paid or not
// we takke o nly the id instead for whole schema


import mongoose from "mongoose";
const bookingSchema= new mongoose.Schema({
    property: {
       type:mongoose.Schema.ObjectId,
       ref:"Property",
       required:[true,"booking must belong to a property"]
    }, 
    user:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:[true,"booking must belong to a property"]
    },
    price:{
        type:Number,
        required:[true,"booking must have a price"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    paid:{
        type:Boolean,
        default:true
    },
    fromDate:{
        type:Date

    },
    toDate:{
        type:Date
    },
    guests:{
        type:Number
    },
    numberOfnights:{
        type:Number
    }
},
{timestamps:true}

);
bookingSchema.pre(/^find/,function(){
    this.populate("user");
        
        this.populate({
        path:"property",
        select:"maximumGuest images propertyName address "
    });
   
})
const booking = mongoose.model("booking",bookingSchema);

export {booking};
    