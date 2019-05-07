import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";

//set id for unique keys for <li> and delete button
let id = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  //ask user to input the todo
  addTodo() {
    const text = prompt("TODO text please");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }

  //delete the todo
  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  //toggle between done and not done (via checkbox)
  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }

  render() {
    //display when the link is /
    const All = () => <TodoList todos={this.state.todos} />;

    //display when the link is /new
    const New = () => (
      <TodoList todos={this.state.todos.filter(todo => !todo.checked)} />
    );

    //display when the link is /done
    const Done = () => (
      <TodoList todos={this.state.todos.filter(todo => todo.checked)} />
    );

    //each todo is a <li> with key, checkbox, text, and delete button
    const Todo = props => (
      <li key={props.todo.id}>
        <input
          type="checkbox"
          checked={props.todo.checked}
          onChange={props.onToggle}
        />
        <span
          style={{
            textDecoration: props.todo.checked ? "line-through" : "none"
          }}
        >
          {props.todo.text}
        </span>
        <button onClick={props.onDelete}>Delete</button>
      </li>
    );

    //list of todos
    const TodoList = props => {
      let Todos = props.todos.map(todo => (
        <Todo
          todo={todo}
          onToggle={() => this.toggleTodo(todo.id)}
          onDelete={() => this.removeTodo(todo.id)}
        />
      ));
      return <ul style={{ listStyleType: "none" }}>{Todos}</ul>;
    };

    return (
      <Router>
        <button onClick={() => this.addTodo()}>Add TODO</button>
        <Route path="/" exact component={All} />
        <Route path="/new" component={New} />
        <Route path="/done" component={Done} />
        <button>
          <Link to="/">All</Link>
        </button>
        <button>
          <Link to="/new">New</Link>
        </button>
        <button>
          <Link to="/done">Done</Link>
        </button>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
