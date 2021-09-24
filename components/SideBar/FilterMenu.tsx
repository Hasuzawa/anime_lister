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
                <div>
                    <span>Year</span>
                    <input type="number" />
                </div>
                <div>
                    <span>Status</span>
                    <input type="text" />
                </div>
                <div>
                    <span>Format</span>
                    <select>
                        <option>option 1</option>
                        <option>option 2</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FilterMenu;