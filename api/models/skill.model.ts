import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
name_skill : string,
banner ?: string,
experience_level : string,



}

const skillSchema: Schema<ISkill> = new mongoose.Schema<ISkill>(
  {
    name_skill: {
      type: String,
      required: true,
      unique: true,
    },
    banner: {
      type: String,
      required: true,
      default: 'https://unsplash.com/photos/person-holding-pencil-near-laptop-computer-5fNmWej4tAA'
    },
    experience_level: {
      type: String,
      required:true,
    },
    
  },
  { timestamps: true }
);

const Skill = mongoose.model<ISkill>('Skill', skillSchema);

export default Skill;
