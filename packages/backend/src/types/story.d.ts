import { Types } from "mongoose";
import { TUser } from "./user";

export type TStory = {
  id?: string;
  todo: Types.ObjectId;
  title: string;
};
