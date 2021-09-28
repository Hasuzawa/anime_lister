import { makeObservable, observable, computed, action} from "mobx";
import { createContext } from "react";
import { SortCriterion , enumKeyFromValue } from "~/components/enums";

class SortFields {
    criterion: SortCriterion = SortCriterion.POPULARITY_DESC;

    constructor() {
        makeObservable(this, {
            criterion: observable,
            setCriterion: action,
            sortCriterion: computed
        });
    }

    setCriterion = (criterion: SortCriterion): void => {
        this.criterion = criterion;
    }

    get sortCriterion(): string {
        return enumKeyFromValue(SortCriterion, this.criterion);
    }

}

export default SortFields;

const SortFieldsContext = createContext<SortFields>(new SortFields());
export { SortFieldsContext };