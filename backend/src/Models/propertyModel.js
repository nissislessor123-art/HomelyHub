import slugify from 'slugify';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    
    propertyName:{
        type:String,
        required:[true,"please enter your property name"]

    },
    
    description:{
        type:String,
        required:[true,"please add information about your property"]
    },
    extraInfo:{
        type:String,
        default:"good services"
    },
    propertyType:{
        type:String,
        enum:["House","Flat","Guest House",'Hotel'],
        default:"House"
    },
    roomType:{
        type:String,
        enum:["Anytype","Room","Entire home"],
        default:"Anytype"
    },
    maximumGuest:{
        type:Number,
        required:[true,"please enter max guests you can accomidate per room"]
    },
    amenities:[
        {
        name:{
            type:String,
            required:true,
            enum:["Wifi",
                "kitchen",
                "Ac",
                "Waching machine",
                "Tv",
                "pool",
                "Free Parking"]
        },
        icon:{
            type:String,
            required:true,
        }
        }
    ],
    images:{
        type:[{
            public_id:{
                type:String,
            },
            url:{
                type:String,
                required:true
            }

        }],
        validate:{
            validator:function(arr){
                return arr.length>=6;
            },
            message:" should provide atleast 6 images"
        }
    },
    price:{
        type:Number,
        required:[true,"please enter the price for a single night"],
        default:1000

    },
    address:{
        area:String,
        city:String,
        state:String,
        pincode:Number
    },//to show on what dates the booking is aleady booking is aleady done and is not available
    currentBookings:[
        {
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"booking"
            },
            fromDate:{
               type:Date

            },
            toDate:{
             type:Date
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
    }
],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug:String,
    checkInTime:{
        type:String,
        default:"11:00"
    },
    checkOutTime:{
        type:String,
        default:"13:00"
    },


    })
// property name to url friendly 
propertySchema.pre("save", function(){
    this.slug = slugify(this.propertyName,{lower:true});
    
})

//remove space and convert to lowercase 
propertySchema.pre("save",function(){
    this.address.city = this.address.city.toLowerCase().replaceAll(" ","")
    
})

const Property = mongoose.models.Property|| mongoose.model("Property",propertySchema)

export{Property};