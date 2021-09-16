import { useQuery, gql } from "@apollo/client";

const GET_ANIME = gql`
query ($id: Int){                   #id is a query argument
  Media (id: $id, type: ANIME) {    #find all media with id = $id and type = ANIME
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
`;


const Test = () => {
    const { loading, error, data } = useQuery(GET_ANIME);
    if (loading){return <h1>loading ...</h1>}
    if (error){return <h1>error !</h1>}
    return (
        <div>
            <h1>{data.Media.title.english}</h1>
            <img src={data.Media.coverImage.large} />
        </div>
    );
}

export default Test;