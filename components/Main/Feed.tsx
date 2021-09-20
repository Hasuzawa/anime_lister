import React from "react";
import styles from "~/styles/moduleCss/Feed.module.css";
import { useQuery } from "@apollo/client";
import { GET_ANIME } from "~/pages/_app";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, WarningCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

// interface FeedProps{
//     name: string;   //name of anime
//     cover: string;  //url to cover image
//     description: string;       //description
//     status: boolean | undefined;
// }


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
interface FeedProps{
    media: any;
    setSelected: Dispatch<SetStateAction<number | false>>;
}
//imageMode / detailsMode

const Feed = (props: FeedProps) => {
    let content: JSX.Element;
    const media = props.media;

    // error in media
    if (!media){
        content = (
            // <div className={"flex-none min-w-full min-h-full w-full h-full flex"}>
                <div className={"flex-auto justify-self-stretch bg-gray-400 flex flex-col justify-center items-center"}>
                    <WarningCircle size={48} />
                    <h1>the anime cannot be retrieved.</h1>
                </div>
            // </div>
        );

    }// else if (media is adult only) {}

    // display data
    else {
        content = (
            <>
                <div className="flex-none w-full h-full bg-black relative">
                    <Image
                        src={media.coverImage.extraLarge}
                        className={""}
                        layout={"fill"}
                        objectFit={"contain"}
                        priority
                    />
                </div>
                <div className="flex-none w-full h-full p-2">
                    <h1>{media.title.english}</h1>
                    <h1>{media.seasonYear}</h1>
                    <h1>{media.season}</h1>
                    <Link href={media.siteUrl}>
                        <a title={media.siteUrl}>
                            <LinkIcon size={28} className={"inline"}/>
                            <span>detailed page on AniList</span>
                        </a>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <motion.div className={"flex-none bg-white rounded-md shadow-2xl " + styles.feed} layoutId={media.id} onClick={() => props.setSelected(media.id)} >
            { content }
        </motion.div>
    );
}

export default Feed;