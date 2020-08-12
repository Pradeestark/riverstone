import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  useLocation
} from 'react-router-dom';
import { SIDE_BAR_DATA } from '../../services/constants';
import Dashboard from '../../modules/dashboard';
import Admin from '../../modules/admin';
import Login from '../../modules/auth/login';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
  },
  drawer: {
    // [theme.breakpoints.up('sm')]: {
    //   width: '100%',
    //   flexShrink: 0,
    // },
  },
  appBar: {
    background: '#007bff',
    color: 'white',
    // [theme.breakpoints.up('sm')]: {
    //   width: `100%`,
    //   marginLeft: drawerWidth,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
     /// display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: '24px',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: "space-evenly"
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  activeItem: {
    color: '#56C568',
    fontSize: '14px'
  },
  inActiveItem: {
    color: '#333333',
    fontSize: '14px'
  },
  header: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "30%",
  }
}));


function Header(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const activeRoute = pathName => {
    return location.pathname.indexOf(pathName) > -1;
    return false
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List className='my-list'>
        {SIDE_BAR_DATA.map(data => (
          <React.Fragment key={data.text}>
            <Link to={`/${data.url}`}>
              <ListItem
                className={
                  activeRoute(data.url)
                    ? classes.activeItem
                    : classes.inActiveItem
                }
              // onClick={() => setCurrent(data.url)}
              >
                <ListItemIcon
                  className={
                    activeRoute(data.url)
                      ? classes.activeItem
                      : classes.inActiveItem
                  }
                >
                  <Icon>{data.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={data.text} />
              </ListItem>
            </Link>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.grow}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.header}>
            <div className={classes.menuButton}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                // className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Typography variant="h6" noWrap>
              River Stone
          </Typography>
            <div>
            </div>
            <div style={{textAlign: "end"}}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxxt1iw-nGLHjFC84MqNcDWJ2v_GbGmU_ATQ&usqp=CAU" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden xsUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: false, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} /> 
        <Route path='/login' exact>
            <Login />
        </Route>   
          {/* <Login />    */}
          <Route path='/' exact>
            <Dashboard />
          </Route>
          <Route path='/admin' exact>
            <Admin />
          </Route>
      </main>
    </div>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
