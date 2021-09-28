import Link from "next/link"
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FilterMenu from "~/components/SideBar/FilterMenu";
import SortMenu from "~/components/SideBar/SortMenu";

import { SettingsContext } from "~/stores/Settings";

const collapseVariant = {
    hidden: {
        width: 1
    },
    visible: {
        width: 272,
        transition: {
            duration: 5
        }
    },
    exit: {
        width: 1,
        transition: {
            duration: 5
        }
    }
}

const ControlPanel = () => {
    const settings = useContext(SettingsContext);

    return (
        // do note that the change in content and bg are instant for w-0, even w-1 is visually very different
        <AnimatePresence>
        <motion.div
            id="control-panel"
            className={"flex-none overflow-hidden bg-pink-400"/* + (settings.isCollapsed ? " w-0" : " w-68")*/}
            variants={collapseVariant}
            initial="hidden"
            animate={ settings.isCollapsed ? "exit" : "visible"}
            exit="exit"
            layout
        >
            <motion.div id="panel-top" className="p-4 bg-yellow-300 h-28" layout>
                <motion.h1 layout>logo here</motion.h1>
                {/* place a corner github here? */}
            </motion.div>
            <motion.div id="panel-middle" className="p-4" layout>
                {/* I ought to implement my own input components */}

                {/* <motion.input type="text" layout></motion.input> notice the layout here, this prevents it being distorted */}
                {/* <input type="number"></input> */}

                <FilterMenu />
                <SortMenu />

            </motion.div>
            <motion.div id="panel-bottom" className="p-4 flex flex-col items-center" layout>
                <Link href={HasuzawaLink}><a>Created by Hasuzawa</a></Link>
                <Link href={AniListAPI}><a>anime API by AniList</a></Link>
            </motion.div>
        
        </motion.div>
        </AnimatePresence>
    );
}

const HasuzawaLink = "https://github.com/Hasuzawa";
const AniListAPI = "https://github.com/AniList/ApiV2-GraphQL-Docs";

export default ControlPanel;