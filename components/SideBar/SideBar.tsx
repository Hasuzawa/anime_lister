import { motion } from "framer-motion";
import SideLogoBar from "~/components/SideBar/SideLogoBar";


interface SideBarProps{
    isCollapsed: boolean;
    toggleCollapsed: () => void;
}


const SideBar = (props: SideBarProps) => {
    let isCollapsed = props.isCollapsed;
    let toggleCollapsed = props.toggleCollapsed;



    return (
        <motion.div id="side-bar" className={"flex-initial bg-blue-300 flex relative"} layout>
        {/* do note that the change in content and bg are instant for w-0, even w-1 is visually very different */}
        <motion.div
          id="control-panel"
          className={"flex-none overflow-hidden bg-pink-400" + (isCollapsed ? " w-0" : " w-68")}
          
          
          layout>
          <motion.h1 layout>logo here</motion.h1>
          <motion.input type="text" layout></motion.input>
          
        </motion.div>
        <SideLogoBar isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
    </motion.div>

    );
}

export default SideBar;