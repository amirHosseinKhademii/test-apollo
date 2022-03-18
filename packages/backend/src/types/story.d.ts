import { Types } from "mongoose";
import { TUser } from "./user";

export type TStory = {
  id?: string;
  user: Types.ObjectId;
  title: string;
};
