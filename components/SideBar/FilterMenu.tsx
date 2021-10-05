import { Funnel } from "phosphor-react";
import { useState, useContext } from "react";
import { motion, usePresence } from "framer-motion";
import Select from "~/components/SideBar/Select";
import { MediaStatus, MediaFormat } from "~/components/enums";

import { observer } from "mobx-react-lite";


import { FilterYear, FilterFieldsContext } from "~/stores/FilterFields";

const FilterMenu = observer(() => {
    const filterFields = useContext(FilterFieldsContext);

    const lastSupportedYear: number = 1930;
    const currentYear: number = new Date().getFullYear() + 1;
    var yearArray: Array<FilterYear> = [];
    yearArray.push("Any");
    for (let i = currentYear; i >= lastSupportedYear; i--) {
        yearArray.push(i);
    }


    const logoSize = 40;

    return (
        <div className="border-t separator-border-color flex flex-col py-2 gap-y-2">
            <div className="flex justify-center">
                <h1 className="font-system-ui">Filter</h1>
            </div>
            <div className="flex flex-row">
                <span className="flex-none w-16 text-center">Year</span>
                <Select
                    selected={filterFields.year}
                    setSelected={filterFields.setYear}
                    options={yearArray}
                    width={96}
                    id={"yearFilterSelect"}
                />
            </div>
            <div className="flex flex-row">
                <span className="flex-none w-16 text-center">Status</span>
                <Select
                    selected={filterFields.status}
                    setSelected={filterFields.setStatus}
                    options={Object.values(MediaStatus)}
                    width={160}
                    id={"statusFilterSelect"}
                />
            </div>
            <div className="flex flex-row">
                <span className="flex-none w-16 text-center">Format</span>
                <Select
                    selected={filterFields.format}
                    setSelected={filterFields.setFormat}
                    options={Object.values(MediaFormat)}
                    width={160}
                    id={"formatFilterSelect"}
                />
            </div>
        </div>
    );
})

export default FilterMenu;