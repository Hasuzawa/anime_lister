import { SortAscending, SortDescending, ListNumbers} from "phosphor-react";
import { useState } from "react";
import { motion, usePresence } from "framer-motion";

enum SortField {        //note: the string value are for sort menu, not for GraphQL
    TITLE = "title",        //i.e. abcd ...
    AVERAGE_SCORE = "average score",
    POPULARITY = "popularity",
    YEAR = "year",
};

enum SortOrder {
    ASCENDING = "ascending",
    DESCENDING = "descending"
};

const SortMenu = () => {
    const [ sortOrder, setSortOrder ] = useState<SortOrder>(SortOrder.DESCENDING);
    const toggleSort = () => sortOrder === SortOrder.ASCENDING ? setSortOrder(SortOrder.DESCENDING) : setSortOrder(SortOrder.ASCENDING);

    const [ sortField, setSortField ] = useState<string>("");
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
                
                <div>
                    <span>Sort by</span>
                        <div className="w-full h-16 bg-white rounded-lg relative"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {hovered &&
                                <ul className="absolute top-0 bg-green-300 h-96 w-60">
                                    {Object.values(SortField).map((element, idx: number) =>
                                        <li
                                            key={idx}
                                            className="list-none cursor-pointer text-center"
                                            onClick={() => {setSortField(element); setHovered(false);}}
                                        >
                                            {element}
                                        </li>
                                    )}
                                </ul>
                            }
                        <h1>{sortField}</h1>
                    </div>
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