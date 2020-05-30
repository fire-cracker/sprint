import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { login } from '../apiCalls'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  switchBase: {
    '&$checked': {
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
      },
    },
  },
  track: {},
  checked: {},
}))

const LoginPage = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    isAdmin: false,
    email: '',
    password: '',
  })

  const toggleRole = () => {
    setState((prevState) => ({
      ...prevState,
      isAdmin: !prevState.isAdmin,
    }))
  }

  const onhandleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onHandleSubmit = () => {
    const { email, password, isAdmin } = state
    login(email, password, isAdmin)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => onhandleChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(e) => onhandleChange(e)}
          />
          <FormControlLabel
            control={
              <Switch
                classes={{
                  switchBase: classes.switchBase,
                  track: classes.track,
                  checked: classes.checked,
                }}
                checked={state.isAdmin}
                onChange={toggleRole}
              />
            }
            label='Admin'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={onHandleSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default LoginPage
