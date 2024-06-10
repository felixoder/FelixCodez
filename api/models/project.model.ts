import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
name_project : string,
banner : string,
details : string,
techstack : string,
livelink ?: string,
githublink: string,
slug: string


}

const projectSchema: Schema<IProject> = new mongoose.Schema<IProject>(
  {
    name_project: {
      type: String,
      required: true,
      unique: true,
    },
    banner: {
      type: String,
      required: true,
      default: 'https://unsplash.com/photos/person-holding-pencil-near-laptop-computer-5fNmWej4tAA'
    },
    details: {
      type: String,
      required:true,
    },
    techstack: {
      type: String,
      required: true
     
    },
    livelink: {
        type:String,

    },
    githublink: {
        type: String,
        required: true
    },
    slug:{
      type:String,
      required: true
    }
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
