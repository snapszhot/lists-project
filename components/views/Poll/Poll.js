import { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import cn from 'classnames'

import { CircleLoader, ErrorMessage, InputLabel } from '@components/common'
import List from './List'
import styles from './Poll.module.scss'

export default function Poll({ prefills }) {
    const router = useRouter()
    const [list, setList] = useState([])
    const [numError, setNumError] = useState(null)
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
        reset,
    } = useForm()

    const onSubmit = async values => {
        if (list.length < 10 || list.length > 25) {
            setNumError(
                'You must vote for at least 10 and no more than 25 films.'
            )
        } else {
            console.log(list) // eslint-disable-line no-console
            setNumError(null)
            await axios.post('/api/supabase', {
                poll_id: '1965',
                username: values.username,
                votes: list,
            })
            reset()
            router.push('/success')
        }
    }

    return (
        <div className={styles.container}>
            <main>
                <h1 className={styles.title}>1965 Poll</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <InputLabel htmlFor='username' title='Username' />
                        <input
                            className={cn(styles.input, {
                                [styles.error]:
                                    errors.username?.type === 'required',
                            })}
                            id='username'
                            placeholder='Enter your criterionforum.org username'
                            {...register('username', { required: true })}
                        />
                        {errors.username?.type === 'required' && (
                            <ErrorMessage message='Username is required' />
                        )}
                    </div>
                    <List
                        list={list}
                        prefills={prefills}
                        setList={setList}
                        setNumError={setNumError}
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
            </main>
        </div>
    )
}

Poll.propTypes = {
    prefills: PropTypes.array,
}
