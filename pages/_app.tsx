import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
//import { HttpLink, ApolloLink, concat } from "@apollo/client";

import FilterFields, { FilterFieldsContext } from "~/stores/FilterFields";
import { offsetLimitPagination } from '@apollo/client/utilities';

const uri = "https://graphql.anilist.co"  //API of AniList

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache({
    typePolicies: {
        Query: {
          fields: {

            Page: {
              keyArgs: false      // <-- singleton
            }
          }
        },
        Page: {
          fields: {
            media: {
              
              merge(existing: any[] = [], incoming: any[]) {
                return [...existing, ...incoming];        // <-- append new media to existing array for infinite scroll
              }
            }
          }
        }
      }
    }
  )
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client} >
      {/* <FilterFieldsContext.Provider value={new FilterFields()}> */}
        <Component {...pageProps} />
      {/* </FilterFieldsContext.Provider> */}
    </ApolloProvider>
  );
}

export default MyApp

