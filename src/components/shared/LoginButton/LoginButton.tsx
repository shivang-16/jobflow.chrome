import React from 'react'
import styles from './loginbutton.module.scss'

const LoginButton = () => {
  console.log('here in login button')
  return (
    <a href='http://localhost:3000/login' target='_blank'>
        <button className={styles.jobflow_login_button}>Login</button>
    </a>
  )
}

export default LoginButton