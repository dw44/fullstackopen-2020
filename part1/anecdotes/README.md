This application covers exercises 1.12 - 1.14 of Part-1 of the 'Fullstack Open' (https://fullstackopen.com/en).

At this point, exercises 1.12, 1.13, and 1.14 have been completed. Certain exercises required overwriting code written for previous exercises.

A do-while loop has been used to ensure that pressing the newQuote button doesn't display the quote already being displayed. The function containing the loop stores the index of the quote being displayed currently, and keeps looking for a new index value until one that isn't the same as the current value is found:

```javascript
  do {
      index = Math.floor(Math.random() * anecdotes.length);
  } while (index === selected);
```

A 'votesCast' state variable is used to track how many votes are cast for the currently displayed quote since it was last displayed i.e. the current display cycle. You can only vote for a quote once per display cycle i.e. when the votesCast value is set to 0. Once a quote is voted on, votesCast is set to 1 (a non zero value) and voting for that quote is not possible until it is rendered again as votesCast is set to 0 when a quote is displayed.

The final state of this project is as it should be at the conclusion of exercise 1.14.
