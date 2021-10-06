import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, X } from "phosphor-react";
import { MediaFormat } from "~/components/enums";

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

    
    return (
        // overlay backdrop of <Main>
        <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex z-10 justify-center items-center cursor-pointer"
            onClick={props.deselectSelected}
            layout
        >
            {/* only deactivate when the overlay is clicked */}
            <motion.div
                className={"w-3/4 h-3/4 focused-frame-color cursor-default relative p-4 flex"}
                layoutId={props.media.id.toString()}
                onClick={(e) => {e.stopPropagation()}}
            >
                {/* <X size={44} className="absolute top-0 right-0 cursor-pointer" onClick={props.deselectSelected}/> */}
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
                <div className="flex-none w-7/10 flex flex-col p-4 bg-red-30x focused-frame-col bg-white overflow-auto gap-y-4">
                    <NameAndProducer media={media} />

                    <SeasonAndTime media={media} />
                    <EpisodeFormatStatus media={media} />

                    <div className="flex-none flex justify-evenly">
                        {media.genres.map((element: string, idx: number) => 
                        <span
                            className=""
                            key={idx}
                        >
                            {element}
                        </span>)}
                    </div>

                    <Statistics media={media} />

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

interface FocusedSubComponents {
    readonly media: any
}

const NameAndProducer = (props: FocusedSubComponents) => {
    const { media } = props;
    // null | undefined field handled at cache

    let producer: string = "(Unknown Producer)";
    if (media.studios.nodes[0]?.name) {
        producer = media.studios.nodes[0]?.name;
    }

    return (
        <div className="flex-none">
            <Link href={media.siteUrl}><a>
                <span className="block text-xl">{media.title.english}</span>
            </a></Link>
            <span className="italic">{producer}</span>
        </div>
    );
}

const SeasonAndTime = (props: FocusedSubComponents) => {
    const media = props.media;
    const { startDate, endDate } = media;

    let season: string = "?";
    if (media.season && media.seasonYear) {
        season = `${capitaliseFirstLetter(media.season)} ${media.seasonYear}`;
    }
    
    let start = "?";
    if (startDate.day && startDate.month && startDate.year) {
        start = `${startDate.day} ${numberToMonth.get(startDate.month)} ${startDate.year}`
    }
    let end = "?";
    if (endDate.day && endDate.month && endDate.year) {
        end = `${endDate.day} ${numberToMonth.get(endDate.month)} ${endDate.year}`
    }
    
    return (
        <div className="flex-none flex justify-between">
            <span className="mr-16">Season: {season}</span>
            <span>{`Airing: ${start} ~ ${end}`}</span>
        </div>
    );
}

const EpisodeFormatStatus = (props: FocusedSubComponents) => {
    const { media } = props;
    // handling of null/undefined field is done at cache level in _app.tsx

    return (
        <div className="flex-none flex justify-between">
            <span>{`Episode: ${media.episodes}`}</span>
            <span>{`Format: ${media.format}`}</span>
            <span>{`Status: ${media.status}`}</span>
        </div>
    );
}

const Statistics = (props: FocusedSubComponents) => {
    const { media } = props;
    let stat = [
        {
            name: "Average Score",
            field: "averageScore",
        },
        {
            name: "Mean Score",
            field: "meanScore",
        },
        {
            name: "Popularity",
            field: "popularity",
            decorator: shortenedNumeric,
        },
        {
            name: "Favourited",
            field: "favourites",
            decorator: shortenedNumeric,
        },
    ]


    return (
        <div className="flex-none flex justify-evenly">
            { stat.map((element, idx) => {
                if (media[element.field] || media[element.field] === 0) {
                    let value = media[element.field];
                    return (
                        <div key={idx} className="flex flex-col items-center" >
                            <span>{element.name}</span>
                            { element.decorator ?
                                <span>{element.decorator(value)}</span> :
                                <span>{value}</span>
                            }
                        </div>
                    )
                }
            })}
        </div>
    );
}


export default Focused;