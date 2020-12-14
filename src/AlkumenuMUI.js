import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CakeIcon from '@material-ui/icons/Cake';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import DvrIcon from '@material-ui/icons/Dvr';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Popover from '@material-ui/core/Popover';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import red from '@material-ui/core/colors/red';
import { CssBaseline } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { blue, green } from '@material-ui/core/colors';

function MenuMUI () {
  const [anchorMenu, setMenuOpen] = useState(null);
  
  const handleMenu = (event) => { setMenuOpen(event.currentTarget); }
  const handleClose = () => { setMenuOpen(null); }
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const useStyles = makeStyles({
    list: {
      width: 250,
      backgroundColor: grey[400],
    },
    fullList: {
      width: 'auto',
    },
    mobo: {
      color: red[900],
    },
    gpu: {
      color: blue[900],
    },
    cpu: {
      color: green[900],
    }
  });
  const classes = useStyles();
const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CssBaseline/>
<MenuList>
    <AppBar position='fixed' className={classes.appBar}>
      
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
      <div className={classes.toolbar} />
        <Divider/>
      <MenuItem onClick={ handleClose } component={Link} to ='/KysymysListaus'>
      <Toolbar>
         <Typography color='inherit' onClick={ handleClose } component={Link} to ='/KysymysListaus'  variant='h5' ><IconButton color='inherit'><DragIndicatorIcon/></IconButton>Kysymykset</Typography>
      </Toolbar>
      </MenuItem>
      
      <Divider/>
      <MenuItem onClick={ handleClose } component={Link} to ='/UusiKysymys'>
      <Toolbar>
         <Typography onClick={ handleClose } component={Link} to ='/UusiKysymys' color='inherit' variant='h5' ><IconButton color='inherit'><DvrIcon/></IconButton>Admin</Typography>
      </Toolbar>
      </MenuItem>
      <Divider/>
      <Divider/>
      </Drawer>
    </AppBar>
    </MenuList>

  </div>
  );
  return (
    <div>
      {['Valikko'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MenuMUI;

