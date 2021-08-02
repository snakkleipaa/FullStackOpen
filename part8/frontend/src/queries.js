import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name   
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query AllBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            author {name}
            published
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            id
            title
            published
            author {name}
            genres
        }
    }
`

export const UPDATE_BORN = gql`
    mutation updateBorn($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            id
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author {name}
            published 
            genres
        }
    }
`