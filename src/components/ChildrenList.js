import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
 
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
 

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,

  },
  
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  ulflex: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent:'space-evenly',
    maxWidth: '100%',
    backgroundColor:'gray',
    color: 'white'


  },
  dataflex: {
    display: 'flex',
    overflow: 'auto',
    justifyContent:'space-evenly',
    maxWidth: '100%',
    color: 'white',
    border:'1px, solid, black'


  },
}));



export const ChildrenList = props => {
  const [choresList, setChoresList]= useState([]);
  const classes = useStyles();

  const [data, setData] = useState([]);
  const id = localStorage.getItem('id');
  const [length, setLength]= useState("0");


  useEffect(() => {



    axiosWithAuth()
    .get(`/api/parent/children/${id}`).then(response => {
      console.log('child list response: ', response);
      setData(response.data);
      setLength(response.data.length);
      console.log('childs data length',response.data.length)
      // console.log('new data: ', data);

    });
  }, [length]);

  return (
    <div className={classes.root}>
      <CssBaseline />


      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>

            <Grid item xs={12}>
              <Paper className={classes.ulflex}>

              {
                !data ? (
                  <h2>No Children</h2>  
                ):(
                  data.map(data => (
                    <div className={classes.dataflex}>
                    <h4 key={data.id}>{data.name}</h4>
                    <h4 >{data.total_points}</h4>
                    <h4 >{data.current_streaks}</h4>
                    </div>
                  
                    
                    ))
                )

              }


          {/* {data.map(data => (
            <Button key={data}>{data.name}</Button>
          ))} */}
        </Paper>
            </Grid>
      </Container>
      </main>
    </div>
  );
};

export default ChildrenList;
