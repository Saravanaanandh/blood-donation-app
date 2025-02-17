import User from './../model/User.js'

export const signupController = async (req, res)=>{
    const {username,age, bloodType,location,pinCode,mobile, email, password} = req.body 
    if(!username || !email || !password || !age || !bloodType || !location || !pinCode || !mobile) return res.status(400).json({message:"please fill required fields"})

    const duplicateUser = await User.findOne({email})
    if(duplicateUser) return res.status(409).json({message:"user already with that email"})
    
    const user = await User.create({...req.body})
    const token = user.createJWT() 
    user.token = token

    res.cookie('jwt',token,{httpOnly:true,maxAge:30*24*60*60*1000, secure:true, sameSite:"None"})
    res.status(201).json(user)
}
export const loginController = async (req, res)=>{
    const {email, password} = req.body 
    if(!email || !password) return res.status(400).json({message:"please fill required fields"})

    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message:"user not found with that email"})
    
    const passwordMatch = await user.comparePassword(password)
    if(!passwordMatch) return res.status(401).json({message:"Incorrect Password"})

    const token = user.createJWT()
    user.token = token

    res.cookie('jwt',token,{httpOnly:true,maxAge:30*24*60*60*1000, secure:true, sameSite:"None"})
    res.status(200).json(user)
}

export const updateProfileController = async (req, res)=>{
    const {location, available, profile, banner, tattooIn12, pinCode, mobile, positiveHIVTest,weight} = req.body

    const user = req.user
    if(!user) return res.status(401).json({message:"unauthorized User"})

    const updatedUser = await User.findOneAndUpdate({email:user.email},{location, available, profile, banner, tattooIn12, pinCode, mobile, positiveHIVTest,weight},{new:true,runValidators:true})

    res.status(200).json(updatedUser)
}

export const logoutController = async (req, res)=>{
    const {email} = req.user

    const user = await User.findOne({email}) 
    if(!user) return res.status(404).json({message:"user not found"}) 
    user.token = ""

    res.clearCookie('jwt','',{httpOnly:true, secure:true, sameSite:"None"})
    res.status(204).json({message:"user logout successfully"})
} 

