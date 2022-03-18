import { Schema, model } from "mongoose";
import { TStory } from "../../types/story";

const StorySchema = new Schema<TStory>({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
});

export const StoryModel = model<TStory>("stories", StorySchema);
