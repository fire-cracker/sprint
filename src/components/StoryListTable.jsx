import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core'

import { getComparator, stableSort } from '../utils'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'summary', label: 'Summary', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 170 },
  { id: 'complexity', label: 'Complexity', minWidth: 170 },
  {
    id: 'estimatedHrs',
    label: 'Estimated Hours (hr)',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'cost',
    label: 'Cost ($)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  head: {
    backgroundColor: 'rgb(62,81,181)',
    color: theme.palette.common.white,
  },
  container: {
    maxHeight: 440,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

export const StoryListTable = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    order: 'asc',
    orderBy: 'id',
  })

  const handleRequestSort = (property) => (event) => {
    const { order, orderBy } = state
    const isAsc = orderBy === property && order === 'asc'
    setState((prevState) => ({
      ...prevState,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    }))
  }

  const { order, orderBy } = state
  const { stories, onClickStory, role } = props

  return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className={classes.head}
                    >
                      {['id', 'complexity', 'type'].indexOf(column.id) !==
                      -1 ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={handleRequestSort(column.id)}
                        >
                          {column.label}
                          {orderBy === column.id ? (
                            <span className={classes.visuallyHidden}>
                              {order === 'desc'
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </span>
                          ) : null}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(stories, getComparator(order, orderBy)).map(
                  (story) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={story.id}
                        onClick={role === 'Admin' ? onClickStory(story) : null}
                      >
                        {columns.map((column) => {
                          const value = story[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
  )
}

export default StoryListTable
