import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  root: {
    padding: theme.spacing(10),
    textAlign: 'center'
    // textAlign: 'center',
    // top: '50%',
    // transform: 'translateY(-50%)',
    // position: 'absolute',
    // left: '240px',
    // right: 0,
    // width: 'calc(100% - 240px)'
  }
}));

export default function CircularLoader() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CircularProgress className={classes.progress} color='secondary' />
      </div>
    </React.Fragment>
  );
}