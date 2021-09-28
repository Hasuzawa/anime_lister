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

const shortenedNumeric = (num: number): string => {
    if (num >= 100_000_000){
        return `${(num / 100_000).toPrecision(3)}M`;
    } else if (num >= 100_000) {
        return `${(num / 1000).toPrecision(3)}k`;
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
                <div className="flex-none w-3/10 bg-blue-300">
                    <Image src={media.coverImage.extraLarge}
                        width={230}
                        height={329}
                        layout={"responsive"}
                    />
                </div>
                <div className="flex-none w-7/10 flex flex-col p-4 bg-red-300">
                    <span className="text-xl">{media.title.english}</span>

                    <span>{media.studios.nodes[0]?.name}</span>
                    <div className="flex">
                        <span>{media.seasonYear}</span>
                        <span>{media.season}</span>
                    </div>
                    <div className="flex">
                        <span>{`${media.startDate.day} ${numberToMonth.get(media.startDate.month)} ${media.startDate.year}`}</span>
                        <span>~</span>
                        <span>{`${media.endDate.day} ${numberToMonth.get(media.endDate.month)} ${media.endDate.year}`}</span>
                    </div>
                    <span>{media.description}</span>
                    <div className="flex justify-evenly">
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
                </div>

            </motion.div>

        </motion.div>
    );
}

export default Focused;