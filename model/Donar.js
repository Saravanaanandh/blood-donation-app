import mongoose from "mongoose" 

const donorSchema = new mongoose.Schema({
    donorId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    fullname:{
        type:String,
        required:true,
        maxlength:30
    },
    dob:{
        type:Date,
        required:true,
        default:Date.now
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:["MALE","FEMALE"],
        set:value => value.toUpperCase(),
        required:true
    },
    bloodType:{
        type:String,
        required:true,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        set: value => value.toUpperCase()
    },
    district:{
        type:String,
        required:true
    },
    villageCity:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        maxlength:10
    },
    email:{
        type:String,
        required:true,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    donatePre:{
        type:Boolean,
        required:true,
    },
    lastSixmonthActivity:{
        type:String,
        enum:["tattooing","piercing","dental extraction","no"],
        set:value => value.toLowerCase(),
        required:true
    },
    available:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const Donor = mongoose.model('Donor',donorSchema)
export default Donor