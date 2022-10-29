import { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import cn from 'classnames'

import {
    CircleLoader,
    Container,
    ErrorMessage,
    InputLabel,
} from '@components/common'
import List from './List'
import styles from './Poll.module.scss'

export default function Poll({
    ballot,
    end_year,
    start_year,
    title,
    uid,
    voting_ends,
}) {
    const router = useRouter()
    const [list, setList] = useState(ballot?.votes || [])
    const [numError, setNumError] = useState(null)
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
        reset,
    } = useForm()
    const MAX_FILMS = process.env.NEXT_PUBLIC_MAX_FILMS
    const MIN_FILMS = process.env.NEXT_PUBLIC_MIN_FILMS
    const pageTitle = ballot ? `${title} – Update Ballot` : `${title} – Vote`

    const onSubmit = async values => {
        if (list.length < MIN_FILMS || list.length > MAX_FILMS) {
            setNumError(
                `You must vote for at least ${MIN_FILMS} and no more than ${MAX_FILMS} films.`
            )
        } else {
            setNumError(null)
            await axios.post('/api/vote', {
                ballot_id: ballot?.id,
                ballot_items: list,
                poll_id: uid,
                username: values.username,
            })
            reset()
            router.push(`/vote/${uid}/success`)
        }
    }

    return (
        <Container title={pageTitle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputLabel htmlFor='username' title='Username' />
                    <input
                        className={cn(styles.input, {
                            [styles.error]:
                                errors.username?.type === 'required',
                        })}
                        defaultValue={ballot?.username}
                        id='username'
                        placeholder='Enter your criterionforum.org username'
                        {...register('username', { required: true })}
                    />
                    {errors.username?.type === 'required' && (
                        <ErrorMessage message='Username is required' />
                    )}
                </div>
                <List
                    endYear={end_year || start_year}
                    list={list}
                    setList={setList}
                    setNumError={setNumError}
                    startYear={start_year}
                    votingEnds={voting_ends}
                />
                <div className={styles.actions}>
                    <button
                        className={styles.submit}
                        disabled={isSubmitting}
                        type='submit'
                    >
                        {isSubmitting ? <CircleLoader /> : 'Submit'}
                    </button>
                </div>
                {numError && <ErrorMessage message={numError} />}
            </form>
        </Container>
    )
}

Poll.propTypes = {
    ballot: PropTypes.object,
    end_year: PropTypes.number,
    start_year: PropTypes.number,
    title: PropTypes.string,
    voting_ends: PropTypes.string,
    uid: PropTypes.string,
}
