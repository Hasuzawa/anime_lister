import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
//import { HttpLink, ApolloLink, concat } from "@apollo/client";

import { MediaFormat, MediaStatus } from "~/components/enums";


const uri = "https://graphql.anilist.co"  //API of AniList

function nonNullValue<T, U>(input: T, defaultValue: U): T | U {
  return (input === null || input === undefined) ? defaultValue : input;
}

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
      },
      Media: {
        fields: {
          episodes: {
            read(episodes) {
              return nonNullValue(episodes, "?")
            }
          },
          format: {
            read(format) {
              let formatText = (MediaFormat as any)[format]   //returns a string if key exist, else returns undefined
              return nonNullValue(formatText, "?")
            }
          },
          status: {
            read(status) {
              let statusText = (MediaStatus as any)[status]
              return nonNullValue(statusText, "?")
            }
          }
        }
      },
      MediaTitle: {
        fields: {
          english: {
            read(english) {
              return nonNullValue(english, "(Unknown Anime)")
            }
          }
        }
      }
    }
  })
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

