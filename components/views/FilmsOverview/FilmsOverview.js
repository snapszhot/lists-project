import { useState } from 'react'
import PropTypes from 'prop-types'
import { Container, FilmList } from '@components/common'
import styles from './FilmsOverview.module.scss'

export default function FilmsOverview({ films, title, ...props }) {
    const [sortedFilms, setSortedFilms] = useState(films)

    const stripArticles = string =>
        string
            .replace('A ', '')
            .replace('An ', '')
            .replace('El ', '')
            .replace('Il ', '')
            .replace("L'", '')
            .replace('La ', '')
            .replace('Le ', '')
            .replace('Les ', '')
            .replace('The ', '')

    const compareTitles = (a, b) => {
        const aTitle = stripArticles(a)
        const bTitle = stripArticles(b)

        return aTitle.localeCompare(bTitle)
    }

    const sortByDirector = (a, b) => a.director.localeCompare(b.director)
    const sortByEngTitle = (a, b) => {
        const aTitle =
            a?.engTransTitle || a?.originalTitlePhonetic || a?.originalTitle
        const bTitle =
            b?.engTransTitle || b?.originalTitlePhonetic || b?.originalTitle

        return compareTitles(aTitle, bTitle)
    }
    const sortByOrigTitle = (a, b) => {
        const aTitle = a?.originalTitlePhonetic || a?.originalTitle
        const bTitle = b?.originalTitlePhonetic || b?.originalTitle

        return compareTitles(aTitle, bTitle)
    }

    const sortFilms = e => {
        const sortMethod = e.target.value

        let sortFunc = sortByDirector
        if (sortMethod === 'Original Language Title') {
            sortFunc = sortByOrigTitle
        }
        if (sortMethod === 'English Title') {
            sortFunc = sortByEngTitle
        }

        const resortedFilms = [...sortedFilms]
        resortedFilms.sort(sortFunc)

        setSortedFilms(resortedFilms)
    }

    return (
        <Container title={`${title} – Eligible Films`}>
            <p>
                Below is a list of films you can vote for from this year. If you
                want to be able to vote for something that isn’t listed here,
                you need to ask me to add it to the list. The only reason I
                won’t do so is if I deem that it belongs in another year. I have
                my own curious system for assigning films to years, but rest
                assured that I will never let a film miss its chance to qualify
                in one year or another. I am the ultimate arbiter of year
                assignments.
            </p>
            <h2 className={styles.subtitle}>Eligible films</h2>
            <p className={styles.subtitleCaption}>
                Sort by
                <select className={styles.sortField} onChange={sortFilms}>
                    <option>Director</option>
                    <option>Original Language Title</option>
                    <option>English Title</option>
                </select>
            </p>
            <FilmList films={sortedFilms} {...props} />
        </Container>
    )
}

FilmsOverview.propTypes = {
    films: PropTypes.array,
    title: PropTypes.string,
}
