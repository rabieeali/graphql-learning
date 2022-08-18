// resolvers are functions
const {UserList, MovieList} = require('../FakeData')
const _ = require("lodash")
const resolvers = {
    // what is the highest level field => Query!
    Query: {
        users: () => {
            // what we want to return when sb queries from users field
            // make api calls if you have a database , well we don't , so we import our fake data db!
            return UserList;
        },
        user: (parent, args) => {
            //    we passed id as an argument in type-defs
            const id = args.id
            // with using lodash it would look like this
            // note: make it a number so ID by default accepts both int and string types
            // unless it would have null as response

            const user = _.find(UserList, {id: Number(id)})
            return user;

            // without using lodash it would look like this

            // const user = UserList.find(u => {
            //     if (u.id === Number(id)) {
            //         return u
            //     }
            // })

        },
        movies: () => {
            return MovieList
        },
        movie: (parent, args) => {
            const name = args.name
            const movie = _.find(MovieList, {name: name})
            return movie
        }
    },
    User: {
        favoriteMovies: () => {
            const movie = _.filter(MovieList, (movie) => {
                return movie.yearOfPublication >= 2000 && 2010>= movie.yearOfPublication
            })
            return movie
        }
    }
}


module.exports = {resolvers}