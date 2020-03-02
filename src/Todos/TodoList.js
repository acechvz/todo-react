import React from 'react';
import TodoItem from './TodoItem'
import { obj_count } from '../functional';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function TodoList({ todos, onDelete, onDone }) {
    const showTodo = todo => (
        <CSSTransition
              key={todo.id}
              timeout={500}
              classNames="move"
              appear={true}>
            <TodoItem
                todo={todo}
                key={todo.id}
                onDelete={ onDelete }
                onDone={ onDone } />
        </CSSTransition>
    )

    return (
        <div className="todo-content">
            {
                obj_count(todos) ?
                <TransitionGroup>
                    { todos.map(showTodo) }
                </TransitionGroup> :
                <p className="greetings"><i class="fas fa-glass-cheers fa-2x"></i> Take a breath for a new start ...</p>
            }
        </div>
    )
}

export default TodoList;