import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import debouce from 'lodash.debounce'

import { CircleLoader, ErrorMessage, InputLabel } from '@components/common'
import ListItems from './ListItems'
import Prefills from './Prefills'
import styles from './List.module.scss'

export default function List({
    endYear,
    list,
    setList,
    setNumError,
    startYear,
}) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState(null)
    const [query, setQuery] = useState('')
    const [showPrefill, setShowPrefill] = useState(false)

    const MAX_FILMS = process.env.NEXT_PUBLIC_MAX_FILMS
    const MIN_FILMS = process.env.NEXT_PUBLIC_MIN_FILMS
    const hitLimit = list.length >= MAX_FILMS

    const searchAPI = async query => {
        try {
            const { data } = await axios({
                url: '/api/search',
                method: 'GET',
                params: { endYear, query, startYear },
            })

            setOptions(data)
            setError(null)
            setLoading(false)
        } catch (error) {
            setError(
                'We’re having some trouble searching. Please try again later.'
            )
            setLoading(false)
        }
    }

    const handleChange = async event => {
        event.preventDefault()
        const { value } = event.target
        const hasValue = value !== ''

        setQuery(value)
        setLoading(true)
        setShowPrefill(hasValue)

        if (hasValue) {
            debouncedSearch(value)
        } else {
            setLoading(false)
        }
    }

    const debouncedSearch = useMemo(() => {
        return debouce(searchAPI, 200)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handlePrefillSelect = item => {
        const newList = [...list, item]
        setShowPrefill(false)
        setQuery('')

        if (newList.length >= MIN_FILMS && newList.length <= MAX_FILMS) {
            setNumError(null)
        }

        if (list.some(it => it.id === item.id)) {
            setError('You cannot vote for the same film multiple times.')
        } else if (newList.length <= MAX_FILMS) {
            setList(newList)
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
                <div>
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
                    {loading && (
                        <div className={styles.loader}>
                            <CircleLoader />
                        </div>
                    )}
                </div>
                {error && <ErrorMessage message={error} />}
                <Prefills
                    handlePrefillSelect={handlePrefillSelect}
                    options={options}
                    showPrefill={showPrefill}
                />
            </div>
            <ListItems list={list} setList={setList} />
        </div>
    )
}

List.propTypes = {
    endYear: PropTypes.number,
    list: PropTypes.array,
    setList: PropTypes.func,
    setNumError: PropTypes.func,
    startYear: PropTypes.number,
}
