import { Funnel } from "phosphor-react";
import { useState, useContext } from "react";
import { motion, usePresence } from "framer-motion";
import Select from "~/components/SideBar/Select";
import { MediaStatus, MediaFormat } from "~/components/enums";

import { observer } from "mobx-react-lite";


import { Year, FilterFieldsContext } from "~/stores/stores";

const FilterMenu = observer(() => {
    const filterFields = useContext(FilterFieldsContext);

    const lastSupportedYear: number = 1930;
    const currentYear: number = new Date().getFullYear();
    var yearArray: Array<Year> = [];
    yearArray.push("any");
    for (let i = currentYear; i >= lastSupportedYear; i--) {
        yearArray.push(i);
    }


    const logoSize = 40;

    return (
        <div className="border-black border-4">
            <div className="flex justify-center">

                <Funnel size={logoSize} />
                <span>Filter</span>
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-row">
                    <span>Year</span>
                    <Select
                        selected={filterFields.year}
                        setSelected={filterFields.setYear}
                        options={yearArray}
                        width={96}
                    />
                </div>
                <div className="flex flex-row">
                    <span>Status</span>
                    <Select
                        selected={filterFields.status}
                        setSelected={filterFields.setStatus}
                        options={Object.values(MediaStatus)}
                        width={160}
                    />
                </div>
                <div className="flex flex-row">
                    <span>Format</span>
                    <Select
                        selected={filterFields.format}
                        setSelected={filterFields.setFormat}
                        options={Object.values(MediaFormat)}
                        width={160}
                    />
                </div>
            </div>
        </div>
    );
})

export default FilterMenu;