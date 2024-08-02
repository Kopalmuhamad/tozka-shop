import React, { FormEvent, useState } from 'react'
import styles from "./Register.module.scss"
import Link from 'next/link'
import { useRouter } from 'next/router'

const RegisterView = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const push = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setError('')
        const form = event.target as HTMLFormElement
        const data = {
            email: form.email.value,
            fullname: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value
        }
        const result = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (result.status === 200) {
            form.reset()
            setLoading(false)
            push.push('/auth/login')
        } else {
            setLoading(false)
            setError('Email is already registered')
        }
    }
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form action="" onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname">Fullname</label>
                        <input type="text" name='fullname' className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name='phone' className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' className={styles.register__form__item__input} />
                    </div>
                    <button type="submit" className={styles.register__form__button}>{loading ? 'Loading...' : 'Register'}</button>
                </form>
            </div>
            <p className={styles.register__link}>Have an account?<Link href={'/auth/login'}>Sign in here</Link></p>
        </div>
    )
}

export default RegisterView