const { ApolloServer, gql } = require('apollo-server-lambda')
require('dotenv').config();
const axios = require("axios")
const faunadb = require('faunadb');
const q = faunadb.query;

var client = new faunadb.Client({
    secret: process.env.DB_SECRET,
})

const typeDefs = gql `
  type Query {

    getAllLollies: [Lolly]!
    getLollyByPath(lollyPath: String!): Lolly
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath:String!
  }
  type Mutation{
    createLolly(
        recipientName: String!
        message: String!
        senderName: String!
        flavourTop: String!
        flavourMiddle: String!
        flavourBottom: String!
        lollyPath: String!
        ):Lolly
  }
`;


const resolvers = {
    Query: {
        getAllLollies: async() => {
            var result = await client.query(
                q.Map(
                    q.Paginate(q.Match(q.Index("allLollies"))),
                    q.Lambda(x => q.Get(x))
                )
            )

            return result.data.map(d => {
                return {
                    recipientName: d.data.recipientName,
                    senderName: d.data.senderName,
                    flavourTop: d.data.flavourTop,
                    flavourMiddle: d.data.flavourMiddle,
                    flavourBottom: d.data.flavourBottom,
                    message: d.data.message,
                    lollyPath: d.data.lollyPath,
                }
            })
        },

        getLollyByPath: async(_, args) => {
            try {
                var result = await client.query(
                    q.Get(q.Match(q.Index("lolly_by_path"), args.lollyPath))
                )

                return result.data
            } catch (e) {
                return e.toString()
            }
        },
    },
    Mutation: {
        createLolly: async(_, args) => {
            try {
                const result = await client.query(
                    q.Create(q.Collection('lollies'), {
                        data: args
                    }))

                axios
                    .post("https://api.netlify.com/build_hooks/5ff1a65fdc7e58d3aafeb307")
                    .then(function(response) {
                        console.log(response)
                    })
                    .catch(function(error) {
                        console.error(error)
                    })
                console.log('result', result)
                console.log('result', result.data)
                return result.data

            } catch (error) {
                console.log('error', error);

            }

        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
})

const handler = server.createHandler()

module.exports = { handler }