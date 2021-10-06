import Feed from "~/components/Main/Feed";
import Focused from "~/components/Main/Focused";

import { useState, Dispatch, SetStateAction, useRef, useEffect, useContext } from "react";
import { motion, AnimateSharedLayout, useElementScroll } from "framer-motion";
import { useQuery, gql } from "@apollo/client";

import { Season } from "~/components/enums";

import { FilterFieldsContext } from "~/stores/FilterFields";
import { SortFieldsContext } from "~/stores/SortFields";
import { SettingsContext } from "~/stores/Settings";

import { observer } from "mobx-react-lite";
import Filler from "~/components/Main/Filler";

// pass arguments when using the useQuery hook

// the string search yields very weird result
const GET_ANIMES = gql`
    query ($page: Int, $perPage: Int, $year: Int, $status: MediaStatus, $format: MediaFormat, $sort: [MediaSort] = POPULARITY_DESC){
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                lastPage
                hasNextPage
            }
            media (type: ANIME, seasonYear: $year, status: $status, format: $format, sort: $sort) {
                id

                coverImage {
                    extraLarge
                    color
                }

                title {
                    english
                }
                siteUrl
                studios(isMain: true) {       #filter by main here, would only has one studio
                    nodes {
                        id
                        name
                    }
                }

                season              #will be returned as a string of "SPRING", "SUMMER", "FALL" and "WINTER"
                seasonYear
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }

                isAdult
                
                episodes
                format

                genres

                averageScore
                meanScore
                popularity
                favourites


                description(asHtml: false)
                status              #will be returned as a string of "FINISHED", "RELEASING", and a few more possible strings


            }
        }
    }
`;



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


// WARNING: wrapping this in observer will casue animation to bug
const Feeds = observer(() => {

    const filterFields = useContext(FilterFieldsContext);
    const sortFields = useContext(SortFieldsContext);
    const settings = useContext(SettingsContext);

    // for GraphQL API
    const { loading, error, data, fetchMore } = useQuery(
        GET_ANIMES,
        {
            variables: {
                page: 1,
                perPage: 50,
                year: filterFields.sortYear,
                // note that passing null works for year (i.e. any year), but null for status or format will return nothing
                // for this API, use undefined instead for "any" 
                status: filterFields.sortStatus,
                format: filterFields.sortFormat,
                sort: sortFields.sortCriterion,
            }
        }
    );

    const loadMore = () => {
        if (settings.hasNextPage) {
            fetchMore(
                {
                    variables: {
                        page: settings.currentPage + 1
                    }
                }
            )
        }
    }


    // for selected element
    const [ selected, setSelected ] = useState<number | false>(false);
    const deselectSelected = () => setSelected(false);

    // for scroll Y progress
    const ref = useRef<HTMLDivElement>(null);   //hook it to the scrolling div

    const { scrollYProgress } = useElementScroll(ref);
    scrollYProgress.onChange(settings.setScrollYProgress);


    // infinite scroll by loading more when at bottom of feeds
    const handleScroll = () => {
        const scrollDiv: HTMLDivElement | null = ref.current;
        if (scrollDiv) {
            if ( scrollDiv.scrollTop + scrollDiv.clientHeight >= scrollDiv.scrollHeight) {
                loadMore();
            }
        }
    }



    if (error) {return (
        <div className="w-full h-full flex justify-centent items-center" ref={ref}> {/* not fixed yet */}
            <h1>error !!</h1>
        </div>
    )}
    // Ideally I should render all under one div, instead of hooking them into a filler div when loading/error

    let focused: JSX.Element | null = null;
    let results: JSX.Element[] | JSX.Element | null = null;

    if (loading) {
        results = (
            [...Array(8)].map((element, idx) => <Filler key={idx} />)
    )} else {
        const pageInfo = data.Page.pageInfo;

        settings.setCurrentPage(pageInfo.currentPage);
        settings.setLastPage(pageInfo.lastPage)
        settings.setHasNextPage(pageInfo.hasNextPage);

        const media = data.Page.media;

        if (media.length == 0) {        // no result
            results = (
                <div
                    className="w-full h-full flex flex-col justify-center items-center"
                >
                    <h1 className="text-center text-white">No Search Result</h1>
                </div>
            )
        } else if (media.length > 0) {
            results = data.Page.media.map((media: any, idx: number) => {
                if (media.id != selected){
                    return <Feed key={idx} media={media} setSelected={setSelected}/>
                } else {
                    return <Focused key={idx} media={media} deselectSelected={deselectSelected} />
                }
            })
        }
    }
    
    // the "feeds" is where the y-scrolling happens.
    return (
        <>
            <motion.div
                id="feeds"
                className="w-full h-full p-4 flex flex-wrap justify-evenly gap-y-4 overflow-y-auto scroll-smooth"
                ref={ref}
                onScroll={handleScroll}
            >   
                <AnimateSharedLayout>
                    {results}
                </AnimateSharedLayout>
                <div className="absolute top-0 left-0 bg-blue-300">
                    <span>current selected state is {selected.toString()}</span>
                    <button onClick={loadMore}>fetch more</button>
                </div>
            </motion.div>
        </>
    );
});

export default Feeds;