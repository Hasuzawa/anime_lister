import Link from "next/link"
import { useContext } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import FilterMenu from "~/components/SideBar/FilterMenu";
import SortMenu from "~/components/SideBar/SortMenu";

import { SettingsContext } from "~/stores/Settings";

const collapseVariant: Variants = {
    // hidden: {
    //     width: 1    
    // },
    open: {
        width: 272,
        transition: {
            duration: 0.5
        }
    },
    collapsed: {
        width: 0,       //changing width might cause continuous layout change, which is expensive in CPU
        transition: {
            duration: 0.5
        }
    }
}

const ControlPanel = () => {
    const settings = useContext(SettingsContext);

    return (
        // for CSS, do note that the change in content and bg are instant for w-0, even w-1 is visually very different
        <motion.div
            id="control-panel"
            className={"flex-none overflow-x-hidden overflow-y-auto secondary-bg-color flex flex-col"} //don't change width by CSS, it won't be animated that way
            variants={collapseVariant}
            animate={ settings.isCollapsed ? "collapsed" : "open"}
            layout
        >
            <motion.div id="panel-top" className="flex-none p-4 bg-yellow-300 h-28 w-68" >
                <motion.h1 layout>logo here</motion.h1>
                {/* place a corner github here? */}
            </motion.div>
            <motion.div id="panel-middle" className="flex-auto w-68 p-4" >
                {/* I ought to implement my own input components */}

                {/* <motion.input type="text" layout></motion.input> notice the layout here, this prevents it being distorted */}
                {/* <input type="number"></input> */}

                <FilterMenu />
                <SortMenu />

            </motion.div>
            <motion.div id="panel-bottom" className="flex-none p-4 flex flex-col items-center w-68" >
                <Link href={HasuzawaLink}><a>Created by Hasuzawa</a></Link>
                <Link href={AniListAPI}><a>anime API by AniList</a></Link>
            </motion.div>
        
        </motion.div>
    );
}

const HasuzawaLink = "https://github.com/Hasuzawa";
const AniListAPI = "https://github.com/AniList/ApiV2-GraphQL-Docs";

export default ControlPanel;