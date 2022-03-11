import { Schema, model } from "mongoose";
import type { TTodo } from "../../types/todo";

const TodoSchema = new Schema<TTodo>({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  completed: Boolean,
  created_at: String,
  updated_at: String,
  order: Number,
});

export const TodoModel = model<TTodo>("todos", TodoSchema);
