import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addTask } from '../redux/actions';

const itemValiadation = yup.object().shape({
    title: yup.string().max(100).required(),
    description: yup.string().required(),
    group: yup.string().max(20).required(),
    when: yup.date().default(function () {
        return new Date();
    })
}
)


class TodoForm extends React.Component {

    render() {
        return (
            <Formik
                initialValues={{ title: '', description: '', group: '', when: '' }}
                onSubmit={this.props.addTask}
                validationSchema={itemValiadation}
            >
                {
                    ({ isSubmitting }) => (
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
}

export default connect(function (state) {
    return {
        tasks: state.tasks
    }
}, function (dispatch) {
    return {
        addTask: (values, action) => dispatch(addTask(values, action))
    }
})(TodoForm);