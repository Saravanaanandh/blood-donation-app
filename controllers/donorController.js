import Donor from './../model/Donar.js'
import User from './../model/User.js'

export const getAllDonars = async(req, res)=>{
    const {_id:userId} = req.user 

    if(!userId) return res.status(401).json({message:"unauthorized user"})

    const donors = await Donor.find({donorId :{$ne: userId, $exists: true},available:true})
    
    if(!donors) return res.status(200).json()

    const donorDetails = await Promise.all(
        donors.map(donor => User.findOne({ _id: donor.donorId }).select('-password'))
    );

    res.status(200).json({donors,donorDetails,count:donors.length})
}

export const getDonar = async (req, res)=>{
    const {_id:userId} = req.user 
    const {id:donorId} = req.params

    if(!userId || !donorId) return res.status(400).json({message:"unauthorized user"})
    if(!donorId) return res.status(400).json({message:"donar id not valid"})
    
    try{
        const donor = await Donor.findOne({donorId})
        const donorDetail = await User.findOne({_id:donorId})

        if(!donor) return res.status(200).json({message:"donar not found"})
        res.status(200).json({donor,donorDetail}) 
    }catch(err){
        if(err.name === "CastError"){
            res.status(400).json({message:"ObjectId not valid"}) 
        }else{
            res.status(400).json({message:err.message})  
        }
    } 
}

export const createDonor = async (req, res)=>{
    const {_id:donorId} = req.user 
    if(!donorId) return res.status(401).json({message:"unauthorized user"})

    try{
        const donor = await Donor.create({...req.body,donorId}) 
        res.status(201).json(donor) 
    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message:"please provide the valid details"})
        }
        res.status(500).json({message:err.name})
    }
}