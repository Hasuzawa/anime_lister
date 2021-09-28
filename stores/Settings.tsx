import { makeObservable, observable, computed, action} from "mobx";
import { createContext } from "react";

class Settings {
    isCollapsed: boolean = false;
    displayAdultContent: boolean = false;
    scrollYProgress: number = 0;       //0 when at top, 1 when at bottom

    constructor() {
        makeObservable(this, {
            displayAdultContent: observable,
            toggleDisplayAdultContent: action,

            isCollapsed: observable,
            toggleCollapsed: action,

            scrollYProgress: observable,
            setScrollYProgress: action,
        })
    }

    toggleDisplayAdultContent = (): void => {
        this.displayAdultContent = !this.displayAdultContent;
    }

    toggleCollapsed = (): void => {
        this.isCollapsed = !this.isCollapsed;
    }

    setScrollYProgress = (scrollYProgress: number): void => {
        this.scrollYProgress = scrollYProgress;
    }
}


const SettingsContext = createContext<Settings>(new Settings());
export { SettingsContext }