import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo} from './lib/todoService';

class App extends Component {

  state = {
    todos: [],
    currentTodo: ''
  };

  static contextTypes = {
    route: React.PropTypes.string
  };

  handleInputChange = (event) => {
    this.setState({currentTodo: event.target.value});
  }

  handleRemove = (id, event) => {
    event.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({todos: updatedTodos});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const id = generateId();
    const newTodo = {id, name: this.state.currentTodo, isComplete: false};
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });
    createTodo(newTodo)
      .then(() => console.log("TODO created"))
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    });
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
      .catch()
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>React Todos</h2>
        </div>
        <div className="todo-app">
          {this.state.errorMessage && <span className="error-msg">{this.state.errorMessage}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler} />
          <TodoList handleToggle={this.handleToggle}
                    todos={displayTodos}
                    handleRemove={this.handleRemove} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
