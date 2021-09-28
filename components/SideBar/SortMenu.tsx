import { SortAscending, SortDescending, ListNumbers} from "phosphor-react";
import { useState, useContext } from "react";
import { motion, usePresence } from "framer-motion";
import { SortCriterion } from "~/components/enums";
import Select from "~/components/SideBar/Select";

import { SortFieldsContext } from "~/stores/SortFields";

import { observer } from "mobx-react-lite";


const SortMenu = observer(() => {
    const sortFields = useContext(SortFieldsContext);

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
                
                <div className="flex flex-col items-center">
                    <span>Sort by</span>
                    <Select
                        selected={sortFields.criterion}
                        setSelected={sortFields.setCriterion}
                        options={Object.values(SortCriterion)}
                        width={200}
                    />
                </div>

            </div>
        </>
    );
});

export default SortMenu;