import { makeObservable, observable, computed, action, flow} from "mobx";
import { createContext } from "react";
import { MediaStatus, MediaFormat } from "~/components/enums";


class FilterFields {
    year: number | null = null;
    status: MediaStatus | null = null;
    format: MediaFormat | null = null;

    constructor() {
        makeObservable(this, {
            year: observable,
            status: observable,
            format: observable,

            setYear: action,
            setStatus: action,
            setFormat: action
        })
    }

    setYear(year: number) {
        this.year = year;
    }

    setStatus(status: MediaStatus) {
        this.status = status;
    }

    setFormat(format: MediaFormat) {
        this.format = format;
    }


}

export default FilterFields;

const FilterFieldsContext = createContext<FilterFields>(new FilterFields());
export { FilterFieldsContext };