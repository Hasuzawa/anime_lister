import React from "react";
import styles from "~/styles/moduleCss/Feed.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link as LinkIcon, WarningCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useContext } from "react";

import { SettingsContext } from "~/stores/Settings";

import { observer } from "mobx-react-lite";

interface Media{
    id: number;
    seasonYear: number;
    //season: Season;

}
interface FeedProps{
    media: any;
    setSelected: Dispatch<SetStateAction<number | false>>;
}

const Feed = observer((props: FeedProps) => {
    let content: JSX.Element;
    const media = props.media;

    const settingsContext = useContext(SettingsContext);

    
    if (!media){        // error in media
        content = (
            <div className={"w-full h-full bg-gray-400 flex flex-col justify-center items-center"}>
                <WarningCircle size={48} />
                <h1 className="text-center">The anime cannot be retrieved. Reloading might help.</h1>
            </div>
        );

    } else if (media.isAdult && !settingsContext.displayAdultContent) {     // age-restricted content
        content = (
            <div
                className="w-full h-full bg-pink-300 flex flex-col justify-center items-center"
                onClick={settingsContext.toggleDisplayAdultContent}
            > 
                <WarningCircle size={40} />
                <h1 className="text-center">The anime is age-restricted. Clicking this area will enable adult content.</h1>
            </div>
        );
    }

    else {      // display media content
        content = (
            <>
                <div
                    className="flex-none w-full h-full bg-black relative"
                    onClick={() => props.setSelected(media.id)}
                    >
                    <Image
                        src={media.coverImage.extraLarge}
                        className={""}
                        layout={"fill"}
                        objectFit={"cover"} // "contain" will have some areas uncovered
                        priority
                    />
                </div>
                {/* <div className="flex-none w-full h-full p-2">
                    <h1>{media.title.english}</h1>
                    <h1>{media.seasonYear}</h1>
                    <h1>{media.season}</h1>
                    <Link href={media.siteUrl}>
                        <a title={media.siteUrl}>
                            <LinkIcon size={28} className={"inline"}/>
                            <span>detailed page on AniList</span>
                        </a>
                    </Link>
                </div> */}
            </>
        );
    }

    return (
        <motion.div
            className={"flex-none bg-white rounded-md shadow-2xl " + styles.feed}
            layoutId={media.id.toString()}
            layout
        >
            { content }
        </motion.div>
    );
});

export default Feed;