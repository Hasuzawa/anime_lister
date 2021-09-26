import { makeObservable, observable, computed, action, flow} from "mobx";
import { createContext } from "react";
import { MediaStatus, MediaFormat } from "~/components/enums";

type Year = number | "any";
type SortMediaStatus = MediaStatus | "any";


const currentYear: number = new Date().getFullYear();

class FilterFields {
    year: Year = currentYear;
    status: MediaStatus | null = null;
    format: MediaFormat | null = null;

    constructor() {
        makeObservable(this, {
            year: observable,
            status: observable,
            format: observable,

            setYear: action,
            setStatus: action,
            setFormat: action,

            getYear: computed,
            getStatus: computed,
            getFormat: computed
        })
    }

    // if you don't write in => form, TS will complain the object is not extensible (because it is not binded)
    setYear = (year: Year): void => {
        this.year = year;
    }

    setStatus = (status: MediaStatus | null): void => {
        this.status = status;
    }

    setFormat = (format: MediaFormat | null): void => {
        this.format = format;
    }

    // note that this is NOT a function, you access the return value as if it is a field, i.e. filterFields.getYear
    get getYear(): number | null {
        if (typeof this.year === "number") {return this.year;}
        else {return null;}         // "any" or any other type returns null
    }

    get getStatus(): MediaStatus | null {
        return this.status;
    }

    get getFormat(): MediaFormat | null {
        return this.format;
    }
}

export default FilterFields;

const FilterFieldsContext = createContext<FilterFields>(new FilterFields());
export { FilterFieldsContext };


export type { Year };