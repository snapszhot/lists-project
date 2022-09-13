import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
// import axios from 'axios'

import { InputLabel } from '@components/common'
import List from './List'
import styles from './Poll.module.scss'

export default function Poll({ prefills }) {
    const [list, setList] = useState([])
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors },
    } = useForm()

    const onSubmit = async values => {
        if (list.length < 10 || list.length > 25) {
            const numError =
                'You must vote for at least 10 and no more than 25 films.'
            console.log(numError) // eslint-disable-line no-console
        } else {
            console.log(values) // eslint-disable-line no-console
            console.log(list) // eslint-disable-line no-console
        }
    }

    return (
        <div className={styles.container}>
            <main>
                <h1 className={styles.title}>1965 Poll</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <List list={list} setList={setList} prefills={prefills} />
                    <div>
                        <InputLabel htmlFor='username' title='Username' />
                        <input
                            className={styles.input}
                            id='username'
                            placeholder='Enter your criterionforum.org username'
                            {...register('username')}
                        />
                    </div>
                    <div className={styles.actions}>
                        <input
                            className={styles.submit}
                            type='submit'
                            value='Submit'
                        />
                    </div>
                </form>
            </main>
        </div>
    )
}

Poll.propTypes = {
    prefills: PropTypes.array,
}
