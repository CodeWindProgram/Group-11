import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Login = ({ handleChange }) => {
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const initialValues = {
    username: '',
    password: '',
    remember: false
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().email('please enter valid email').required('Required'),
    password: Yup.string().required('Required')
  })
  const onSubmit = (values, props) => {
    console.log(values)
    setTimeout(() => {
      props.resetForm()
      props.setSubmitting(false)
    }, 2000);
    console.log(props)
  }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar><AccountCircleOutlinedIcon /></Avatar>
          <h2>Log in</h2>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(props) => (
            <Form>

              <Field as={TextField} label='Username' name="username"
                placeholder='Enter your user name' type='text'
                fullWidth
                helperText={<ErrorMessage name="username" />} />
              <Field as={TextField} label='Password' name="password" placeholder='Enter your password' type='password' fullWidth
                helperText={<ErrorMessage name="password" />} />
              <Field as={FormControlLabel}
                name="remember"
                control={
                  <Checkbox

                    color="primary"
                  />
                }
                label='Remember Me'
              />
              <Button type='submit' color='primary' variant='contained' disabled={props.isSubmitting}
                fullWidth>{props.isSubmitting ? "Loading" : "Log in"}</Button>

            </Form>
          )
          }
        </Formik>
        <Typography>
          <Link href="#" onClick={() => handleChange("event", 0)} >
            Forgot Password?
          </Link>
        </Typography>
        <Typography>Create an account?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link >
        </Typography>

      </Paper>
    </Grid>
  )
}

export default Login;