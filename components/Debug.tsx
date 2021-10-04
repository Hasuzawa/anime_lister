import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FilterFieldsContext } from '~/stores/FilterFields';
import { SortFieldsContext } from "~/stores/SortFields";
import { SettingsContext } from "~/stores/Settings";

const Debug = observer(() => {
    const filterFields = useContext(FilterFieldsContext);
    const sortFields = useContext(SortFieldsContext);
    const settings = useContext(SettingsContext);

    return (
        <div className="absolute w-48 top-0 right-0 bg-yellow-300 z-10 flex flex-col opacity-75">
            <h1>{settings.scrollYProgress.toFixed(5)}</h1>
            <span>collapse state is {settings.isCollapsed.toString()}</span>
            <span>year is {filterFields.year}</span>
            <span>status is {filterFields.status}</span>
            <span>format is {filterFields.format}</span>
            <span>sorting criterium is {sortFields.criterion}</span>
        </div>
    );
});

export default Debug;