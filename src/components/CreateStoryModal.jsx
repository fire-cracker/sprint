import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@material-ui/core'

import { createStory } from '../apiCalls'

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
    width: '100%',
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

const CreateStoryModal = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    summary: '',
    description: '',
    type: '',
    complexity: '',
    estimatedTime: '',
    cost: '',
  })

  const onhandleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onHandleSubmit = async (event) => {
    const { handleClose } = props
    event.preventDefault()
    await createStory({ ...state })
    handleClose()
  }

  const { open, handleClose } = props

  return (
    <div className={classes.paper}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create a Story</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='summary'
              label='Summary'
              name='summary'
              autoComplete='summary'
              autoFocus
              onChange={onhandleChange}
            />
            <TextField
              multiline
              rowsMax={5}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='description'
              label='Description'
              id='description'
              autoComplete='description'
              onChange={onhandleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              select
              label='Type'
              id='type'
              name='type'
              onChange={onhandleChange}
              SelectProps={{
                native: true,
              }}
              className={classes.form}
            >
              <option aria-label='None' value='' />
              <option value='enhancement'>enhancement</option>
              <option value='bugfix'>bugfix</option>
              <option value='development'>development</option>
              <option value='QA'>QA</option>
            </TextField>
            <TextField
              variant='outlined'
              margin='normal'
              required
              select
              label='Complexity'
              id='complexity'
              name='complexity'
              onChange={onhandleChange}
              SelectProps={{
                native: true,
              }}
              className={classes.form}
            >
              <option aria-label='None' value='' />
              <option value='mid'>Mid</option>
              <option value='low'>Low</option>
              <option value='high'>High</option>
            </TextField>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='estimatedTime'
              label='Estimated time for completion'
              type='number'
              id='estimatedTime'
              autoComplete='estimatedTime'
              onChange={onhandleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='cost'
              label='Cost associated to it'
              type='number'
              id='cost'
              autoComplete='cost'
              onChange={onhandleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={onHandleSubmit} color='primary'>
            Create Story
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateStoryModal
