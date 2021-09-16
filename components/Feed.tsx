import React from "react";
import styles from "~/styles/moduleCss/Entry.module.css";
import { useQuery } from "@apollo/client";
import { GET_ANIME } from "~/pages/_app";

interface FeedProps{
    name: string;   //name of anime
    cover: string;  //url to cover image
    description: string;       //description
    status: boolean | undefined;
}


// const Feed = (media: any) => {
//     const { loading, error, data } = useQuery(GET_ANIME, {variables: {id: 5678}});
//     if (!loading){
//         console.log(data);
//         console.log(data.Media);
//     }
//     return (
//         <div className={"flex-none bg-yellow-300 " + styles.feed}>    {/* w-72 h-96 */}
//             {loading ? <h1>loading ...</h1>
//                 : <>
//                     <img src={data.Media.coverImage.large} />
//                     <h1>{data.Media.title.english}</h1>
//                     <p></p>
//                   </>
//             }
//             {/* <img src={}/> */}
//             <h1>name of anime</h1>
//             <p>this is some text explaination of the anime</p>
//         </div>
//     )
// }
enum Season{
    SPRING,
    SUMMER,
    FALL,
    WINTER
}

interface Media{
    id: number;
    seasonYear: number;
    season: Season;

}

const Feed = ({media}: any) => {
    console.log("feed media is ", media);
    if (!media){
        return (
        <div>
            <h1>media is falsy</h1>
        </div>
        );
    }
    return (
        <div className={"flex-none bg-yellow-300 " + styles.feed}>
            <h1>{media.id}</h1>
            <h1>{media.title.english}</h1>
            <h1>{media.seasonYear}</h1>
            <img src={media.coverImage.large} />
        </div>
    );
}

export default Feed;

// gql`query ($id: Int) {
//     Media (id: $id, type: ANIME) {
//       id
//       title {
//         romaji
//         english
//         native
//       }
//     }
//   }`;