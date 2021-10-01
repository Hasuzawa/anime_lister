import { useContext } from "react";
import Image from "next/image";
import { ArrowFatLinesUp, ArrowFatLinesDown, ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import { motion } from "framer-motion";
import { SettingsContext } from "~/stores/Settings";
import { observer } from "mobx-react-lite";
import heart_locked from "~/public/icons/heart_locked.svg";
import heart_unlocked from "~/public/icons/heart_unlocked.svg";

const SideLogoBar = observer(() => {
    const settings = useContext(SettingsContext);

    const logoSize = 40;

    function collapseExpandButton(): JSX.Element {
        return settings.isCollapsed ? <ArrowCircleRight className={"cursor-pointer"} size={logoSize} onClick={settings.toggleCollapsed} />
                           : <ArrowCircleLeft className={"cursor-pointer"} size={logoSize} onClick={settings.toggleCollapsed} />
    }

     const displayAdultContent = () => {
        return settings.displayAdultContent ?
            <Image src={heart_unlocked.src} width={logoSize} height={logoSize} onClick={settings.toggleDisplayAdultContent} />
            : <Image src={heart_locked.src} width={logoSize} height={logoSize} onClick={settings.toggleDisplayAdultContent} />
    }

    return (
        <motion.div
            className={"flex-none top-0 right-0 bottom-0 w-12      flex flex-col relative      border-r-4 border-main-color relative"}
            layout
        >
            <div className={"flex-1 flex flex-col items-center"}>
                {/* <Image size={logoSize} /> */}
                {displayAdultContent()}
            </div>
            <div className="flex-none flex flex-col items-center" >
                <span className="w-4 border-b-2 text-center">{settings.currentPage}</span>
                <span>{settings.lastPage}</span>
            </div>
            <div className={"flex-none bottom-0 flex flex-col items-center"}>
                {collapseExpandButton()}
                <ArrowFatLinesUp
                    className="cursor-pointer" 
                    size={logoSize}
                    onClick={() => document.getElementById("feeds")?.scrollTo(0,0)}
                />
                <ArrowFatLinesDown
                    className="cursor-pointer"
                    size={logoSize}
                    onClick={() => {
                        let element = document.getElementById("feeds");
                        if (element) {
                            element.scrollTop = element.scrollHeight;
                        }
                    }}
                />
            </div>

            <YScrollIndicator scrollYProgress={settings.scrollYProgress} />
        </motion.div>
    );
});

interface YScrollProps{
    scrollYProgress: number
}

const YScrollIndicator = (props: YScrollProps): JSX.Element => {
    return (
            //this is the y scroll indicator

            //-right-1 (4px to the right of content, i.e. where the border is)

            // viewport width = viewBox width => x-scale perserved
            // viewport height != viewBox height => y-scale NOT perserved   (in this case, it stretches/shrinks to parent height)
            <motion.svg
                width="4"
                height="100%"
                viewBox="0 0 4 1000"
                preserveAspectRatio="none"
                className="absolute top-0 bottom-0 -right-1"
                
            >
                <motion.path
                    d="M2 0 L2 1000"
                    fill="transparent"
                    strokeWidth="4"
                    stroke="#EF0073"
                    //stroke="#ef4f91"
                    strokeLinecap="butt"

                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: props.scrollYProgress }}
                    transition={{
                        duration: 0,
                        ease: "linear",
                    }}                
                />
            </motion.svg>
    );
}

export default SideLogoBar;