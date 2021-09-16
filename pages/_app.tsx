import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
//import { HttpLink, ApolloLink, concat } from "@apollo/client";


const uri = "https://graphql.anilist.co"  //API of AniList

console.log(uri);

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache()
});

//client

//testing

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
var variables = {
    id: 5678
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co';
var  options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
  

    // const gql`query ($id: Int) {
    //   Media (id: $id, type: ANIME) {
    //     id
    //     title {
    //       romaji
    //       english
    //       native
    //     }
    //   }
    // 

//above: regular JS method, below Apollo client method
client.query({
  query: gql`query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
    }
  }`,
  variables: variables
}).then(result => console.log("this is by Apollo Client", result));

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response:any) {
    return response.json().then(function (json:any) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data:any) {
    //console.log(data);
}

function handleError(error:any) {
    //alert('Error, check console');
    console.error(error);
}


//end of testing

// const GET_ANIME = gql`query ($id: Int) {
//   Media (id: $id, type: ANIME) {
//     id
//     title {
//       romaji
//       english
//       native
//     }
//   }
// }`;

const GET_ANIME = gql`
query ($id: Int){                   #id is a query argument
  Media (id: $id, type: ANIME) {    #find all media with id = $id and type = ANIME
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
      extraLarge
      medium
      color
    }
  }
}
`;

const SEARCH_ANIME = gql`
  query ($query: String) {
    AnimeSearch: Page {
      media(search: $query, type: ANIME) {
        id
        title {
          english
        }
        coverImage {
          large
        }
      }
    }
  }
`;


export {GET_ANIME};

// const FETCH_ANIME_IN_YEAR = gql`
// `;



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client} >
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
