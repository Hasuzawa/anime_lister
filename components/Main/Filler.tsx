import { defaultFieldResolver } from "graphql";
import styles from "~/styles/moduleCss/card.module.css";


const Filler = () => {
    return (
        <div className={"bg-gray-500 shadow-2xl " + styles.card} />
    );
}

export default Filler;