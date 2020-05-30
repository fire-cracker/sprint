import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Paper,
  Typography,
  Container,
} from '@material-ui/core'

import StoryListTable from '../components/StoryListTable'
import CreateStoryModal from '../components/CreateStoryModal'
import StoryDialog from '../components/StoryDialog'
import { getStories } from '../apiCalls'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  error: {
    margin: '0 auto',
    display: 'table',
    fontWeight: 700,
  },
}))

export const StoriesPage = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    stories: [],
    openCreateStoryModal: false,
    openStoryDialog: false,
    activeStory: {},
    status: '',
    role: '',
  })

  useEffect(() => {
    ;(async () => {
      const stories = await getStories()
      setState((prevState) => ({
        ...prevState,
        stories: stories,
        role: localStorage.getItem('role'),
      }))
    })()
  }, [])

  const onClickCreateStoryModal = () => {
    setState((prevState) => ({
      ...prevState,
      openCreateStoryModal: true,
    }))
  }

  const onCloseCreateStoryModal = () => {
    setState((prevState) => ({
      ...prevState,
      openCreateStoryModal: false,
    }))
  }

  const onCloseStoryDialog = () => {
    setState((prevState) => ({
      ...prevState,
      openStoryDialog: false,
    }))
  }

  const onClickStory = (story) => (event) => {
    setState((prevState) => ({
      ...prevState,
      activeStory: story,
      openStoryDialog: true,
    }))
  }

  const logout = () => {
    localStorage.clear()
    props.history.push('/')
  }

  const {
    openCreateStoryModal,
    activeStory,
    openStoryDialog,
    stories,
    role,
  } = state

  return (
    <div className={classes.root}>
      <AppBar position='absolute'>
        <Toolbar className={classes.toolbar}>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          {role === 'user' ? (
            <Button color='inherit' onClick={onClickCreateStoryModal}>
              Create Story
            </Button>
          ) : null}
          <Button color='inherit' onClick={logout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <CreateStoryModal
              open={openCreateStoryModal}
              handleClose={onCloseCreateStoryModal}
            />
            <StoryDialog
              open={openStoryDialog}
              story={activeStory}
              handleClose={onCloseStoryDialog}
            />
            {/* Recent Orders */}
            <Grid item xs={12}>
              {stories.length ? (
                <Paper className={classes.paper}>
                  <StoryListTable {...state} onClickStory={onClickStory} />
                </Paper>
              ) : (
                <Typography
                  component='h1'
                  variant='h6'
                  color='inherit'
                  noWrap
                  className={classes.error}
                >
                  There are no stories
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default StoriesPage
