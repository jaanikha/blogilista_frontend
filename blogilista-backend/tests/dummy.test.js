const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 3,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const oneBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]

const noBlogs = []

describe ('most blogs', () => {

  test('out of many blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(
      {
        author: "Robert C. Martin",
        blogs: 3
    })
  })

  test('out of one', () => {
    const result = listHelper.mostBlogs(oneBlog)
    expect(result).toEqual(
      {
        author: "Michael Chan",
        blogs: 1
    })
  })

  test('out of no blogs', () => {
    const result = listHelper.mostBlogs(noBlogs)
    expect(result).toBe('no blogs')
  })
})

describe ('most votes', () => {

  test('out of many blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(
      {
        author: "Edsger W. Dijkstra",
        votes: 24
    })
  })

  test('out of one', () => {
    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual(
      {
        author: "Michael Chan",
        votes: 7
    })
  })

  test('out of no blogs', () => {
    const result = listHelper.mostLikes(noBlogs)
    expect(result).toBe('no blogs')
  })
})

describe ('favourite blog', () => {

    test('out of multiple blogs and a tie in likes', () => {
      const result = listHelper.favouriteBlog(blogs)
      expect(result).toEqual(  
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        })
    })

    test('out of one blog', () => {
      const result = listHelper.favouriteBlog(oneBlog)
      expect(result).toEqual(  
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        })
    })

    test('out of an empty array', () => {
      const result = listHelper.favouriteBlog(noBlogs)
      expect(result).toBe('no blogs')
    })
})

describe('total likes', () => {
    test('of multiple blogs', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('of empty blog array equals to 0', () => {
        const result = listHelper.totalLikes(noBlogs)
        expect(result).toBe(0)
    })

    test('of one single blog', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(7)
    })
})

test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
