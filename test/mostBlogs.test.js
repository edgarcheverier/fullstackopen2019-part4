const listHelper = require('../utils/list_helper');

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
  {
    title: 'Test blog 04',
    author: 'Edgar Cheverier',
    url: 'https://www.google.com/',
    likes: 4,
    id: '5de3dc521d47d2a24d7d26ed',
  },
  {
    title: 'Test blog 05',
    author: 'Edgar Cheverier',
    url: 'https://www.google.com/',
    likes: 5,
    id: '5de3dc521d47d2a24d7d26ed',
  },
  {
    title: 'Test blog 06',
    author: 'Olli Weiss',
    url: 'https://www.google.com/',
    likes: 2,
    id: '5de3dddfd1b62aae6667d50d',
  },
  {
    title: 'Test blog 07',
    author: 'Olli Weiss',
    url: 'https://www.google.com/',
    likes: 2,
    id: '5de3dddfd1b62aae6667d50d',
  },
  {
    title: 'Test blog 08',
    author: 'Olli Weiss',
    url: 'https://www.google.com/',
    likes: 2,
    id: '5de3dddfd1b62aae6667d50d',
  },
  {
    title: 'Test blog 09',
    author: 'Olli Weiss',
    url: 'https://www.google.com/',
    likes: 2,
    id: '5de3dddfd1b62aae6667d50d',
  },
  {
    title: 'Test blog 10',
    author: 'Olli Weiss',
    url: 'https://www.google.com/',
    likes: 2,
    id: '5de3dddfd1b62aae6667d50d',
  },
];

describe('mostBlogs', () => {
  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Olli Weiss', blogs: 6 });
  });
});
