const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const dummy = listHelper.dummy
    const result = dummy(blogs)
    expect(result).toBe(1)
  })