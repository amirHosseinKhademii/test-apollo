import { PubSub } from "graphql-subscriptions";
import { TodoModel } from "../../models";
import { TContext } from "../../types/apollo";
import type { TTodo } from "../../types/todo";
import { auth } from "../../utils";

const pubsub = new PubSub();

export const todoResolvers = {
  Query: {
    todos: async (
      _: any,
      { page = 0, title }: { page: number; title: string },
      context: TContext
    ) => {
      const user = auth(context);
      try {
        const todos = await TodoModel.find({
          user: user.id,
          ...(title && { title: { $regex: title, $options: "i" } }),
        })
          .limit(5)
          .skip(page * 5)
          .populate("user")
          .sort({ title: -1 });

        if (todos.length === 5)
          return {
            prev: page === 0 ? null : page - 1,
            next: page + 1,
            data: todos,
          };
        else
          return {
            prev: page === 0 ? null : page - 1,
            next: null,
            data: todos,
          };
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
  Mutation: {
    addTodo: async (_: any, args: TTodo, context: TContext) => {
      const user = auth(context);
      try {
        const newTodo = new TodoModel({
          ...args,
          user: user.id,
          created_at: new Date().toDateString(),
          updated_at: new Date().toDateString(),
        });
        pubsub.publish("TODO_CREATED", { todoCreated: args });
        const res = await newTodo.save();
        return res;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    deleteTodo: async (_: any, args: { id: string }, context: TContext) => {
      const user = auth(context);
      if (user)
        try {
          const res = await TodoModel.findOneAndRemove({
            user: user.id,
            _id: args.id,
          });
          return res;
        } catch (error) {
          console.error(error);
          return error;
        }
    },
    completeTodo: async (
      _: any,
      { id, completed }: { id: string; completed: boolean },
      context: TContext
    ) => {
      const user = auth(context);
      if (user)
        try {
          const res = await TodoModel.findOneAndUpdate(
            {
              user: user.id,
              _id: id,
            },
            { completed }
          );
          return res;
        } catch (error) {
          console.error(error);
          return error;
        }
    },
  },
  Subscription: {
    todoCreated: {
      subscribe: () => pubsub.asyncIterator(["TODO_CREATED"]),
    },
  },
};
