import { motion } from "framer-motion";
import Feeds from "~/components/Main/Feeds";
import { observer } from "mobx-react-lite";

const Main = observer((): JSX.Element => {
    return (
        /* add custom scroller to this main */
        <motion.main
            id="main"
            className={`flex-auto w-280 max-h-full main-bg-color overflow-hidden relative`}
            layout
        >
            <Feeds />
        </motion.main>
    );
})

export default Main;