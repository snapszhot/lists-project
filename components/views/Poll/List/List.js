import { useState } from 'react'
import PropTypes from 'prop-types'

import { ErrorMessage, InputLabel } from '@components/common'
import ListItems from './ListItems'
import Prefills from './Prefills'
import styles from './List.module.scss'

export default function List({ list, prefills, setList }) {
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
    const hitLimit = list.length >= 25

    const handleChange = event => {
        event.preventDefault()
        setQuery(event.target.value)
    }

    const handlePrefillSelect = item => {
        setQuery('')

        if (
            list.some(
                it =>
                    it.movie === item.movie &&
                    it.director === item.director &&
                    it.releaseYear === item.releaseYear
            )
        ) {
            setError('You cannot vote for the same film multiple times.')
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
                    disabled={hitLimit}
                    name='search'
                    onChange={handleChange}
                    placeholder={
                        hitLimit
                            ? 'You have selected the maximum number of films.'
                            : 'Search for a movie or director...'
                    }
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
            <ListItems list={list} setList={setList} />
        </div>
    )
}

List.propTypes = {
    list: PropTypes.array,
    prefills: PropTypes.array,
    setList: PropTypes.func,
}
