import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';

// File created for 5.13

// Test for 5.13 - checks that Blog details aren't displayd when blog is first rendered
test('Renders blog with only title and author displayed initially', () => {
  //
  const testBlog = {
    author: 'Test Writer',
    id: '5f8c3e0912882925ac22136d',
    likes: 2,
    title: 'Testing React Components',
    url: 'https://www.testingreactcomponents.com',
    user: {
      username: 'tester',
      name: 'tester',
      id: '5f8c3aed6ecda51447288160',
    },
  };

  const component = render(<Blog blog={testBlog} />);
  const details = component.container.querySelector('.blogDetails');

  expect(details).toBeDefined();
  expect(details).toHaveStyle('display: none');
});

/*
blog format:
{
  author,
  id,
  likes,
  title,
  url,
  user: { username, name, id }
}
*/
