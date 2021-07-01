const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const likes = blogs.map(i => i.likes)
    const reducer = (sum, item) => {
        return sum + item
    }
    return likes.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {

    if (blogs.length < 1)  {
        return 'no blogs'
    }

    return blogs.reduce((max, item) => max.likes > item.likes ? max : item)
}

const mostLikes = (blogs) => {

    if (blogs.length < 1)  {
        return 'no blogs'
    }

    const names = []
    blogs.map(i => names.unshift(i.author))

    uniqueNames = [...new Set(names)]

    let most = uniqueNames[0]
    let mostLikes = 0
    let likes = 0
    for (let i = 0; i < uniqueNames.length; i++) {
        for (let j = 0; j < blogs.length; j++) {
            if(uniqueNames[i] === blogs[j].author) likes = likes + blogs[j].likes
        }
        if (likes > mostLikes) {
            mostLikes = likes
            likes = 0
            most = uniqueNames[i]
        }
    }

    return {author: most,
            votes: mostLikes}
}

const mostBlogs = (blogs) => {

    if (blogs.length < 1)  {
        return 'no blogs'
    }

    const names = []
    blogs.map(i => names.unshift(i.author))

    uniqueNames = [...new Set(names)]

    let most = uniqueNames[0]
    let mostBlogs = 0
    let asd = 0
    for (let i = 0; i < uniqueNames.length; i++) {
        for (let j = 0; j < names.length; j++) {
            if(uniqueNames[i] === names[j]) asd = asd + 1
        }
        if (asd > mostBlogs) {
            mostBlogs = asd
            asd = 0
            most = uniqueNames[i]
        }
    }

    return {author: most,
            blogs: mostBlogs}
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}