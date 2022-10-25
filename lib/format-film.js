export default function formatFilm(film) {
    return {
        originalTitle: film.orig_lang_title,
        originalTitlePhonetic: film.phonetic_orig,
        altLangTitle: film.alt_lang_title,
        altLangTitlePhonetic: film.phonetic_alt,
        engTransTitle: film.eng_trans_title,
        altEngTitle: film.alt_eng_title,
        director: film.director,
        releaseYear: film.year,
        id: film.id,
    }
}
