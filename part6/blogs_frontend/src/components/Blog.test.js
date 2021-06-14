//Test if Blog renders title and author but not url or likes by default

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes', () => {
    const blog = {
        title: 'Blog title',
        author: 'Blog author',
        url: 'donotincludethis.com',
        likes: 66
    }

    const component = render(
        <Blog blog={blog} />
    )

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'Blog title'
    )
    expect(div).toHaveTextContent(
        'Blog author'
    )
    expect(div).not.toHaveTextContent(
        'donotincludethis.com'
    )
    expect(div).not.toHaveTextContent(66)
})

test('url and likes are shown when "view" button is pressed', () => {
    const blog = {
        title: 'Blog title',
        author: 'Blog author',
        url: 'donotincludethis.com',
        likes: 66
    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.additionalBlogInfo')

    expect(div).toBeDefined()

    expect(div).toHaveTextContent(
        'donotincludethis.com'
    )
    expect(div).toHaveTextContent(66)
})

test('two clicks on "like" button create two calls', () => {
    const blog = {
        title: 'Blog title',
        author: 'Blog author',
        url: 'donotincludethis.com',
        likes: 66
    }

    const handleLike = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={handleLike} />
    )
    const view = component.getByText('view')
    fireEvent.click(view)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(handleLike.mock.calls).toHaveLength(2)
})

