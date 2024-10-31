## 1. Auto Delete Todo List

```
    [
        {
            type: 'Fruit',
            name: 'Apple',
        },
        {
            type: 'Vegetable',
            name: 'Broccoli',
        },
        {
            type: 'Vegetable',
            name: 'Mushroom',
        },
        {
            type: 'Fruit',
            name: 'Banana',
        },
        {
            type: 'Vegetable',
            name: 'Tomato',
        },
        {
            type: 'Fruit',
            name: 'Orange',
        },
        {
            type: 'Fruit',
            name: 'Mango',
        },
        {
            type: 'Fruit',
            name: 'Pineapple',
        },
        {
            type: 'Vegetable',
            name: 'Cucumber',
        },
        {
            type: 'Fruit',
            name: 'Watermelon',
        },
        {
            type: 'Vegetable',
            name: 'Carrot',
        },
    ]
```

Please make a todo list that
- Have a list of clickable buttons.
- Each button will be moved into its own column separated by type.
- Once moved, each button will have 5 seconds on the screen and then will be moved back to the bottom of the main list.
- If click on the right column (Fruit/Vegetable) the item must go back to the bottom of the left column (list) immediately.

> [!CAUTION]
> Please host the test on a hosting service and send us the link.

See example in the link below
[Video Link](https://drive.google.com/file/d/170AYx0lOXs4DLyZiPGGIgmQpFhwTKNih/view?usp=sharing)

Please do your best to show your best solution
we are looking for
1. Answer the need of question
2. Clean code easy to read

Bonus: if you have multiple solutions we could discuss those theories in our interview (no need to submit multiple versions, just send us the best one you think.)

### Normal Solution

The usual approach would be to have a separate state for each column type and update the state whenever a user selects a new item. This would add the item to the correct type column and remove it from the main list. A 5-second timeout would then be set for the item to automatically move it back to the main list. If the item is deselected before the timeout, it should be moved back immediately by updating the state and clearing the assigned timeout.

### Better Solution

The previous solution can work well, but developers would need to add a new state and column each time the data introduces a new type. Now, with this new solution, the column state is dynamically generated based on the types present in the initial dataset, so when a new type appears, no changes are required in the frontend.

However, with all column types sharing the same state, there’s a new consideration: the component will re-render every time any column’s state changes. In the previous solution, each column type had its own state, so they rendered independently. Now, re-rendering occurs even when the change isn’t related to a particular column, and unnecessary re-renders are generally best avoided. To address this, the `memo` is useful, as it memoizes rendered output to prevent re-renders when the props passed to the child component remain unchanged—perfect for this scenario.

I wouldn’t say this is the best solution since the requirements don’t explicitly mention this, and overengineering isn’t ideal. But as a self-practice exercise, I enjoy finding new approaches to tackle problems.

One potential issue is the lack of a unique id field. Currently, the item's name is used as an ID, which isn’t ideal.
