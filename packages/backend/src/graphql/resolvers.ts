import { todoResolvers } from "./todo/resolvers";
import { userResolvers } from "./user/resolvers";
import { storyResolvers } from "./story/resolvers";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query,
    ...storyResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation,
    ...storyResolvers.Mutation,
  },
  Subscription: {
    ...todoResolvers.Subscription,
  },
};
