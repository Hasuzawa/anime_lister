//fire a callback event when shift key is held and another key is pressed.
const useWhileShift = (event: React.KeyboardEvent, ) => {
    if (event.shiftKey) {
        switch (event.key) {
            case "ArrowRight": ; break;
            case "ArrowLeft": ; break;
        }
    }
};


export { useWhileShift};