
const { ApolloServer } = require('apollo-server');
require("dotenv").config();

//type  /mutatuion query /
 const typeDefs = `
  type Query {
    totalPosts :Int!
  }
 `

  // resolvers

  const resolvers = {
    Query: {
      totalPosts: () => 34
    },
  };
//server 

const server = new ApolloServer({ typeDefs, resolvers });


//port 
 server.listen(process.env.PORT, function(){
     console.log(`server is ready at http://localhost${process.env.PORT}`)
 })