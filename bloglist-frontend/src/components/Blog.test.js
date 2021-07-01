import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Masa',
    likes: 12,
    url: 'asdasd'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library Masa likes:12 asdasd'
  )
})

test('clicking the like-button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Masa',
    likes: 12,
    url: 'asdasd'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeBlog={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})