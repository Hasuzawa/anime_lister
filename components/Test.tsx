import { useQuery, gql } from "@apollo/client";

const GET_ANIME = gql`
query ($id: Int, $seasonYear: Int = 2021){                   #id is a query argument
  Page {
      media (id: $id, type: ANIME, seasonYear: $seasonYear, sort: SCORE_DESC) {    #find all media with id = $id and type = ANIME
        id
        title {
        romaji
        english
        native
        }
        coverImage {
        large
        extraLarge
        medium
        color
        }
    }
  }
}
`;
// note that if you don't sort, then it will be in ascending id order

const Test = () => {
    const { loading, error, data } = useQuery(GET_ANIME);
    if (loading){return <h1>loading ...</h1>}
    if (error){return <h1>error !</h1>}
    console.log("test data is ", data);
    return (
        <div>
            <h1>{data.Media.title.english}</h1>
            <img src={data.Media.coverImage.large} />
        </div>
    );
}

export default Test;