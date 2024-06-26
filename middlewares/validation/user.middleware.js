import jwt from 'jsonwebtoken';
import User from '../../models/user/user.model.js';
import { logger } from "../../utils/logger.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        // console.log('token.......', token)

        if (!token) {
            res.status(401).json({ message: 'unauthorized access' });
        }
        const decode = await jwt.verify(token, 'my_secret');
        const user = await User.findById({ _id: decode._id })
        const { firstname, lastname, email, _id } = user;
        req.user = {
            _id : _id.toHexString(),
            firstname,
            lastname,
            email
        }
        logger.info(req.user);
        next()

    } catch (error) {
        logger.error(error);
        console.log('inside authorization')
        res.status(401).json({ message: 'something went wrong' })

    }

}


export const isAdmin = async (req, res, next) => {

    if (req.user && req.user.admin) {
        next();
    } else {
        res.status(401).json({ message: 'you do not have previledges' })
    }


}