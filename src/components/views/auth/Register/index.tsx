import React, { FormEvent, useState } from 'react'
import styles from "./Register.module.scss"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Input from '@/components/ui/Input'

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
        const result = await fetch('/api/user/register', {
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
                    <Input id="fullname" htmlFor='fullname' label="Full Name" name="fullname" type="text" placeholder="Enter your full name" />
                    <Input id="phone" htmlFor='phone' label="Phone Number" name="phone" type="text" placeholder="Enter your phone number" />
                    <Input id="email" htmlFor='email' label="Email" name="email" type="text" placeholder="Enter your email" />
                    <Input id="password" htmlFor='password' label="Password" name="password" type="password" placeholder="Enter your password" />
                    <button type="submit" className={styles.register__form__button}>{loading ? 'Loading...' : 'Register'}</button>
                </form>
            </div >
            <p className={styles.register__link}>Have an account?<Link href={'/auth/login'}>Sign in here</Link></p>
        </div >
    )
}

export default RegisterView