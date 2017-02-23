import React from 'react';
import {TodoItem} from './TodoItem.js';

export const TodoList = (props) => (
  <div className="todo-list">
      <ul>
          {props.todos.map(todo => <TodoItem handleToggle={props.handleToggle} key={todo.id} {...todo} handleRemove={props.handleRemove} />)}
      </ul>
  </div>
);

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired
}
