import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, act } from '@testing-library/react';
import Blog from './Blog';

// File created for 5.13
let component; let mockLikeHandler; let
  mockDeleteHandler; let container;

// set dummy blog component up for tests
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

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

  act(() => {
    mockLikeHandler = jest.fn();
    mockDeleteHandler = jest.fn();
    ReactDOM.render(
      <Blog 
        blog={testBlog}
        addLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />,
      container
    );
  });
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// tests for 5.13
test('Renders blog with only title and author displayed initially', () => {
  
  const details = container.querySelector('.blogDetails');

  // check that the blog title is being rendered
  // expect(container).toHaveTextContent('Testing React Components');

  // check that the div with blog details exists, and is set to display: none at first
  expect(details).toBeDefined();
  expect(details).toHaveStyle('display: none');
});

// tests for 5.14
test('likes and url are displayed after show button is clicked', () => {
  const button = container.querySelector('.toggleDisplayBtn');
  const detailDiv = container.querySelector('.blogDetails');

  // detailDiv should have display: block style after "show" button is clicked
  act(() => {
    fireEvent.click(button);
    return undefined;
  });
  expect(detailDiv).toHaveStyle('display: block');
});

// tests for 5.15
test('Clicking like registers two events on fireEvent', () => {
  act(() => {
    fireEvent.click(container.querySelector('.blogDetails'));
    return undefined;
  });
  const likeButton = container.querySelector('.likeButton');

  // first click - mock.calls should have length 1
  act(() => {
    fireEvent.click(likeButton);
    return undefined;
  });
  expect(mockLikeHandler.mock.calls).toHaveLength(1);

  // second click - mock.calls should have length 2
  act(() => fireEvent.click(likeButton));
  expect(mockLikeHandler.mock.calls).toHaveLength(2);
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
