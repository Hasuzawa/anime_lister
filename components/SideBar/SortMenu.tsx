import { SortAscending, SortDescending, ListNumbers} from "phosphor-react";
import { useState } from "react";
import { motion, usePresence } from "framer-motion";
import { SortField, SortOrder } from "~/components/enums";
import Select from "~/components/SideBar/Select";



const SortMenu = () => {
    const [ sortOrder, setSortOrder ] = useState<SortOrder>(SortOrder.DESCENDING);
    const toggleSort = () => sortOrder === SortOrder.ASCENDING ? setSortOrder(SortOrder.DESCENDING) : setSortOrder(SortOrder.ASCENDING);

    const [ sortField, setSortField ] = useState<SortField>(SortField.POPULARITY);
    const [ hovered, setHovered ] = useState<boolean>(false);
    const toggleHovered = () => setHovered(!hovered);


    const iconSize = 40;
    const commonProps = {
        size: iconSize,
    }
    

    return (
        <>
            <div className="border-black border-4">
                <div className="flex justify-center">
                    <ListNumbers size={iconSize} />
                </div>
                
                <div className="flex flex-row">
                    <span>Sort by</span>
                    <Select<SortField>
                        selected={sortField}
                        setSelected={setSortField}
                        options={Object.values(SortField)}
                        width={160}
                    />
                </div>

                
                <div className="flex items-center cursor-pointer" onClick={toggleSort} >
                    {sortOrder === SortOrder.ASCENDING ?
                        <SortAscending {...commonProps} /> :
                        <SortDescending {...commonProps} />
                    }
                    <span>{sortOrder}</span>
                </div>
            </div>
        </>
    );
}

export default SortMenu;