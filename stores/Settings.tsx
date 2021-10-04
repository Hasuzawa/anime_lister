import { makeObservable, observable, computed, action} from "mobx";
import { createContext } from "react";

// interface PageInfo {
//     currentPage: number;
//     lastPage: number
//     hasNextPage: boolean
// }

class Settings {
    isCollapsed: boolean = false;
    displayAdultContent: boolean = false;
    scrollYProgress: number = 0;       //0 when at top, 1 when at bottom

    currentPage: number = 1;     //for pagination
    lastPage: number = 1;
    hasNextPage: boolean = false;

    constructor() {
        makeObservable(this, {
            displayAdultContent: observable,
            toggleDisplayAdultContent: action,

            isCollapsed: observable,
            toggleCollapsed: action,
            setCollapsed: action,

            scrollYProgress: observable,
            setScrollYProgress: action,

            currentPage: observable,
            setCurrentPage: action,

            lastPage: observable,
            setLastPage: action,

            hasNextPage: observable,
            setHasNextPage: action
        })
    }

    toggleDisplayAdultContent = (): void => {
        this.displayAdultContent = !this.displayAdultContent;
    }

    toggleCollapsed = (): void => {
        this.isCollapsed = !this.isCollapsed;
    }

    setCollapsed = (collapsedState: boolean): void => {
        this.isCollapsed = collapsedState;
    }

    setScrollYProgress = (scrollYProgress: number): void => {
        this.scrollYProgress = scrollYProgress;
    }

    setCurrentPage = (currentPage: number): void => {
        this.currentPage = currentPage;
    }

    setLastPage = (lastPage: number): void => {
        this.lastPage = lastPage;
    }

    setHasNextPage = (hasNextPage: boolean): void => {
        this.hasNextPage = hasNextPage;
    }

}


const SettingsContext = createContext<Settings>(new Settings());
export { SettingsContext }