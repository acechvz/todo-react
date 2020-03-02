import React, { useState, useEffect } from 'react';
import { withLoading } from './hoc';
import axios from 'axios';

import TodoList from './Todos/TodoList';
import TodoAdd from './Todos/TodoAdd';
import './App.css';

const TodosWithLoading = withLoading(TodoList);

function App() {
  const [todos, setTodos] = useState([]);
  const [fetchDone, setFetchDone] = useState(false);

  // CRUD
  const addTodo = ($todos, todo) => [...$todos, todo];
  const deleteTodo = todo => item => item.id !== todo.id;
  const doneTodo = todo => item => {
    if (todo.id === item.id) todo.completed = !todo.completed;
    return item;
  }

  // Actions
  const handleTodoAdd = todo => setTodos( addTodo(todos, todo) );
  const handleTodoDelete = todo => setTodos( todos.filter(deleteTodo(todo)) );
  const handleTodoCompleted = todo => setTodos( todos.map(doneTodo(todo)) );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3');
      const todos = await response.data;
      
      setTodos(todos);

      setTimeout( () => {
        setFetchDone(true);
      }, 2000);
    }

    fetchData();
  }, [])

  return (
    <div className="App">
      <div className="todo-app">
        <h3>todo.it</h3>
        <hr/>
        <TodosWithLoading
          isLoading={ !fetchDone }
          loadingText='Bringing the inspiration'
          todos={ todos }
          onDelete={ handleTodoDelete }
          onDone={ handleTodoCompleted }
        /> 
      </div>
      <TodoAdd insertTodo={ handleTodoAdd } />
    </div>
  );
}

export default App;
