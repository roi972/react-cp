import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addTask, updateTask } from '../redux/actions';
import moment from 'moment';

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

    handleSubmit = (values, action) => {
        console.log('handle add');
        this.props.addTask(values, action)
        this.props.history.push('/');
    }

    handleUpdate = (values, action) => {
        console.log('handle update', this.props.history);
        try {
            this.props.updateTask(this.props.history.location.state, values, action);
            this.props.history.push('/');
        }
        catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {

    }

    render() {
        const { title, description, group } = this.props.task ? this.props.task : {};
        const when = this.props.task ? moment(this.props.task.when).format("YYYY-MM-DDTHH:mm:ss") : null;

        const initialValues = { title, description, group, when };
        console.log(initialValues);
        const submitMethod = this.props.task ? this.handleUpdate : this.handleSubmit;
        return (
            <div className="container">
                <Formik
                    initialValues={initialValues}
                    onSubmit={submitMethod}
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
            </div>
        )
    }
}

export default connect(function (state) {
    return {
        tasks: state.tasks,
        task: state.task
    }
}, function (dispatch) {
    return {
        addTask: (values, action) => dispatch(addTask(values, action)),
        updateTask: (id, values, action) => dispatch(updateTask(id, values, action))
    }
})(TodoForm);