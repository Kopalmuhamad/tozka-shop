import React, { FormEvent, useState } from 'react'
import styles from "./Login.module.scss"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import Input from '@/components/ui/Input'
import Button from '@/components/Button'

const LoginView = () => {
    const { data } = useSession()
    console.log(data)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { push, query } = useRouter()

    const callbackUrl: any = query.callbackUrl || '/'

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setError('')
        const form = event.target as HTMLFormElement
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: form.email.value,
                password: form.password.value,
                callbackUrl
            })

            if (!res?.error) {
                setLoading(false)
                form.reset()
                push(callbackUrl)
            } else {
                setLoading(false)
                setError('Email Password is incorrect')
            }
        } catch (error) {
            console.error(error)
            setError('Email Password is incorrect')
        }
    }
    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form action="" onSubmit={handleSubmit}>
                    <Input id="email" label="Email" name="email" type="email" htmlFor="email" placeholder='Email' />
                    <Input id="password" label="Password" name="password" type="password" htmlFor="password" placeholder='Password' />
                    <Button type="submit">{loading ? 'Loading...' : 'Login'}</Button>
                </form>
                <Button variant='secondary' type="button" onClick={() => signIn('google', { callbackUrl, redirect: false })}>{loading ? 'Loading...' : 'Login With Google'}</Button>
            </div>
            <p className={styles.login__link}>Don{"'"}t Have an account?<Link href={'/auth/register'}>Sign Up here</Link></p>
        </div>
    )
}

export default LoginView