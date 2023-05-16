const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) =>  {
    if (blogs.length === 0) {
      return null
    }
  
    return blogs.reduce((maxLikesBlog, blog) => {
      if (blog.likes > maxLikesBlog.likes) {
        return {
          title: blog.title,
          author: blog.author,
          likes: blog.likes
        }
      } else {
        return maxLikesBlog;
      }
    }, { title: "", author: "", likes: -1 })
  }

const mostBlogs = (blogs) =>  {
  const blogsByAuthor = _.groupBy(blogs, 'author');

  const authorWithMostBlogs = _.maxBy(_.keys(blogsByAuthor), author => blogsByAuthor[author].length);

  return blogs.length === 0 
  ? null 
  : {
    author: authorWithMostBlogs,
    blogs: blogsByAuthor[authorWithMostBlogs].length
  }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');

  const likesByAuthor = _.mapValues(blogsByAuthor, blogs => _.sumBy(blogs, 'likes'));

  const authorWithMostLikes = _.maxBy(_.keys(likesByAuthor), author => likesByAuthor[author]);

  return blogs.length === 0
  ? null
  : {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes]
  };
}

module.exports =  {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}