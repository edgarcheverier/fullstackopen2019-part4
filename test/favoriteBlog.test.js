const listHelper = require('../utils/list_helper');

describe('favoriteBlog', () => {
  const blogs = [
    {
      title: 'Test blog 01',
      author: 'Edgar Cheverier',
      url: 'https://www.google.com/',
      likes: 8,
      id: '5de3dc521d47d2a24d7d26ed',
    },
    {
      title: 'Test blog 02',
      author: 'Gina Forrest',
      url: 'https://www.google.com/',
      likes: 5,
      id: '5de3dd6eac7430aa2ffa770e',
    },
    {
      title: 'Test blog 03',
      author: 'Olli Weiss',
      url: 'https://www.google.com/',
      likes: 2,
      id: '5de3dddfd1b62aae6667d50d',
    },
  ];

  test('returns the blog with more likes', () => {
    const expectedResult = {
      title: 'Test blog 01',
      author: 'Edgar Cheverier',
      likes: 8,
    };
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(expectedResult);
  });

  test('returns formatted object if given only one element.', () => {
    const oneBlog = [
      {
        title: 'Test blog 01',
        author: 'Edgar Cheverier',
        url: 'https://www.google.com/',
        likes: 3,
        id: '5de3dc521d47d2a24d7d26ed',
      },
    ];

    const expectedResult = {
      title: 'Test blog 01',
      author: 'Edgar Cheverier',
      likes: 3,
    };

    const result = listHelper.favoriteBlog(oneBlog);
    expect(result).toEqual(expectedResult);
  });

  test('returns an empty object if given an empty array', () => {
    const result = listHelper.favoriteBlog({});
    expect(result).toEqual({});
  });
});
