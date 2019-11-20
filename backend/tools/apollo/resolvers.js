const userSchema = require("../mongoose/schema/user");
const { PubSub, AuthenticationError } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

const UserModel = require("../mongoose/schema/user");

const pubsub = new PubSub();

module.exports = {
  Query: {
    users: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication token is invalid");
      }
      return await userSchema.find({});
    }
  },

  Mutation: {
    addUser: async (parent, args, context, info) => {
      try {
        const user = await new userSchema(args.input).save();
        pubsub.publish("USERS", {
          subUsers: user
        });
        return user;
      } catch (error) {
        return error;
      }
    },
    login: async (parent, args, context, info) => {
      const { username, password } = args.input;
      const user = await UserModel.findOne({
        username,
        password
      });
      const token = jwt.sign(
        {
          username: user.username
        },
        "your_jwt_secret"
      );
      return {
        token
      };
    }
  },

  Subscription: {
    subUsers: {
      subscribe: (parent, args, context, info) => {
        return pubsub.asyncIterator(["USERS"]);
      }
    }
  }
};
