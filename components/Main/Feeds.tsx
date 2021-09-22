import Feed from "~/components/Main/Feed";
import Focused from "~/components/Main/Focused";

import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { motion, AnimateSharedLayout, useElementScroll } from "framer-motion";
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

enum MediaSort {
    SCORE_DESC,         //average score
    SCORE,              //no order defaults to ascending
    POPULARITY,
    POPULARITY_DESC,
    TITLE_ENGLISH,          //a b c...
    TITLE_ENGLISH_DESC,
    START_DATE,
    START_DATE_DESC,
}

enum MediaStatus {
    FINISHED,
    RELEASING,
    NOT_YET_RELEASED,
    CANCELLED,
    HIATUS
}

enum MediaFormat {
    TV,
    TV_SHORT,
    MOVIE,
    SPECIAL,
    OVA,
    ONA,
    MUSIC,
    MANGA,
    NOVEL,
    ONE_SHOT
}

// pass arguments when using the useQuery hook

// the string search yields very weird result
const GET_ANIME = gql`
query ($id: Int, $seasonYear: Int = 2020, $sortOrder: [MediaSort] = POPULARITY_DESC, $stringSearch: String
    , $format: [MediaFormat]){                   #id is a query argument
  Page {
      media (id: $id, type: ANIME, seasonYear: $seasonYear, sort: $sortOrder, search: $stringSearch
        , format_in: $format) {    #find all media with id = $id and type = ANIME
        id
        seasonYear
        season              #will be returned as a string of "SPRING", "SUMMER", "FALL" and "WINTER"
        averageScore
        isAdult
        siteUrl
        #genres
        #studios
        episodes
        popularity
        status              #will be returned as a string of "FINISHED", "RELEASING", and a few more possible strings
        title {
            english
        }
        coverImage {
            large
            extraLarge
            color
        }
        description
        studios(isMain: true) {       #filter by main here, would only has one studio
            nodes {
                id
                name
            }
        }
    }
  }
}
`;

enum Season{
    SPRING,
    SUMMER,
    FALL,
    WINTER
}

interface Media{
    id: number;                 //unique main key
    seasonYear: number;         //YYYY
    season: Season;             //one of the enum
    averageScore: number;       //double
    isAdult: boolean            //need filtering
    siteUrl: string;            //url of site
    title: {
        english: string;        //English title
    }
    coverImage: {
        extraLarge: string;     //url of image
    }

}

interface FeedsProps{
    setScrollYProgress: Dispatch<SetStateAction<number>>;
}

const Feeds = (props: FeedsProps) => {
    // for GraphQL API
    const { loading, error, data, fetchMore } = useQuery(GET_ANIME);

    // for selected element
    const [ selected, setSelected ] = useState<number | false>(false);
    const deselectSelected = () => setSelected(false);

    // for scroll Y progress
    const ref = useRef<HTMLDivElement>(null);   //hook it to the scrolling div
    if (ref != null){
        const { scrollYProgress } = useElementScroll(ref);
        useEffect(() => {
            scrollYProgress.onChange(props.setScrollYProgress);     // send scrollYProgress back to index.tsx
        }, [scrollYProgress])
    }

    // Ideally I should render all under one div, instead of hooking them into a filler div when loading/error
    if (loading) {return <div ref={ref}><h1>loading ...</h1></div>}
    if (error) {return <div ref={ref}><h1>error !!</h1></div>}
    
    
    

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
    // the "feeds" is where the y-scrolling happens.
    return (
        <>
            <div
                id="feeds"
                className="flex w-full h-full flex-wrap p-4 justify-evenly gap-y-4 overflow-y-auto scroll-smooth"
                ref={ref}
            >   
                <AnimateSharedLayout>
                    {results}
                </AnimateSharedLayout>
                <div className="absolute top-0 left-0 bg-blue-300">
                    <span>current selected state is {selected.toString()}</span>
                </div>
            </div>
        </>
    );
}

export default Feeds;
export { Season };