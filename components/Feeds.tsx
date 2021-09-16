import Feed from "~/components/Feed";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";


const GET_ANIME_BY_YEAR = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String, $seasonYear: Int = 2020) {
        Page (page: $page, perPage: $perPage) {
            total
            current
            lastPage
            hasNextPage
            perPage
        }
        media (id: $id, seasonYear: $seaosnYear, search: $search, sort: SCORE_DESC, type: ANIME) {
            id
            seasonYear
            season
            averageScore
            
            title {
                english
            }
            coverImage {
                large
            }
        }
    }
`;


const GET_ANIME = gql`
query ($id: Int, $seasonYear: Int = 2021){                   #id is a query argument
  Page {
      media (id: $id, type: ANIME, seasonYear: $seasonYear, sort: SCORE_DESC) {    #find all media with id = $id and type = ANIME
        id
        seasonYear
        season
        averageScore
        isAdult
        siteUrl
        #genres
        #studios
        title {
            english
        }
        coverImage {
            large
            extraLarge
            color
        }
    }
  }
}
`;

const Feeds = () => {
    const { loading, error, data, fetchMore } = useQuery(GET_ANIME);

    if (loading) {return <h1>loading ...</h1>}
    if (error) {return <h1>error !!</h1>}

    /* form of data
        {
            Page {
                media [{
                    id
                    seasonYear
                    ...
                },
                {
                    id
                    seasonYear
                    ...
                }]
            }
        }

    */

    let results: JSX.Element[] = data.Page.media.map((media: any, idx: number) => (
        <Feed key={idx} media={media}/>
    )
    );

    return (
        <div className="flex flex-wrap m-4 justify-evenly gap-y-4">
            {results}
        </div>
    );
}

export default Feeds;