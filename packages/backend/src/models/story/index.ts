import { Schema, model } from "mongoose";
import { TStory } from "../../types/story";

const StorySchema = new Schema<TStory>({
  todo: { type: Schema.Types.ObjectId, ref: "todos", required: true },
  title: { type: String, required: true },
});

export const StoryModel = model<TStory>("stories", StorySchema);
