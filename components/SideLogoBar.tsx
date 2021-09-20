import { useState, Dispatch, SetStateAction } from "react";
import { Image, ListBullets, ArrowFatLinesUp, ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import { motion } from "framer-motion";

interface SideLogoBarProps{
    isCollapsed: boolean;
    toggleCollapsed: () => void;
}

const SideLogoBar = (props: SideLogoBarProps) => {
    const logoSize = 40;

    function collapseExpandButton(isCollapsed: boolean = props.isCollapsed): JSX.Element {
        return isCollapsed ? <ArrowCircleRight size={logoSize} onClick={props.toggleCollapsed} />
                           : <ArrowCircleLeft size={logoSize} onClick={props.toggleCollapsed} />
    }

    return (
        <motion.div className={"flex-none top-0 right-0 bottom-0 w-12      flex flex-col relative      border-r-4"} layout >
            <div className={"flex-1 flex flex-col items-center"}>
                <Image size={logoSize} />
            </div>
            <div className={"flex-none bottom-0 flex flex-col items-center"}>
                {collapseExpandButton()}
                <ArrowFatLinesUp size={logoSize} />
            </div>
        </motion.div>
    );
}

export default SideLogoBar;