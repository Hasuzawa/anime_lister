import { motion } from "framer-motion";
import Feeds from "~/components/Main/Feeds";


interface MainProps{

}

const Main = (): JSX.Element => {
    return (
        /* add custom scroller to this main */
        <motion.main id="main" className={`flex-auto w-280 max-h-full bg-red-300 overflow-hidden relative
        `} layout>
            <Feeds />
        {/* <Test /> */}

        </motion.main>
    );
}

export default Main;