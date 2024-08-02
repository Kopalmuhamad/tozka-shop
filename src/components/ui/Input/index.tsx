import React from 'react'
import styles from './Input.module.scss'

interface Props {
    id: string
    label: string
    name: string
    type: string
    htmlFor: string
    placeholder?: string
}

const Input = (props: Props) => {
    const { id, label, name, type, placeholder } = props
    return (
        <>
            <div className={styles.container}>
                <label htmlFor={name}>{label}</label>
                <input type={type} name={name} id={id} placeholder={placeholder} className={styles.container__input} />
            </div>
        </>
    )
}

export default Input