import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormHelperText } from '@material-ui/core';
import * as Yup from 'yup'

const Signup = ({ handleChange }) => {
    const paperStyle = { padding: 20, height: '80vh', width: 280, margin: "20px auto" }

    const initialValues = {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        phoneNumber: Yup.number().typeError("Enter Valid Phone Number").required("Required"),
        password: Yup.string().min(8, "Password minimum lenght should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        termsAndConditions: Yup.string().oneOf(["true"], "Accept Terms And Condition").required("Required")
    })
    const onSubmit = (values, props) => {
        console.log(values)
        console.log(props)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
    }

    return (
        <Grid>
            <Paper style={paperStyle}>

                <Grid align='center'>
                    <Avatar><AccountBoxOutlinedIcon /></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>

                            <Field as={TextField} fullWidth name="name" label='Name'
                                placeholder='Enter your name' type='text' helperText={<ErrorMessage name="name" />} />
                            <Field as={TextField} fullWidth name="email" label='Email Id'
                                placeholder='Enter your email address' type='email' helperText={<ErrorMessage name="email" />} />

                            <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number'
                                placeholder='Enter your phone number' type='number' helperText={<ErrorMessage name="phoneNumber" />} />
                            <Field as={TextField} fullWidth name="password" label='Create Password'
                                placeholder='Create a password' type='password' helperText={<ErrorMessage name="password" />} />
                            <Field as={TextField} fullWidth name="confirmPassword" label='Confirm Password'
                                placeholder='Confirm password' type='password' helperText={<ErrorMessage name="confirmPassword" />} />

                            <FormControlLabel
                                control={<Field as={Checkbox} name="termsAndConditions" />}
                                label="I accept the terms & conditions"
                            />
                            <FormHelperText><ErrorMessage name="termsAndConditions"/></FormHelperText> 
                            <Button type='submit' color='primary' variant='contained' disabled={props.isSubmitting}
                                fullWidth>{props.isSubmitting ? "Loading" : "Sign Up"}</Button>

                        </Form>
                    )}

                </Formik>
                <Typography>Already have an account?
                    <Link href="#" onClick={() => handleChange("event", 0)}>
                        Log in
                    </Link>
                </Typography>

            </Paper>
        </Grid>
    )
}
export default Signup;