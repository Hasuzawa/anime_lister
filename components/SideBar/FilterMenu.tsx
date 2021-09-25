import { Funnel } from "phosphor-react";
import { useState, useContext } from "react";
import { motion, usePresence } from "framer-motion";
import Select from "~/components/SideBar/Select";
import { MediaStatus, MediaFormat } from "~/components/enums";

import { observer } from "mobx-react-lite";


import { FilterFieldsContext } from "~/stores/stores";

const FilterMenu = observer(() => {
    const filterFields = useContext(FilterFieldsContext);
    console.log(filterFields);

    const lastSupportedYear = 1930;
    const currentYear = new Date().getFullYear();
    var yearArray: Array<number> = [];
    for (let i = currentYear; i >= lastSupportedYear; i--) {
        yearArray.push(i);
    }



    const [ year, setYear ] = useState<number>();
    const [ status, setStatus ] = useState<MediaStatus>();


    const [ format, setFormat ] = useState<MediaFormat>();



    const logoSize = 40;
    return (
        <div className="border-black border-4">
            <button onClick={() => filterFields.setYear(1995)}>testing mobx</button>
            <span>{filterFields.year}</span>
            <div className="flex justify-center">

                <Funnel size={logoSize} />
                <span>Filter</span>
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-row">
                    <span>Year</span>
                    <Select
                        selected={year}
                        setSelected={setYear}
                        options={yearArray}
                        width={96}
                    />
                </div>
                <div className="flex flex-row">
                    <span>Status</span>
                    <Select
                        selected={status}
                        setSelected={setStatus}
                        options={Object.values(MediaStatus)}
                        width={160}
                    />
                </div>
                <div className="flex flex-row">
                    <span>Format</span>
                    <Select
                        selected={format}
                        setSelected={setFormat}
                        options={Object.values(MediaFormat)}
                        width={160}
                    />
                </div>
            </div>
        </div>
    );
})

export default FilterMenu;