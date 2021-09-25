import { motion, AnimatePresence } from "framer-motion"

import SideLogoBar from "~/components/SideBar/SideLogoBar"
import ControlPanel from "~/components/SideBar/ControlPanel";



interface SideBarProps{
    isCollapsed: boolean;
    toggleCollapsed: () => void;
    scrollYProgress: number;
}


const SideBar = (props: SideBarProps) => {
    let isCollapsed = props.isCollapsed;
    let toggleCollapsed = props.toggleCollapsed;



    return (
        <motion.div id="side-bar" className={"flex-initial bg-blue-300 flex relative"} layout>
            <ControlPanel isCollapsed={isCollapsed} />
            {/* ...props ? */}
            <SideLogoBar
                isCollapsed={isCollapsed}
                toggleCollapsed={toggleCollapsed}
                scrollYProgress={props.scrollYProgress}     
            />
        </motion.div>

    );
}



export default SideBar;