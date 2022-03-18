import { StoryModel } from "../../models";
import type { TStory } from "../../types/story";

export const storyResolvers = {
  Query: {
    userStories: async (
      _: any,
      {
        page = 0,
        title,
        todoId,
      }: { page: number; title: string; todoId: string }
    ) => {
      try {
        const stories = await StoryModel.find({
          todo: todoId,
          ...(title && { title: { $regex: title, $options: "i" } }),
        })
          .limit(5)
          .skip(page * 5)
          .populate("todo")
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
    addStory: async (_: any, args: TStory) => {
      try {
        const newStroy = new StoryModel({
          ...args,
          todo: args.todo,
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
