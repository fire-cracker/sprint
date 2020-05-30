import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3)
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  },
  topography: {
    fontSize: '0.95rem',
    fontWeight: 700,
  },
  title: {
    fontWeight: 700
  },
  acceptButton: {
    color: 'green'
  }
}))

const StoryDialog = (props) => {
  const classes = useStyles()
  const { open, handleClose, story } = props

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' className={classes.title}>{story.summary}</DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid>
              <Typography className={classes.topography} variant="subtitle2">Description</Typography>
            </Grid>
            <Grid>
              <Typography variant='body2'>{story.description}</Typography>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Grid>
              <Typography className={classes.topography} variant="subtitle2">Type</Typography>
            </Grid>
            <Grid>
              <Typography variant='body2'>{story.type}</Typography>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Grid>
              <Typography className={classes.topography} variant="subtitle2">Complexity</Typography>
            </Grid>
            <Grid>
              <Typography variant='body2'>{story.complexity}</Typography>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Grid>
              <Typography className={classes.topography} variant="subtitle2">
                Estimated time for completion
              </Typography>
            </Grid>
            <Grid>
              <Typography variant='body2'>{`${story.estimatedHrs}hr`}</Typography>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Grid>
              <Typography className={classes.topography} variant="subtitle2">Cost</Typography>
            </Grid>
            <Grid>
              <Typography variant='body2'>{story.cost}</Typography>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Grid>
              <Typography className={classes.topography} variant="subtitle2">Status</Typography>
            </Grid>
            <Grid>
              <Typography variant='body2'>{story.status}</Typography>
            </Grid>
          </Paper>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className={classes.acceptButton}>
          Accept
        </Button>
        <Button color='secondary' autoFocus>
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StoryDialog
