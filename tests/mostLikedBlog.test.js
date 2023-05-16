const listHelper = require('../utils/list_helper')

describe('most liked blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    const emptyList = []
  
    const listWithManyBlogs =
      [
        {
          _id: "5f41e266a1a6fb00d714c031",
          title: "Understanding JavaScript's Function.prototype.bind",
          author: "Dmitry Soshnikov",
          url: "https://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition-understanding-javascript-function-prototype-bind/",
          likes: 100,
          _v: 0
        },
        {
          _id: "87efcd2b0dc7b8d463f4d4f7",
          title: "JavaScript’s “this” keyword explained in a simple way",
          author: "Baptiste Pesquet",
          url: "https://medium.com/@bpesquet/javascripts-this-keyword-explained-in-a-simple-way-fd8d00ef8b15",
          likes: 200,
          _v: 0
        }]
        const favoriteBlog = listHelper.favoriteBlog
  
        test('when list has many blogs', () => {
          const result = favoriteBlog(listWithManyBlogs)
          expect(result).toEqual({
            title: "JavaScript’s “this” keyword explained in a simple way",
            author: "Baptiste Pesquet",
            likes: 200
          })
        })
  
        test('when list has only one blog, equals the likes of that', () => {
          const result = favoriteBlog(listWithOneBlog)
          expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
          })
        })
  
        test('when list is empty', () => {
          const result = favoriteBlog(emptyList)
          expect(result).toEqual(null)
        })
  
  })