import { NextFunction, Request, Response } from "express";
import Project from "../models/project.model";
import { errorHandler } from "../utils/error";
import mongoose from "mongoose";

// Create a new project
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  const { name_project, banner, details, techstack, livelink, githublink } = req.body;

  if (!name_project || !banner || !details || !techstack || !livelink || !githublink) {
    return next(errorHandler(404, 'Please fill all the fields'));
  }

  const slug = (name_project + details.trim())
    .split('')
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const newProject = new Project({ ...req.body, slug });

  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject); // Correct status method
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Get all projects
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  const sortDirection = req.query.order === 'asc' ? 1 : -1;

  try {
    const projects = await Project.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.projectId && { _id: req.query.projectId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      

    res.status(200).json({ projects });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};




// Delete a project by ID
export const deleteProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    res.status(200).json('The project has been deleted successfully');
  } catch (err) {
    next(err);
  }
};

// Update a project by ID
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  const { name_project, banner, details, techstack, livelink, githublink } = req.body;

  if (!name_project || !banner || !details || !techstack || !livelink || !githublink) {
    return next(errorHandler(404, 'Please fill all the fields'));
  }

  const slug = (name_project + details.trim())
    .split('')
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      { ...req.body, slug },
      { new: true } // return the updated document
    );

    if (!updatedProject) {
      return next(errorHandler(404, 'Project not found'));
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
