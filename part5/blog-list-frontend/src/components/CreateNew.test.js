import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import CreateNew from './CreateNew';

// 5.16

test('new blog form calls event handler with correct details', () => {
  const mockSubmitHandler = jest.fn();

  const newBlogForm = render(
    <CreateNew
      handleSubmit={mockSubmitHandler}
    />,
  );

  const title = newBlogForm.container.querySelector('#title-inp');
  const author = newBlogForm.container.querySelector('#author-inp');
  const url = newBlogForm.container.querySelector('#url-inp');
  const form = newBlogForm.container.querySelector('.new-blog-form');

  fireEvent.change(title, {
    target: { value: 'testing forms' },
  });

  fireEvent.change(author, {
    target: { value: 'testman mctester' },
  });

  fireEvent.change(url, {
    target: { value: 'www.testmanblog.com/testing' },
  });

  // tests to check that the correct data is being submitted
  fireEvent.submit(form);
  expect(mockSubmitHandler.mock.calls).toHaveLength(1);
  expect(mockSubmitHandler.mock.calls[0][0].title).toBe('testing forms');
  expect(mockSubmitHandler.mock.calls[0][0].author).toBe('testman mctester');
  expect(mockSubmitHandler.mock.calls[0][0].url).toBe('www.testmanblog.com/testing');
});
