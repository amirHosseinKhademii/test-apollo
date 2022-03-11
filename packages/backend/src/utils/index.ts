import { sign, verify } from "jsonwebtoken";
import config from "config";
import { AuthenticationError } from "apollo-server";
import type { TUser } from "../types/user";
import type { TContext } from "../types/apollo";

const secret: string = config.get("secretKey");

export const auth = (context: TContext) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    if (token) {
      try {
        const user = verify(token, secret) as TUser;
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    } else {
      throw new Error(`token must be '[token]'`);
    }
  } else {
    throw new Error("No token");
  }
};

export const tokenGenerator = (user: TUser) => {
  return sign(
    {
      id: user.id,
      email: user.email,
      userName: user.user_name,
    },
    secret,
    { expiresIn: "100h" }
  );
};
