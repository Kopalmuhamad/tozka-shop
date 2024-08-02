import React from 'react'
import styles from './Button.module.scss'

interface Props {
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    variant?: 'primary' | 'secondary'
}

const Button = (props: Props) => {

    const { children, type, onClick, variant = 'primary' } = props

    return (
        <button type={type} onClick={onClick} className={styles[variant]}>{children}</button>
    )
}

export default Button