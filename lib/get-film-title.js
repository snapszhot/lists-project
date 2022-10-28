export default function getFilmTitle({
    alt_eng_title,
    alt_lang_title,
    eng_trans_title,
    orig_lang_title,
    phonetic_alt,
    phonetic_orig,
    year,
}) {
    let title = orig_lang_title

    if (phonetic_orig) {
        title += ` [${phonetic_orig}]`
    }
    if (alt_lang_title) {
        title += ` [${alt_lang_title}]`
    }
    if (phonetic_alt) {
        title += ` [${phonetic_alt}]`
    }
    if (eng_trans_title) {
        title += ` [${eng_trans_title}]`
    }
    if (alt_eng_title) {
        title += ` [${alt_eng_title}]`
    }

    if (year.includes('-') || year.includes('/')) {
        title += ` (${year})`
    }

    return title
}
