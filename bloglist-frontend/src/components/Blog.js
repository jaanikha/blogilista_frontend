import React from 'react'

const Blog = ({ blog, handleLikeBlog }) => (
  <div>
    <p>
      {blog.title} {blog.author} <br></br>
      {'likes:' + blog.likes} <br></br>
      {blog.url} <br></br>
      <button onClick={handleLikeBlog}>like</button>{' '}
    </p>
  </div>
)

export default Blog
