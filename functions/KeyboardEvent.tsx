import { KeyboardEvent } from "react";

// a function that returns a function
function onKeyDown(key: string) {
    function f(event: KeyboardEvent, fn: Function) {
        if (event.key === key) {
            fn()
        }
    }
    return f;
}

const onEnter = onKeyDown("Enter");
const onEsc = onKeyDown("Escape");

const onLeft = onKeyDown("");
const onRight = onKeyDown("");
const onUp = onKeyDown("");
const onDown = onKeyDown("");


export { onEnter, onEsc };
export { onLeft, onRight, onUp, onDown};