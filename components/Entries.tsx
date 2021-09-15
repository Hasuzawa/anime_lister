import Entry from "~/components/Entry";
import { motion } from "framer-motion";

const Entries = () => {
    let entries: JSX.Element[] = [];
    for (let i = 0; i < 11; i++){
        entries.push(<Entry key={i}/>);
    }
    return (
        <div className="flex flex-wrap m-4 justify-evenly gap-y-4">
            {entries}
        </div>
    );
}

export default Entries;