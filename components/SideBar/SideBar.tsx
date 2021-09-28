import { motion, AnimatePresence } from "framer-motion"

import SideLogoBar from "~/components/SideBar/SideLogoBar"
import ControlPanel from "~/components/SideBar/ControlPanel";


const SideBar = () => {

    return (
        <motion.div
            id="side-bar"
            className={"flex-initial bg-blue-300 flex relative"}
            layout
        >
            <ControlPanel />
            <SideLogoBar />
        </motion.div>
    );
}



export default SideBar;