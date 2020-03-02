import React from 'react';
import useForm from '../hooks/useForm';
import uuid from 'uuid/v4';

function TodoAdd({ insertTodo }) {
    
    const createTodo = ({ title }) => {
        return {
            id: uuid(),
            completed: false,
            title
        }
    }
    
    const addTodo = () => insertTodo(createTodo( values ));

    const validations = (values) => {
        let errors = {}

        if(!values.title)
            errors.title = 'Try adding some text';
        else if(values.title.length >= 70 )
            errors.title = 'Whoops!, that\'s a long task';

        return errors;
    }
    
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm( addTodo, validations );

    return (
        <form className="todo-add" onSubmit={ handleSubmit }>
            <label htmlFor="todo" className={`${ errors.title ? 'invalid' : ''}`}>
                <input
                    type="text"
                    name="title"
                    value={ values.title || '' }
                    onChange={ handleChange }
                    placeholder='Start typing your task ...'
                    autoComplete="off"
                    className={`${ errors.title ? 'shake animated' : ''}`}
                    />  
                <p className="error-msg">{ errors.title }</p>
            </label>
            <button>Add</button>
        </form>
    );
}

export default TodoAdd;