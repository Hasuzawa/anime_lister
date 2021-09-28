import { makeObservable, observable, computed, action} from "mobx";
import { createContext } from "react";
import { MediaStatus, MediaFormat, enumKeyFromValue } from "~/components/enums";

type FilterYear = number | "Any";


const currentYear: number = new Date().getFullYear();

class FilterFields {
    year: FilterYear = currentYear;
    status: MediaStatus = MediaStatus.ANY;
    format: MediaFormat = MediaFormat.ANY;

    constructor() {
        makeObservable(this, {
            year: observable,
            status: observable,
            format: observable,

            setYear: action,
            setStatus: action,
            setFormat: action,

            sortYear: computed,
            sortStatus: computed,
            sortFormat: computed
        })
    }

    // if you don't write in anonymous => form, TS will complain the object is not extensible (because it is not binded)
    setYear = (year: FilterYear): void => {
        this.year = year;
    }

    setStatus = (status: MediaStatus): void => {
        this.status = status;
    }

    setFormat = (format: MediaFormat): void => {
        this.format = format;
    }

    // note that this is NOT a function, you access the return value as if it is a field, i.e. filterFields.getYear
    get sortYear(): number | undefined {
        if (typeof this.year === "number") {return this.year;}
        else {return undefined;}         // "any" or any other type returns null
    }

    get sortStatus(): string | undefined {
        if (this.status === MediaStatus.ANY) {return undefined;}
        else {return enumKeyFromValue(MediaStatus, this.status);}  
    }

    get sortFormat(): string | undefined {
        if (this.format === MediaFormat.ANY) {return undefined;}
        else {return enumKeyFromValue(MediaFormat, this.format);}
    }
}

export default FilterFields;

const FilterFieldsContext = createContext<FilterFields>(new FilterFields());
export { FilterFieldsContext };


export type { FilterYear };