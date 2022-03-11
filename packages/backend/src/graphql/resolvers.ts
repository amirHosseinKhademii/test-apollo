import { todoResolvers } from "./todo/resolvers";
import { userResolvers } from "./user/resolvers";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation,
  },
  Subscription: {
    ...todoResolvers.Subscription,
  },
};
