const listHelper = require('../utils/list_helper')

describe('author by liked blogs', () => {
    const emptyList = []

    const listWithOneAuthorWithMostLikes =  [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Robert C. Martin',
        url: 'https://reactpatterns.com/',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
        __v: 0
      }]
  
      const listWithManyAuthorWithMostLikes =  [
        {
          _id: '5a422a851b54a676234d17f7',
          title: 'React patterns',
          author: 'Robert C. Martin',
          url: 'https://reactpatterns.com/',
          likes: 7,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422b3a1b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
        },
        {
          _id: '5a422b891b54a676234d17fa',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 10,
          __v: 0
        }]
  
        const mostLikes = listHelper.mostLikes
  
        test('when list has one defineted author with most likes', () => {
          const result = mostLikes(listWithOneAuthorWithMostLikes)
          expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
          })
        })
  
        test('when list has many authors with the most likes', () => {
          const result = mostLikes(listWithManyAuthorWithMostLikes)
          expect(result).toEqual({
            author: 'Robert C. Martin',
            likes: 17
          })
        })
  
        test('when list is empty', () => {
          const result = mostLikes(emptyList)
          expect(result).toEqual(null)
        })
  })