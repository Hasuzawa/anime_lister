
/**
 * @description
 * criteria for sorting search results, defaults to POPULARITY_DESC
 */
enum SortCriterion {
    POPULARITY = "Popularity lower first",
    POPULARITY_DESC = "Popularity higher first",    //default
    SCORE = "Score lower first",
    SCORE_DESC = "Score higher first",
    //TITLE_ENGLISH = "Alphabet A to Z",          //a b c...        // bugged now
    //TITLE_ENGLISH_DESC = "Alphabet Z to A",
    START_DATE = "Premiere earliest",
    START_DATE_DESC = "Premiere latest",
    EPISODES = "Episode Count fewer",
    EPISODES_DESC = "Episode Count more",
}

/**
 * @description
 * filter by media status, defaults to ANY
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
 * filter by media format, defaults to ANY
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