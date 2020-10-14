const { dummy, totalLikes } = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe('correctly returns total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithFiveBlogs = [
    {
      _id: '5a476ra71b54a854964d17f8',
      title: 'The Code Review Guide',
      author: 'Camila Lenis',
      url: 'https://dev.to/camilaleniss/the-code-review-guide-4gfo',
      likes: 3,
      __v: 0,
    },
    {
      _id: '5a422aa61b21a784234d17f8',
      title: 'Creating React/Node apps that connect to PostgreSQL and HarperDB',
      author: 'Andrew Baisden',
      url: 'https://dev.to/andrewbaisden/creating-react-node-apps-that-connect-to-postgresql-and-harperdb-41h3',
      likes: 6,
      __v: 0,
    },
    {
      _id: '5a456aa71b54a676114d17f8',
      title: '“What is your current salary?” is a red flag that you don’t want to work here',
      author: 'Jean-Michel Fayard',
      url: 'https://dev.to/jmfayard/what-is-your-current-salary-is-a-red-flag-that-you-don-t-want-to-work-here-3aji',
      likes: 9,
      __v: 0,
    },
    {
      _id: '5a422aa71c13a676234d17f8',
      title: 'How I lost 1 year of life doing failed crypto startup',
      author: 'Przemysław Thomann',
      url: 'https://dev.to/_pthomann/how-i-lost-1-year-of-life-doing-failed-crypto-startup-5hlp',
      likes: 2,
      __v: 0,
    },
    {
      _id: '5a422aa71b98a136234d17f8',
      title: 'https://dev.to/hellonehha/accessibility-beyond-alt-tag-color-contrast-and-semantic-tags-1g1e',
      author: 'Neha Sharma',
      url: 'https://dev.to/hellonehha/accessibility-beyond-alt-tag-color-contrast-and-semantic-tags-1g1e',
      likes: 7,
      __v: 0,
    },
  ];

  test('returns 0 when list has no blogs', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test('returns list[0].likes for list with one blog', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('returns sum of "likes" values for list with five blogs', () => {
    const result = totalLikes(listWithFiveBlogs);
    expect(result).toBe(27);
  });
});
