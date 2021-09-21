import { motion } from "framer-motion";
import Feeds from "~/components/Main/Feeds";
import { Dispatch, SetStateAction } from "react";


interface MainProps{
    setScrollYProgress: Dispatch<SetStateAction<number>>;
}

const Main = (props: MainProps): JSX.Element => {
    return (
        /* add custom scroller to this main */
        <motion.main id="main" className={`flex-auto w-280 max-h-full bg-red-300 overflow-hidden relative
        `} layout>
            <Feeds setScrollYProgress={props.setScrollYProgress} />
        {/* <Test /> */}

        </motion.main>
    );
}

export default Main;