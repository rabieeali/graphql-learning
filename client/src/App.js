import {ApolloClient , InMemoryCache, ApolloProvider} from "@apollo/client";

const App = () => {
    const client = new ApolloClient({
        cache: _ ,
        uri: "http://localhost:3001/grapghql" ,
    })
    return (
        <div>
            <h1>Hello React</h1>
        </div>
    );
};

export default App;
