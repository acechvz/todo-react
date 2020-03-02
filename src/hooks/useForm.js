import { useState, useEffect } from 'react';
import { obj_count } from '../functional';

function useForm(callback, validate) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!obj_count(errors) && isSubmitting) {
            callback();
            setIsSubmitting(false);
            setValues({});
        }
    }, [errors]);


    const combineValues = (event, oldValues) => {
        const value = event.target.value;
        const input = event.target.name;

        return {
            ...oldValues,
            [input]: value
        }
    }

    const handleChange = event => {
        event.persist();

        setValues(values => combineValues(event, values));
    }

    const handleSubmit = event => {
        if (event) event.preventDefault();

        setErrors(validate(values));
        setIsSubmitting(true);
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
}

export default useForm;