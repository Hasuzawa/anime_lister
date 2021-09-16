import Feed from "~/components/Feed";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { GET_ANIME } from "~/pages/_app";
import { gql } from "@apollo/client";

// const Entries = () => {
//     const { loading, error, data, fetchMore } = useQuery(GET_ANIME, {variables: {id: 5678, offset: 0, limit: 30}});

//     if (loading) {return <h1>loading ...</h1>}
//     if (error) {return <h1>error !!</h1>}
//     console.log(data);
    

//     let results = data.map( (Media: any, idx: number) => {return <Feed key={idx} media={Media}/>});
    
//     // let entries: JSX.Element[] = [];
//     // for (let i = 0; i < 18; i++){
//     //     entries.push(<Entry key={i}/>);
//     // }
//     return (
//         <div className="flex flex-wrap m-4 justify-evenly gap-y-4">
//             {results}
//         </div>
//     );
// }
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

const Feeds = () => {
    const { loading, error, data, fetchMore } = useQuery(GET_ANIME_BY_YEAR);

    if (loading) {return <h1>loading ...</h1>}
    if (error) {return <h1>error !!</h1>}

    let results = data.media.map((media: any, idx: number) => (
        <Feed media={media}/>
    )
    );

    return (
        <div className="flex flex-wrap m-4 justify-evenly gap-y-4">
            {results}
        </div>
    );
}

//export default Entries;
export default Feeds;