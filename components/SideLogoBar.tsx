import { useState } from "react";
import { Image, ListBullets, ArrowFatLinesUp, ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";


const SideLogoBar = () => {
    const logoSize = 40;

    return (
        <div className={"flex-none top-0 right-0 bottom-0 w-12      flex flex-col relative      border-r-4"}>
            <div className={"flex-1"}>
                <Image size={logoSize} />
            </div>
            <div className={"flex-none bottom-0 "}>
                <ArrowCircleLeft size={logoSize} />
                <ArrowFatLinesUp size={logoSize} />
            </div>
        </div>
    );
}

export default SideLogoBar;