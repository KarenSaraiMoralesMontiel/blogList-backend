const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const totalLikes = listHelper.totalLikes
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
        },
        {
          _id: "c5055de75787f6435b23d8f1",
          title: "Understanding the Event Loop, Callbacks, Promises, and Async/Await in JavaScript",
          author: "Rahul Mhatre",
          url: "https://blog.bitsrc.io/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript-1f9ebbeb8d45",
          likes: 150,
          _v: 0
        },
        {
          _id: "e971bf534d69f17a8f77b44e",
          title: "Asynchronous Programming in JavaScript with Async/Await",
          author: "Kingsley Silas",
          url: "https://blog.logrocket.com/asynchronous-programming-in-javascript-with-async-await/",
          likes: 300,
          _v: 0
        },
        {
          _id: "b4693bc0a53e6b2f62b43d1e",
          title: "A Beginner's Guide to JavaScript's Prototype",
          author: "Jacob Gube",
          url: "https://www.sitepoint.com/beginners-guide-to-javascript-prototype/",
          likes: 250,
          _v: 0
        },
        {
          _id: "d2e0eb29f8c71d867b0ac9d2",
          title: "The Ultimate Guide to JavaScript's ES6 features",
          author: "Arfat Salman",
          url: "https://blog.bitsrc.io/the-ultimate-guide-to-javascripts-es6-features-352328c3d333",
          likes: 50,
          _v: 0
        },
        {
          _id: "fbc8bfaea46537d27c4f7b32",
          title: "10 JavaScript concepts every Node.js developer must master",
          author: "Sandeep Panda",
          url: "https://dev.to/sandeep/how-to-be-a-better-node-js-developer-in-2019-4c33",
          likes: 200,
          _v: 0
        },
        {
          _id: "31898bc30a8345c5c2bdf572",
          title: "JavaScript Design Patterns in 2018",
          author: "Laurie Barth",
          url: "https://dev.to/laurieontech/javascript-design-patterns-in-2018-3c2h",
          likes: 150,
          _v: 0
        }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  
    test('when list is empty', () => {
      const result = totalLikes(emptyList)
      expect(result).toBe(0)
    })
  
    test('when list has many blogs', () => {
      const result = totalLikes(listWithManyBlogs)
      expect(result).toBe(1400)
    })
  })