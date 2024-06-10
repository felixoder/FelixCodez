import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../utils/error';
import User, { IUser } from '../models/auth.model';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const secret = 'efgkefhefhefhefwhiuhefhefhef';


// to add a new admin just toggle it up

// export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { email, password } = req.body;
//     if (!email || !password || email === "" || password === "") {
//         return next(errorHandler(400, "All fields are required"));
//     }

//     const hashedPassword: string = bcryptjs.hashSync(password, 10);
//     const newUser = new User({ password: hashedPassword, email });

//     try {
//         await newUser.save();
//         res.json("Signup is successful");
//     } catch (error) {
//         next(error);
//     }
// };

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    try {
        // Find the user in the database
        const user: IUser | null = await User.findOne({ email });

        // If user is not found, return error
        if (!user) {
            return next(errorHandler(404, "No User Found"));
        }

        // Verify password
        const isPasswordValid: boolean = bcryptjs.compareSync(password, user.password);

        // If password is invalid, return error
        if (!isPasswordValid) {
            return next(errorHandler(400, "Invalid Password"));
        }

        // Generate JWT token
        const token: string = jwt.sign(
            { id: user._id, email: user.email }, // Include any payload you need
            secret
        );

        // Send response with token
        res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json(user);
    } catch (error) {
        // Handle errors
        next(error);
    }
};
export const signout = (req:Request, res:Response, next:NextFunction) => {
    try {
      res
        .clearCookie("access_token")
        .status(200)
        .json("User has been signed out");
    } catch (error) {
      next(error);
    }
  };