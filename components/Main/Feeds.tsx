import Feed from "~/components/Main/Feed";
import Focused from "~/components/Main/Focused";

import { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
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

interface Media{
    id: number;
    
}

const Feeds = () => {
    const { loading, error, data, fetchMore } = useQuery(GET_ANIME);
    const [ selected, setSelected ] = useState<number | false>(false);
    const deselectSelected = () => setSelected(false);

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
   let focused: JSX.Element | null = null;

    let results: JSX.Element[] = data.Page.media.map((media: any, idx: number) => {
        if (media.id != selected){
            return <Feed key={idx} media={media} setSelected={setSelected} />
        } else {
            return <Focused key={idx} media={media} deselectSelected={deselectSelected} />
        }
    });

    //motion.div and layout is deliberately not used here.
    return (
        <>
        <div className="flex w-full h-full flex-wrap m-4 justify-evenly gap-y-4 overflow-y-auto">
            <AnimateSharedLayout>
                {results}
            </AnimateSharedLayout>
            <div className="absolute top-0 left-0 bg-blue-300">
                <span>current selected state is {selected.toString()}</span>
            </div>
        </div>
        { selected }
        </>
    );
}

export default Feeds;