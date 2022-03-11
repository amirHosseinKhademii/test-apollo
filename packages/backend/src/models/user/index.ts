import { Schema, model } from "mongoose";
import type { TUser } from "../../types/user";

const UserSchema = new Schema<TUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: String,
});

export const UserModel = model<TUser>("users", UserSchema);
