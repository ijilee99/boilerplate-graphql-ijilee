const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const {fileLoader, mergeTypes, mergeResolvers} = require('merge-graphql-schemas');
require("dotenv").config();

//express server 
const app = express();

// db
const db = async () => {
  try {
      const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
      });
      console.log('DB Connected');
  } catch (error) {
      console.log('DB Connection Error', error);
  }
};
// execute database connection
db();


// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));

// resolvers
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))


//server 

// const apolloServer = new ApolloServer({ typeDefs, resolvers });
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
// applyMiddleware method connects ApolloServer to a specifit HTTP framewok i:express
// apolloServer.applyMiddleware({app});

//server
const httpserver = http.createServer(app);

//rest endpoint
app.get("/rest", function(req, res){
  res.json({
    data: "test hiij bn "
  })
})

//port 

httpserver.listen(process.env.PORT, function(){
  console.log(`server is ready at http://localhost${process.env.PORT}`)
  console.log(` graphql server is ready at http://localhost${process.env.PORT}${apolloServer.graphqlPath}`)
})



