import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIME } from "~/pages/_app";


const Entry = () => {
    const { loading, error, data } = useQuery(GET_ANIME, {variables: {id: 5678}});
    if (!loading){
        console.log(data);
    }
    return (
        <div className="flex-none w-72 h-96 bg-yellow-300">
            <h1>name of anime</h1>
            <p>this is some text explaination of the anime</p>
        </div>
    )
}

export default Entry;

// gql`query ($id: Int) {
//     Media (id: $id, type: ANIME) {
//       id
//       title {
//         romaji
//         english
//         native
//       }
//     }
//   }`;