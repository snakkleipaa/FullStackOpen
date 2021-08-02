import { useQuery } from '@apollo/client'
import React from 'react'
import { USER, ALL_BOOKS } from '../queries'

const Recommended = (props) => {

    const genre = props.user.data.me !== null ? props.user.data.me.favoriteGenre : ''
    const variables = genre !== '' ? { genre } : ''
    const books = useQuery(ALL_BOOKS, { variables })

    if (!props.show) {
        return null
    }

    if (props.user === null) {
        return null
    }

    if (props.user.loading || books.loading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>

            <h2> recommendations</h2>

            <div> books in your favorite genre <b>{genre}</b></div>

            <table>
                <tbody>
                    <tr>
                    <th></th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                    </tr>
                    {books.data.allBooks.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default Recommended