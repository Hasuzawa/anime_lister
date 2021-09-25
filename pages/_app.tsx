import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
//import { HttpLink, ApolloLink, concat } from "@apollo/client";


const uri = "https://graphql.anilist.co"  //API of AniList

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(
    {
      typePolicies: {
        Page: {
          fields: {
            media: {
              
            }
          }
        }
      }
    }
  )
});



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

export {GET_ANIME};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client} >
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
