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
    //a 
    return (
        // overlay backdrop of <Main>
        <motion.div
            className="absolute inset-0 bg-black bg-opacity-30 flex z-10 justify-center items-center cursor-pointer"
            onClick={props.deselectSelected}
            layout
        >
            {/* only deactivate when the overlay is clicked */}
            <motion.div
                className={"w-3/4 h-3/4 bg-blue-300 cursor-default"}
                layoutId={props.media.id.toString()}
                onClick={(e) => {e.stopPropagation()}}
            >
                <Image src={media.coverImage.extraLarge} width={200} height={350} />
            </motion.div>

        </motion.div>
    );
}

export default Focused;