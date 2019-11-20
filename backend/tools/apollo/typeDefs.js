const { gql } = require("apollo-server-express");

module.exports = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: ID
    name: String
    username: String
    password: String
  }

  input UserInput {
    name: String
    username: String
    password: String
  }

  input LoginInput {
    username: String
    password: String
  }

  type Token {
    token: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(input: UserInput!): User
    login(input: LoginInput!): Token
  }

  type Subscription {
    subUsers: User
  }
`;
