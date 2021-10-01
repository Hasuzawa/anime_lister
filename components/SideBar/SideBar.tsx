import { motion, AnimatePresence } from "framer-motion"

import SideLogoBar from "~/components/SideBar/SideLogoBar"
import ControlPanel from "~/components/SideBar/ControlPanel";


const SideBar = () => {

    return (
        <motion.div
            id="side-bar"
            className={"flex-initial secondary-bg-color flex relative text-white"}
            layout
        >
            <ControlPanel />
            <SideLogoBar />
        </motion.div>
    );
}



export default SideBar;