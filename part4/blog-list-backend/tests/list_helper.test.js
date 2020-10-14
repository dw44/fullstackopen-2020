const {
  dummy,
  totalLikes,
  favoriteBlog,
} = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

// dummy blog lists for upcoming test suites
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
    likes: 4,
    __v: 0,
  },
  {
    _id: '5a422aa61b21a784234d17f8',
    title: 'Creating React/Node apps that connect to PostgreSQL and HarperDB',
    author: 'Andrew Baisden',
    url: 'https://dev.to/andrewbaisden/creating-react-node-apps-that-connect-to-postgresql-and-harperdb-41h3',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a456aa71b54a676114d17f8',
    title: '“What is your current salary?” is a red flag that you don’t want to work here',
    author: 'Jean-Michel Fayard',
    url: 'https://dev.to/jmfayard/what-is-your-current-salary-is-a-red-flag-that-you-don-t-want-to-work-here-3aji',
    likes: 4,
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
    title: 'Accessibility beyond \'alt\' tag, \'color contrast\', and semantic tags',
    author: 'Neha Sharma',
    url: 'https://dev.to/hellonehha/accessibility-beyond-alt-tag-color-contrast-and-semantic-tags-1g1e',
    likes: 7,
    __v: 0,
  },
];

// added for exercise 4.4
describe('correctly returns total likes', () => {
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

// added for exercise 4.5
describe('correctly returns blog with most likes', () => {
  test('returns empty object for list with no blogs', () => {
    expect(favoriteBlog([])).toEqual({});
  });

  test('returns data for list[0] for list with one blog', () => {
    expect(favoriteBlog(listWithOneBlog))
      .toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      });
  });

  test('returns blog with most likes from list with multiple blogs', () => {
    expect(favoriteBlog(listWithFiveBlogs))
      .toEqual({
        title: 'Creating React/Node apps that connect to PostgreSQL and HarperDB',
        author: 'Andrew Baisden',
        likes: 10,
      });
  });
});
