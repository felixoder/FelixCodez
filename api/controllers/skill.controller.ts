import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error";
import Skill from "../models/skill.model";

export const createSkill = async(req:Request, res:Response, next:NextFunction) =>{
    const { name_skill, banner, experience_level } = req.body;

  if (!name_skill ||  !experience_level || !banner ) {
    return next(errorHandler(404, 'Please fill all the fields'));
  }

  

  const newSkill = new Skill({ ...req.body });

  try {
    const savedProject = await newSkill.save();
    res.status(200).json(savedProject); // Correct status method
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
}


export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  const sortDirection = req.query.order === 'asc' ? 1 : -1;

  try {
    const skills = await Skill.find()
      .sort({ updatedAt: sortDirection })
      

    res.status(200).json({ skills });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
