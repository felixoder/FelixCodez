import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  message: string;

}

const messageSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Message = mongoose.model<IUser>('Message', messageSchema);

export default Message;
