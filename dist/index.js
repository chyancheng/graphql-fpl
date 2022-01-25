var GraphQLServer = require("graphql-yoga").GraphQLServer;
var resolvers = require("./resolvers");
var server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: resolvers
});
server.start(function () {
    return console.log("The server is running on http://localhost:4000");
});
