import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import SideLogoBar from "~/components/SideBar/SideLogoBar"


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
            layout
            >
                <motion.div id="panel-top" className="p-4 bg-yellow-300">
                    <motion.h1 layout>logo here</motion.h1>
                    {/* place a corner github here? */}
                </motion.div>
                <motion.div id="panel-middle" className="p-4" >
                    <motion.input type="text" layout></motion.input>
                </motion.div>
                <motion.div id="panel-bottom" className="p-4 flex flex-col items-center" layout>
                    <Link href={HasuzawaLink}><a>Created by Hasuzawa</a></Link>
                    <Link href={AniListAPI}><a>anime API by AniList</a></Link>
                </motion.div>
            
            </motion.div>
            <SideLogoBar isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
        </motion.div>

    );
}

const HasuzawaLink = "https://github.com/Hasuzawa";
const AniListAPI = "https://github.com/AniList/ApiV2-GraphQL-Docs";

export default SideBar;