import { NextFunction, Request, Response } from "express";
import { errorHandler } from '../utils/error';
import Message from "../models/message.model";
export const sendMessage = async(req: Request, res: Response, next:NextFunction)=>{
    const { email,message} = req.body;

    if (!email || !message ) {
      return next(errorHandler(404, 'Please fill all the fields'));
    }

  
    const newMessage = new Message({ ...req.body });
  
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage); // Correct status method
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
}


export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
  const sortDirection = req.query.order === 'asc' ? 1 : -1;

  try {
    const message = await Message.find()
      .sort({ updatedAt: sortDirection })
      

    res.status(200).json({ message });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

export const deleteMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Message.findByIdAndDelete(req.params.messageId);
    res.status(200).json('The Message has been deleted successfully');
  } catch (err) {
    next(err);
  }
};