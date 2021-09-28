import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, X } from "phosphor-react";

interface Focused{
    media: any
    deselectSelected: () => void;
}

const numberToMonth = new Map<number, string>([
    [1, "Jan"],
    [2, "Feb"],
    [3, "Mar"],
    [4, "Apr"],
    [5, "May"],
    [6, "Jun"],
    [7, "Jul"],
    [8, "Aug"],
    [9, "Sep"],
    [10, "Oct"],
    [11, "Nov"],
    [12, "Dec"],
]);

const capitaliseFirstLetter = (str: string): string => {
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
}

const shortenedNumeric = (num: number): string => {
    if (num >= 10_000_000){
        return `${(num / 100_000).toPrecision(3)}M`;    //e.g. 78.3M
    } else if (num >= 10_000) {
        return `${(num / 1000).toPrecision(3)}k`;       //e.g. 36.4k
    } else {
        return num.toString();
    }
}


const Focused = (props: any) => {
    const media = props.media;
    //console.log(media);
    
    return (
        // overlay backdrop of <Main>
        <motion.div
            className="absolute inset-0 bg-black bg-opacity-30 flex z-10 justify-center items-center cursor-pointer"
            onClick={props.deselectSelected}
            layout
        >
            {/* only deactivate when the overlay is clicked */}
            <motion.div
                className={"w-3/4 h-3/4 bg-white cursor-default relative p-4 flex"}
                layoutId={props.media.id.toString()}
                onClick={(e) => {e.stopPropagation()}}
            >
                <X size={44} className="absolute top-0 right-0 cursor-pointer" onClick={props.deselectSelected}/>
                <div className="flex-none w-3/10 bg-black flex items-center">
                    {/* has vertical overflow problem */}
                    <div className="w-full max-w-full max-h-full flex-none block">    {/* for vertical center */}
                    <Image src={media.coverImage.extraLarge}
                        width={230}
                        height={329}
                        layout={"responsive"}
                        className="max-w-full max-h-full"
                    />
                    </div>
                </div>
                <div className="flex-none w-7/10 flex flex-col p-4 bg-red-300 overflow-auto gap-y-4">
                    <div className="flex-none">
                        <Link href={media.siteUrl}><a>
                            <span className="block text-xl">{media.title.english}</span>
                        </a></Link>
                        <span className="italic">{media.studios.nodes[0]?.name}</span>
                    </div>
                    <div className="flex-none flex justify-between">
                        <span className="mr-16">Season: {capitaliseFirstLetter(media.season)} {media.seasonYear}</span>
                        <span>{"Airing: " +
                            `${media.startDate.day} ${numberToMonth.get(media.startDate.month)} ${media.startDate.year}`+
                            "      ~     " +
                            `${media.endDate.day} ${numberToMonth.get(media.endDate.month)} ${media.endDate.year}`}
                        </span>
                    </div>
                    <div className="flex-none flex justify-evenly">
                        {media.genres.map((element: string, idx: number) => 
                        <span
                            className=""
                            key={idx}
                        >
                            {element}
                        </span>)}
                    </div>
                    <div className="flex-none flex justify-evenly">
                        <div className="flex flex-col items-center">
                            <span>Average Score</span>
                            <span>{media.averageScore}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Mean Score</span>
                            <span>{media.meanScore}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Popularity</span>
                            <span>{shortenedNumeric(media.popularity)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Favourited</span>
                            <span>{shortenedNumeric(media.favourites)}</span>
                        </div>
                    </div>
                    <div
                        className="flex-none overflow-hidden"
                        dangerouslySetInnerHTML= {{
                            __html: media.description,
                        }}
                    />
                </div>

            </motion.div>

        </motion.div>
    );
}

export default Focused;