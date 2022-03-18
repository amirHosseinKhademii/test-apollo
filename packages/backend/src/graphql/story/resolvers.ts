import { StoryModel } from "../../models";
import { TContext } from "../../types/apollo";
import type { TStory } from "../../types/story";
import { auth } from "../../utils";

export const storyResolvers = {
  Query: {
    userStories: async (
      _: any,
      {
        page = 0,
        title,
        userId,
      }: { page: number; title: string; userId: string }
    ) => {
      try {
        const stories = await StoryModel.find({
          user: userId,
          ...(title && { title: { $regex: title, $options: "i" } }),
        })
          .limit(5)
          .skip(page * 5)
          .populate("user")
          .sort({ title: -1 });

        if (stories.length === 5)
          return {
            prev: page === 0 ? null : page - 1,
            next: page + 1,
            data: stories,
          };
        else
          return {
            prev: page === 0 ? null : page - 1,
            next: null,
            data: stories,
          };
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
  Mutation: {
    addStory: async (_: any, args: TStory, context: TContext) => {
      const user = auth(context);
      try {
        const newStroy = new StoryModel({
          ...args,
          user: user.id,
        });

        const res = await newStroy.save();
        return res;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
};
