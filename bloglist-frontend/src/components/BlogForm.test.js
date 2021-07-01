import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('on submit, handleAddBlog is called for with right parameters', () => {
  const handleAddBlog = jest.fn()

  const component = render(
    <BlogForm handleSubmit={handleAddBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing forms' }
  })
  fireEvent.change(author, {
    target: { value: 'testimasa' }
  })
  fireEvent.change(url, {
    target: { value: 'qwerty' }
  })
  fireEvent.submit(form)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe('testing forms')
  expect(handleAddBlog.mock.calls[0][0].author).toBe('testimasa')
  expect(handleAddBlog.mock.calls[0][0].url).toBe('qwerty')
})