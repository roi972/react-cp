import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const itemValiadation = yup.object().shape({
    title: yup.string().max(100).required(),
    description: yup.string().required(),
    group: yup.string().max(20).required(),
    when: yup.date().default(function () {
        return new Date();
    })
}
)


export default function AddItem(props) {

    const handleSubmit = async (values, actions) => {
        console.log(values);

        const response = await fetch('https://nztodo.herokuapp.com/api/task/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        console.log(response);

        actions.setSubmitting(false);        

    }

    return (
        <Formik
            initialValues={{ title: '', description: '', group: '', when: '' }}
            onSubmit={handleSubmit}            
            validationSchema={itemValiadation}
        >
            {
                ({ isSubmitting  }) => (
                    <Form>
                        <label htmlFor='title'>Title:</label>
                        <Field name='title' />
                        <ErrorMessage component='div' name='title' />

                        <label htmlFor='description'>Description:</label>
                        <Field name='description' />
                        <ErrorMessage component='div' name='description' />

                        <label htmlFor='group'>Group:</label>
                        <Field name='group' />
                        <ErrorMessage component='div' name='group' />

                        <label htmlFor='when'>Date:</label>
                        <Field name='when' type='datetime-local' />
                        <ErrorMessage component='div' name='when' />

                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )
            }
        </Formik>
    )

}