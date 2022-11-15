// import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

// export type DashboardDocument = HydratedDocument<Dashboard>;
//
// @Schema()
// class Dashboard {
//   @Prop()
//
// }

export const DashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  tasks: {
    todo: [
      {
        id: Number,
        name: String,
        date: Date,
        comments: [String],
      },
    ],
    progress: [
      {
        id: Number,
        name: String,
        date: Date,
        comments: [String],
      },
    ],
    done: [
      {
        id: Number,
        name: String,
        date: Date,
        comments: [String],
      },
    ],
    archive: [
      {
        id: Number,
        name: String,
        date: Date,
        comments: [String],
      },
    ],
  },
  publisher: {
    type: String,
    required: true,
  },
});
