const {gql}  = require ('apollo-server-express');

const me =() => 'Ijilee';
module.exports  = {
    Query: {
      me
    },
  };