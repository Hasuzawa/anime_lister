import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { motion, AnimateSharedLayout, AnimatePresence, Variants, Variant, Transition } from "framer-motion";
import { onEnter, onDown } from "functions/KeyboardEvent";


// interface with one generic variable
interface SelectProps<T> {
    selected: T,
    setSelected: (t: T) => void,
    options: T[],
    width: number,
    id: string,
}

function Select<T> (props: SelectProps<T>): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const toggleOpen = () => setOpen(!isOpen);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {   //note that this will run every click as long as
                setOpen(false);                                         //this component is mounted
            }
        }

        document.addEventListener("mousedown", handleClickOutside); //site-wide click event

        return () => {      // clean up
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    const optionMenuId: string = props.id + "-options";
    const optionsRef = useRef<HTMLDivElement>(null);

    // const focusFirstChild = () => {
    //     const element = optionsRef.current;
    //     console.log(element);
    //     if (!element) { return }
        
    //     const children = element.children
    //     if (children.length > 0) {
    //         const child = element.firstChild as HTMLElement
    //         child.focus();
    //     }
    // }

    return (
        <div className={"relative text-black"} style={{width: props.width}} ref={ref}>
            <div
                className="bg-white w-full h-6 border border-gray-300 rounded-full px-2 flex justify-center items-center cursor-pointer overflow-hidden"
                onClick={toggleOpen}
                tabIndex={0}
                onKeyDown={e => {onEnter(e, toggleOpen); optionsRef.current?.focus()}}
                id={props.id}
                
            >
                {props.selected}
                {/* triangle symbol here */}
            </div>
            { isOpen && 
            <div
                className="absolute w-full flex flex-col mt-0.5 z-10 max-h-72 overflow-y-auto shadow-2xl"
                id={optionMenuId}
                ref={optionsRef}
                tabIndex={-1}   //this is needed for div to be focusable
                //onKeyDown={e => onDown(e, focusFirstChild)}
            >
                {props.options.map((element, idx) => <Option key={idx} setSelected={props.setSelected} setOpen={setOpen} >{element}</Option>)}
            </div>
            }
        </div>
    );
}


interface OptionProps<T> {
    children: T;
    setSelected: (t: T) => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Option = <T,>(props: OptionProps<T>): JSX.Element => {

    const handleSelection = () => {
        props.setSelected(props.children);
        props.setOpen(false);
    }

    return (
        <span
            className="flex-none bg-white w-full h-8 flex justify-center items-center hover:bg-gray-300 cursor-pointer"
            onClick={handleSelection}
            onKeyDown={e => onEnter(e, handleSelection)}
        >
            {props.children}
        </span>
    );
}


export default Select;