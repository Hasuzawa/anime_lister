import { makeObservable, observable, computed, action} from "mobx";
import { createContext } from "react";

class Settings {
    displayAdultContent: boolean = false;

    constructor() {
        makeObservable(this, {
            displayAdultContent: observable,
            toggleDisplayAdultContent: action,
        })
    }

    toggleDisplayAdultContent = (): void => {
        this.displayAdultContent = !this.displayAdultContent;
    }
}


const SettingsContext = createContext<Settings>(new Settings());
export { SettingsContext }