import { Types } from "mongoose";
import { TUser } from "./user";

export type TTodo = {
  id?: string;
  user: Types.ObjectId;
  date: string;
  title: string;
  description?: string;
  completed?: boolean;
  created_at?: string;
  updated_at?: string;
  order?: number;
};
