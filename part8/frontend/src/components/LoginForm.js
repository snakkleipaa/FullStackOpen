import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation  } from '@apollo/client'
import { LOGIN, USER } from '../queries'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    }) 

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('books-user-token', token)
        } 
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    if (!props.show) {
        return null
      }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username 
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm