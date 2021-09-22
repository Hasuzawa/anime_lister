import { Funnel } from "phosphor-react";
import { useState } from "react";
import { motion, usePresence } from "framer-motion";


const FilterMenu = () => {

    const logoSize = 40;
    return (
        <div className="border-black border-4">
            <div className="flex">

                <Funnel size={logoSize} />
                <span>Filter</span>
            </div>
            <div className="flex flex-col">
                <span>Year</span>
                <span>Status</span>
                <span>Format</span>
            </div>
        </div>
    );
}

export default FilterMenu;