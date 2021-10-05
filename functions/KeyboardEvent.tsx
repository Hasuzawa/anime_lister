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

const onLeft = onKeyDown("ArrowLeft");
const onRight = onKeyDown("ArrowRight");
const onUp = onKeyDown("ArrowUp");
const onDown = onKeyDown("ArrowDown");


export { onEnter, onEsc };
export { onLeft, onRight, onUp, onDown};