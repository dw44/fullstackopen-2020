/* eslint-disable max-len */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import Blog from './Blog';

// File created for 5.13
let component;

// set dummy blog component up for tests
beforeEach(() => {
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

  component = render(<Blog blog={testBlog} />);
});

// tests for 5.13
test('Renders blog with only title and author displayed initially', () => {
  const details = component.container.querySelector('.blogDetails');

  // check that the blog title is being rendered
  expect(component.container).toHaveTextContent('Testing React Components');

  // check that the div with blog details exists, and is set to display: none at first
  expect(details).toBeDefined();
  expect(details).toHaveStyle('display: none');
});

// tests for 5.14
test('likes and url are displayed after show button is clicked', () => {
  const button = component.container.querySelector('.toggleDisplayBtn');
  const detailDiv = component.container.querySelector('.blogDetails');

  // detailDiv should have display: block style after "show" button is clicked
  fireEvent.click(button);
  expect(detailDiv).toHaveStyle('display: block');
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
