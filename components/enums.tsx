
/**
 * @description
 * criteria for sorting search results, defaults to POPULARITY_DESC
 */
enum MediaSort {
    SCORE_DESC,         //average score
    SCORE,              //no order defaults to ascending
    POPULARITY,
    POPULARITY_DESC,
    TITLE_ENGLISH,          //a b c...
    TITLE_ENGLISH_DESC,
    START_DATE,
    START_DATE_DESC,
}

/**
 * @description
 * filter by media status, defaults to NONE
 */
enum MediaStatus {
    NONE = "Any",
    FINISHED = "Finished",
    RELEASING = "Airing",
    NOT_YET_RELEASED = "Not yet Released",
    CANCELLED = "Cancelled",
    HIATUS = "On Hiatus",
}

var mediaStatusReverseMap = new Map<string, MediaStatus>();
Object.keys(MediaStatus).forEach((status: any) => {
    // const value = MediaStatus[];
    // mediaStatusReverseMap.set(MediaStatus[status], status);
    //mediaStatusReverseMap[MediaStatus[status]] = status;
})

/**
 * @description
 * filter by media format, defaults to NONE
 */
enum MediaFormat {
    NONE = "Any",
    TV = "TV",
    TV_SHORT = "Short TV",
    MOVIE = "Movie",
    SPECIAL = "Special",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "Music",
    MANGA = "Manga",
    NOVEL = "Novel",
    ONE_SHOT = "One Shot"
}


/**
 * @description
 * the season the anime was aired.
 */
enum Season{
    SPRING,
    SUMMER,
    FALL,
    WINTER
}


enum SortField {        //note: the string value are for sort menu, not for GraphQL
    TITLE = "Title",        //i.e. abcd ...
    AVERAGE_SCORE = "Average Score",
    POPULARITY = "Popularity",
    YEAR = "Year",
};


enum SortOrder {
    ASCENDING = "ascending",
    DESCENDING = "descending"
};


export { MediaSort, MediaStatus, MediaFormat, Season, SortField, SortOrder };