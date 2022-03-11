import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server";
import { UserModel } from "../../models";
import { tokenGenerator } from "../../utils";
import type { TUser } from "../../types/user";

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        const users = await UserModel.find();
        // .populate("shops")
        // .populate("following");
        return users;
      } catch (error) {
        console.error(error);
        return;
      }
    },
    user: async (_: any, args: { userId: string }) => {
      try {
        const user = await UserModel.findById(args.userId);
        // .populate("shops")
        // .populate("following");
        return user;
      } catch (error) {
        console.error(error);
        return;
      }
    },
  },
  Mutation: {
    signup: async (_: any, args: TUser) => {
      const { first_name, last_name, user_name, email, password } = args;
      const user = await UserModel.findOne({ email: email });
      const userByUserName = await UserModel.findOne({ user_name });
      //validation
      if (user || userByUserName) {
        throw new UserInputError("Already exist", {
          errors: {
            msg: "Already exist",
          },
        });
      } else if (
        first_name.trim() === "" ||
        last_name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        user_name.trim() === ""
      ) {
        throw new UserInputError("Required", {
          errors: {
            msg: "All fields are required",
          },
        });
      } else {
        const hashed = await bcrypt.hash(password, 12);
        const newUser = new UserModel({
          first_name,
          last_name,
          user_name,
          email,
          password: hashed,
          created_at: new Date().toDateString(),
        });
        const res = await newUser.save();
        // context.pubsub.publish("NEW_USER", {
        //   signupUser: res,
        // });

        return {
          first_name: res.first_name,
          last_name: res.last_name,
          user_name: res.user_name,
          email: res.email,
          token: tokenGenerator(res),
        };
      }
    },
    login: async (_: any, args: TUser) => {
      const { user_name, password } = args;
      const user = await UserModel.findOne({ user_name });
      if (!user) {
        throw new UserInputError("Email user name", {
          errors: { msg: "User name is invalid" },
        });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw new UserInputError("Passwor error", {
            errors: { msg: "Password is wrong" },
          });
        } else {
          return {
            first_name: user.first_name,
            last_name: user.last_name,
            user_name: user.user_name,
            email: user.email,
            token: tokenGenerator(user),
          };
        }
      }
    },
    // updateProfile: async (parent, args, context, info) => {
    //   const {
    //     country,
    //     region,
    //     city,
    //     address,
    //     phone,
    //     image,
    //     postCode,
    //     name,
    //     lastName,
    //   } = args;
    //   const { userName } = auth(context);
    //   const user = await UserModel.findOne({ userName });
    //   if (user) {
    //     user.name = name ? name : user.name;
    //     user.lastName = lastName ? lastName : user.lastName;
    //     user.profile = {
    //       country: country ? country : user.profile.country,
    //       region: region ? region : user.profile.region,
    //       city: city ? city : user.profile.city,
    //       address: address ? address : user.profile.address,
    //       phone: phone ? phone : user.profile.phone,
    //       image: image ? image : user.profile.image,
    //       postCode: postCode ? postCode : user.profile.postCode,
    //       userName: userName ? userName : user.profile.userName,
    //     };
    //     await user.save();
    //     return true;
    //   } else {
    //     throw new UserInputError("کاربر نا معتبر", {
    //       errors: { msg: "این نام کاربری ثبت نشده است" },
    //     });
    //   }
    // },
  },
  // Subscription: {
  //   signupUser: {
  //     subscribe: (_, __, { pubsub }) => {
  //       return pubsub.asyncIterator("NEW_USER");
  //     },
  //   },
  // },
};
