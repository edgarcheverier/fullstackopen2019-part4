const listHelper = require('../utils/list_helper');

describe('totalLikes', () => {
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

  test('returns the right sum of all the likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(15);
  });

  test('for an empty array returns 0', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});
