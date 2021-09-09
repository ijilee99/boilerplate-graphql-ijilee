const {gql} = require('apollo-server-express');

const totalPosts = () => 43;
module.exports = {
    Query: {
      totalPosts
    },
  };