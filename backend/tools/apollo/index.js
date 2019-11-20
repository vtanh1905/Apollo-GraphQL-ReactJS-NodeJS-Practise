const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res, connection }) => {
    let token;
    if (connection) {
      // Subscription
      token = connection.context.token || "";
    } else {
      // Query Mutation
      token = req.headers.token || "";
    }

    try {
      return {
        user: jwt.verify(token, "your_jwt_secret")
      };
    } catch (e) {}
  }
});
