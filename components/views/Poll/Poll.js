import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { InputLabel } from '@components/common'
import List from './List'
import styles from './Poll.module.scss'

export default function Poll({ prefills }) {
    const [list, setList] = useState([])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async values => {
        console.log(values)
        console.log(list)
    }

    return (
        <div className={styles.container}>
            <h1>1965 Poll</h1>
            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <InputLabel htmlFor='username' title='Username' />
                        <input
                            className={styles.input}
                            id='username'
                            {...register('username')}
                        />
                    </div>
                    <List list={list} setList={setList} prefills={prefills} />
                    <div>
                        <input type='submit' value='Submit' />
                    </div>
                </form>
            </main>
        </div>
    )
}

Poll.propTypes = {
    prefills: PropTypes.array,
}
