import React from "react";
import styles from "~/styles/moduleCss/card.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link as LinkIcon, WarningCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useContext } from "react";

import { SettingsContext } from "~/stores/Settings";

import { observer } from "mobx-react-lite";


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
                <h1 className="text-center">The anime has sensitive content. Clicking this area will enable all age-restricted content.</h1>
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
            </>
        );
    }

    return (
        <motion.div
            className={"shadow-2xl " + styles.card}
            layoutId={media.id.toString()}
            layout
        >
            { content }
        </motion.div>
    );
});

export default Feed;