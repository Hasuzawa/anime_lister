import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";


const uri = "https://graphql.anilist.co"  //API of AniList

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache()
});

//client

console.log(uri);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
