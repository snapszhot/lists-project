import { useState } from 'react'
import PropTypes from 'prop-types'

import { ErrorMessage, InputLabel } from '@components/common'
import ListItems from './ListItems'
import Prefills from './Prefills'
import styles from './List.module.scss'

export default function List({ list, prefills, setList }) {
    const [showPrefill, setShowPrefill] = useState(false)
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)

    const handleChange = event => {
        event.preventDefault()
        setQuery(event.target.value)
    }

    const handlePrefillSelect = item => {
        console.log(item)
        setQuery('')

        if (
            list.some(
                it =>
                    it.movie === item.movie &&
                    it.director === item.director &&
                    it.releaseYear === item.releaseYear
            )
        ) {
            setError('You cannot add the same film multiple times.')
        } else {
            setList([...list, item])
            setError(null)
        }
    }

    return (
        <div className={styles.container}>
            <InputLabel htmlFor='search' title='Create a list' />
            <p className={styles.caption}>
                Select at least ten and no more than twenty-five films. You can
                drag and drop them in the order of your choosing.
            </p>
            <div className={styles.prefillContainer}>
                <input
                    className={styles.input}
                    name='search'
                    onChange={handleChange}
                    placeholder='Search for a movie or director...'
                    type='text'
                    value={query}
                />
                {error && <ErrorMessage message={error} />}
                <Prefills
                    handlePrefillSelect={handlePrefillSelect}
                    options={prefills}
                    value={query}
                />
            </div>
            <ListItems list={list} />
        </div>
    )
}

List.propTypes = {
    list: PropTypes.array,
    prefills: PropTypes.array,
    setList: PropTypes.func,
}
