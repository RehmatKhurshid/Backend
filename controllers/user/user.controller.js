import User from "../../models/user/user.model.js";
import bcrypt from 'bcryptjs'
import { logger } from "../../utils/logger.js";
import jwt from 'jsonwebtoken'

/**
 * registerUser method which handles register user into mongodb
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const registerUser = async (req, res, next) => {
    try {

        //TODO install multer for file uploads
      const {firstName, lastName, email, mobile, password, profilePic} = req.body;

        //check if email exists
        const isEmail = await User.findOne({email : email});

        if(isEmail){
            return res.status(200).json({"message" : "Email already exist"})
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            mobile
        })

        await user.save();

        return res.status(201).json({"message" : "register successfull"})
        
    } catch (error) {
      logger.error(`error in registerUser ${JSON.stringify(error)} `);
      res.status(500).json({"message" : "something went wrong"}) 
    }
}

/**
 * loginUser methods handle login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const loginUser = async(req, res, next) =>{
    try {
        const {email, password} = req.body;

        //find email

        const isUser = await User.findOne({email : email});

        if(!isUser){
            return res.status(200).json({"message" : "invalid creds"})
        }

        //campare password

        const isPasswordMacthing = await bcrypt.compare(password, isUser.password);

        if(!isPasswordMacthing){
            return res.status(200).json({"message" : "invalid creds"})
        }

        //create token
        const token = jwt.sign({_id : isUser._id}, 'my_secret', {expiresIn : '1h'});

        //send response

        res.status(201).json({
            id : isUser._id,
            email : isUser.email,
            firstName : isUser.firstName,
            lastName : isUser.lastName,
            mobile : isUser.mobile,
            token
        })

        
    } catch (error) {
        logger.error(`error in registerUser ${JSON.stringify(error)} `);
        res.status(500).json({"message" : "something went wrong"})   
    }
}