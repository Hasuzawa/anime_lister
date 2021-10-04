import Link from "next/link"
import { useContext } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

import FilterMenu from "~/components/SideBar/FilterMenu";
import SortMenu from "~/components/SideBar/SortMenu";
import HotkeyMenu from "~/components/SideBar/HotkeyMenu";

import { SettingsContext } from "~/stores/Settings";

import { observer } from "mobx-react-lite";

import logo from "~/public/icons/logo.svg";

const collapseVariant: Variants = {

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

const ControlPanel = observer(() => {
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
            <motion.div id="panel-top" className="flex-none p-2 w-68 flex flex-col items-center gap-y-2" >
                <Image src={logo.src} width={60} height={60} priority />
                <motion.h1 layout>Compact Anime Searching</motion.h1>
                
            </motion.div>
            <motion.div id="panel-middle" className="flex-auto w-68 p-2" >

                <FilterMenu />
                <SortMenu />
                <HotkeyMenu />

            </motion.div>
            <motion.div id="panel-bottom" className="flex-none p-2 flex flex-col items-center w-68" >
                <Link href={HasuzawaLink}><a>Created by Hasuzawa</a></Link>
                <Link href={AniListAPI}><a>anime API by AniList</a></Link>
            </motion.div>
        
        </motion.div>
    );
});

const HasuzawaLink = "https://github.com/Hasuzawa";
const AniListAPI = "https://github.com/AniList/ApiV2-GraphQL-Docs";

export default ControlPanel;