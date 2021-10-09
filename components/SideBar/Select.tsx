import { useState, Dispatch, SetStateAction, useEffect, useRef} from "react";
import { motion, AnimateSharedLayout, AnimatePresence, Variants, Variant, Transition } from "framer-motion";
import { onEnter, onUp, onDown } from "functions/KeyboardEvent";


// interface with one generic variable
interface SelectProps<T> {
    selected: T,
    setSelected: (t: T) => void,
    options: T[],
    width: number,
    id: string,     //do provide an unique id, because focus events depend on it
}

function Select<T> (props: SelectProps<T>): JSX.Element {
    const menuRef = useRef<HTMLDivElement>(null);   // for closing menu when clicked outside component
    
    const [ isOpen, setOpen ] = useState<boolean>(false);   //controls menu open & close
    const toggleOpen = () => setOpen(!isOpen);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {   //note that this will run every click as long as
                setOpen(false);                                         //this component is mounted
            }
        }

        document.addEventListener("mousedown", handleClickOutside); //site-wide click event

        return () => {      // clean up
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    const optionMenuId: string = props.id + "-options";
    //const optionRef = useRef<HTMLSpanElement>(null);      I tried using ref to focus on one elment,
    // but it won't trigger a re-render immediately
    

    const [ focused, setFocused ] = useState<number>(0);    // for focusing on an option
    const numberOfOptions = props.options.length;


    function focusOnOption() {
        let FocusedOptionId: string = `${optionMenuId}-${focused}`
        let element = document.getElementById(FocusedOptionId)
        element?.focus()
    }

    useEffect(() => {
        focusOnOption()
    }, [focused])

    const previousOption = () => {
        if (focused <= 0) {
            setFocused(numberOfOptions - 1)
        } else {
            setFocused(focused - 1)
        }
    }

    const nextOption = () => {
        if (focused >= numberOfOptions - 1) {
            setFocused(0)
        } else {
            setFocused(focused + 1)
        }
    }

    const selectRef = useRef<HTMLDivElement>(null);     // for focusing on menu

    const focusOnMenu = () => {
        console.log("esc pressed")
        selectRef.current?.focus()
    }

    const keyboardEvents = (key: string): void => {
        switch (key) {
            case "Enter": toggleOpen(); break;
            case "ArrowUp":
            case "ArrowDown": focusOnOption(); break;
            case "Esc":
            case "Escape":  setOpen(false); break;
            case "Tab": setOpen(false); break;      // close menu first before tab to another element
            default: break;
        }
    }

    // there is one last bug to fix, the menu should close when tab away (i.e. upon losing focus)
    return (
        <div
            className={"relative text-black"}
            style={{width: props.width}}
            //onBlur={() => setOpen(false)}       // close menu if tab to another element (remember unhandled event will bubble up)
            // will cause handleSelection to bug
            ref={menuRef}   // for closing menu when clicked outside
        >
            <div
                className="bg-white w-full h-6 border border-gray-300 rounded-full px-2 flex justify-center items-center cursor-pointer overflow-hidden"
                onClick={toggleOpen}
                tabIndex={0}
                onKeyDown={e => keyboardEvents(e.key)}
                id={props.id}
                ref={selectRef}     // for returning the focus in options
            >
                {props.selected}
            </div>
            { isOpen && 
            <div
                className="absolute w-full flex flex-col mt-0.5 z-10 max-h-72 overflow-y-auto shadow-2xl"
                id={optionMenuId}
            >
                {props.options.map((element, idx) => 
                    <Option
                        key={idx}
                        id={`${optionMenuId}-${idx}`}
                        setSelected={props.setSelected}
                        setOpen={setOpen}

                        previousOption={previousOption}
                        nextOption={nextOption}
                        focusOnMenu={focusOnMenu}
                    >
                        {element}
                    </Option>)}
            </div>
            }
        </div>
    );
}


interface OptionProps<T> {
    id: string

    children: T
    setSelected: (t: T) => void
    setOpen: Dispatch<SetStateAction<boolean>>

    previousOption: () => void
    nextOption: () => void
    focusOnMenu: () => void
}

// wrapped component with generic is difficult to type, check out https://fettblog.eu/typescript-react-generic-forward-refs/

const Option = <T,>(props: OptionProps<T>): JSX.Element => {

    const handleSelection = () => {
        props.setSelected(props.children);
        props.focusOnMenu();
        props.setOpen(false);
    }

    const keyboardEvents = (e: React.KeyboardEvent) => {
        switch(e.key) {
            case "Enter": handleSelection(); break;
            case "ArrowUp": props.previousOption(); break;
            case "ArrowDown": props.nextOption(); break;
            case "Esc":
            case "Escape": props.setOpen(false); props.focusOnMenu(); break;    // close menu, return focus to menu
            default: break;
        }
    }

    return (
        <span
            className="flex-none bg-white w-full h-8 flex justify-center items-center hover:bg-gray-300 cursor-pointer"
            onClick={handleSelection}
            id={props.id}
            onKeyDown={e => {e.preventDefault(); keyboardEvents(e)}}
            tabIndex={-1}   //allow focus
        >
            {props.children}
        </span>
    );
}


export default Select;