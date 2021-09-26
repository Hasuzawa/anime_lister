
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
    ANY = "Any",
    FINISHED = "Finished",
    RELEASING = "Airing",
    NOT_YET_RELEASED = "Not yet Released",
    CANCELLED = "Cancelled",
    HIATUS = "On Hiatus",
}

/**
 * @description
 * filter by media format, defaults to NONE
 */
enum MediaFormat {
    ANY = "Any",
    TV = "TV",
    TV_SHORT = "Short TV",
    MOVIE = "Movie",
    SPECIAL = "Special",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "Music",
    //MANGA = "Manga",      the site focus on anime
    //NOVEL = "Novel",
    //ONE_SHOT = "One Shot"
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

// e should be typeof E
function enumKeyFromValue<E extends object, V>(e: E, value: V): any {
    const key: any = Object.keys(e)[Object.values(e).indexOf(value)];
    return key;
}

export { MediaSort, MediaStatus, MediaFormat, Season, SortField, SortOrder };
export { enumKeyFromValue };