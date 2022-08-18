const {gql} = require('apollo-server')

const typeDefs = gql`
    type User {
        id:ID!
        name: String!
        username : String!
        age : Int!
        nationality: Nationality!
        friends : [User]
    }
    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }
    type Query {
        #        you need to add a resolver for each key here!

        users : [User!]!
        #        down below you must pass an id , and must not make it this way -> User!
        #        because maybe there's no user with such id!
        #        in that case you want it to return null so we could handle "No User Found" message in front-end
        user(id:ID!) : User
        movies: [Movie!]
        movie (name:String!) : Movie
    }
    enum Nationality {
        #         must exactly match with what the users enter , so either UPPERCASE or lowercase

        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }

`


module.exports = {typeDefs}