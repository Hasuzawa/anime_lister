
/**
 * @description
 * criteria for sorting search results, defaults to POPULARITY_DESC
 */
enum SortCriterion {
    POPULARITY = "Popularity",
    POPULARITY_DESC = "Popularity Desc.",    //default
    SCORE = "Score",
    SCORE_DESC = "Score Desc.",
    TITLE_ENGLISH = "Alphabet",          //a b c...
    TITLE_ENGLISH_DESC = "Alphabet Desc.",
    START_DATE = "Premiere",
    START_DATE_DESC = "Premiere Desc.",
    EPISODES = "Episode Count",
    EPISODES_DESC = "Episode Count Desc.",
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

// e should be typeof E
function enumKeyFromValue<E extends object, V>(e: E, value: V): any {
    const key: any = Object.keys(e)[Object.values(e).indexOf(value)];
    return key;
}

export { MediaStatus, MediaFormat, Season, SortCriterion };
export { enumKeyFromValue };