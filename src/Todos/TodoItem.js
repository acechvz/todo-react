import React from 'react';

function TodoItem({ todo, onDelete, onDone }) {
 return (
    <div className={`todo-item ${todo.completed ? 'done' : '' }` }>
        <span
            onClick={ () => onDone(todo) }>
            { todo.title }
        </span>
        <button
            onClick={ () => onDelete(todo) }>
                <i className="fas fa-times"></i>
        </button>
    </div>
 )
}

export default TodoItem;