import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, X } from "phosphor-react";

interface Focused{
    media: any
    deselectSelected: () => void;
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
                <div className="flex-none w-3/10 bg-blue-300 ">
                    <Image src={media.coverImage.extraLarge} width={300} height={500} />
                </div>
                <div className="flex-none w-7/10 flex flex-col p-4 bg-red-300">
                    <span>{media.title.english}</span>
                    <span>{media.studios.nodes[0].name}</span>
                    <span>{media.seasonYear}</span>
                    <span>{media.season}</span>
                </div>
                
                <div className="flex flex-col">
                </div>
                



            </motion.div>

        </motion.div>
    );
}

export default Focused;