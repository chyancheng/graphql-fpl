import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
})

server.start(
    {
        cors: {
            credentials: true,
            origin: '*',
        },
    },
    () => console.log(`The server is running on http://localhost:4000`)
)
