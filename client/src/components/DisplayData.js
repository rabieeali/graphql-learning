import {useQuery, gql, useLazyQuery, useMutation} from "@apollo/client";
import {useState} from "react";

const QUERY_ALL_USERS = gql`
    query getAllUsers {
        users {
            id
            name
            age
            username
        }
    }
`
const QUERY_ALL_MOVIES = gql`
    query getAllMovies {
        movies {
            name
        }
    }
`


const GET_MOVIE_BY_NAME = gql`
    #    "Movie" should be exactly Movie or just query {}
    query Movie ($name:String!){
        movie(name:$name){
            name
            yearOfPublication
        }
    }
`

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input : $input){
            name
            id
        }
    }
`


const DisplayData = () => {
    // movie search input state
    const [searchedMovie, setSearchedMovie] = useState("")
    // create a user input state
    const [newUser, setNewUser] = useState({name: "", username: "", age: "", nationality: ""})
    // fetch movie
    const [fetchHandler, {data: singleMovieData, error: singleMovieError}] = useLazyQuery(GET_MOVIE_BY_NAME)
    // create a user
    const [createUserHandler] = useMutation(CREATE_USER_MUTATION)

    const {data: usersData, loading: usersLoading, error: usersError, refetch} = useQuery(QUERY_ALL_USERS)
    const {data: moviesData, loading: moviesLoading, error: moviesError} = useQuery(QUERY_ALL_MOVIES)


    if (usersError) {
        return <h1>error happened in users</h1>
    }
    if (usersLoading) {
        return <h1>users loading ...</h1>
    }
    if (moviesLoading) {
        return <h1>movies loading ...</h1>
    }
    if (moviesError) {
        return <h1>error happened in movies</h1>
    }

    const changeHandler = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }


    return (
        <>
            <div style={{background: "orange", padding: "2rem"}}>
                <h1>create a user</h1>
                <form style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <input onChange={changeHandler} value={newUser.name} name="name" type="text"
                           placeholder="Name ..."/>
                    <input onChange={changeHandler} value={newUser.username} name="username" type="text"
                           placeholder="Username ..."/>
                    <input onChange={changeHandler} value={newUser.age} name="age" type="number" placeholder="Age ..."/>
                    <input onChange={changeHandler} value={newUser.nationality} name="nationality" type="text"
                           placeholder="Nationality ..."/>
                    <button
                        onClick={(e) => {

                            e.preventDefault();
                            createUserHandler({
                                variables: {
                                    input: {
                                        name: newUser.name,
                                        username: newUser.username,
                                        age: +newUser.age,
                                        nationality: newUser.nationality.toUpperCase(),
                                    }
                                }
                            })
                            refetch()
                        }}
                        style={{background: "red", width: "50%", margin: "0 auto"}}>Submit
                    </button>
                </form>


            </div>
            <hr/>
            <div style={{background: "blue", padding: "2rem"}}>
                <h1>All Users</h1>
                {usersData.users && (usersData.users).map((user, index) => (
                    <div key={index}>
                        <p>{user.name}- {user.age} years old</p>
                    </div>
                ))}
            </div>
            <hr/>
            <div style={{background: "green", padding: "2rem"}}>
                <h1>All Movies</h1>

                {moviesData.movies && (moviesData.movies).map((movie, index) => (
                    <div key={index}>
                        <p>{movie.name}</p>
                    </div>
                ))}
            </div>
            <hr/>
            <div style={{background: "yellow", padding: "2rem"}}>
                <h1>get one movie</h1>
                <input onChange={event => setSearchedMovie(event.target.value.toLowerCase())}
                       placeholder="ex: interstellar "/>
                <button onClick={() => fetchHandler({variables: {name: searchedMovie}})}>Fetch Movie</button>
                <div>
                    {singleMovieData && <div>
                        <p><strong>Movie Name: </strong>{singleMovieData.movie.name}</p>
                        <p><strong>Year: </strong>{singleMovieData.movie.yearOfPublication}</p>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default DisplayData;