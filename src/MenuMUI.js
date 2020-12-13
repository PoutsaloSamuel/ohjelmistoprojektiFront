import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CakeIcon from '@material-ui/icons/Cake';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';

function MenuMUI () {
  const [anchorMenu, setMenuOpen] = useState(null);

  const handleMenu = (event) => { setMenuOpen(event.currentTarget); }
  const handleClose = () => { setMenuOpen(null); }

  

  return (
    <div>
    <AppBar position='static'>
      <Toolbar>
         <IconButton onClick={ handleMenu } color='inherit'><MenuIcon /></IconButton>
         <Typography variant='h5' style={ {flexGrow: 1, textAlign: 'center'} }>Komponentit</Typography>
      </Toolbar>
    </AppBar>

    <MenuList>
      <Menu
        anchorEl={ anchorMenu }
        open={ Boolean(anchorMenu) }
        anchorOrigin={ {vertical: 'bottom', horizontal: 'left'} }
        getContentAnchorEl={ null }
        onClose={ handleClose} >


          
        <MenuItem onClick={ handleClose } component={Link} to ='/UusiKysymys'>
          <ListItemIcon><CakeIcon /></ListItemIcon>
          <ListItemText primary='Kysymykset' />
        </MenuItem>
        <MenuItem onClick={ handleClose } component={Link} to ='/UusiVastaus'>
          <ListItemIcon><ChildCareIcon /></ListItemIcon>
          <ListItemText primary='Vastaukset' />
        </MenuItem>
        
      </Menu>
    </MenuList>
  </div>
  )
}

export default MenuMUI;

