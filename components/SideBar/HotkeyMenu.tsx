import { ArrowFatUp, ArrowFatDown, ArrowFatLeft, ArrowFatRight } from "phosphor-react";

const HotKeyMenu = () => {
    const logoSize = 20;

    return (
        <div className="border-t separator-border-color flex flex-col py-2 gap-y-2 items-center">
            <h1>Hotkeys</h1>
            <div className="flex gap-x-1">
                <span>[shift] + </span>
                <ArrowFatUp size={logoSize} />
                <span>|</span> 
                <ArrowFatDown size={logoSize} />
                <span>|</span> 
                <ArrowFatLeft size={logoSize} />
                <span>|</span> 
                <ArrowFatRight size={logoSize} />
            </div>
        </div>
    );
}

export default HotKeyMenu;