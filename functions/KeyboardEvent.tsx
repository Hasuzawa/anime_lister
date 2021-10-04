import { KeyboardEvent } from "react";

function onEnterDown(event: KeyboardEvent, fn: Function) {
    if (event.key === "Enter") {
        fn();
    }
}

export { onEnterDown };