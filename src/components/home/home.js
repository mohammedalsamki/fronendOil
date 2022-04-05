
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { NavLink} from 'react-router-dom';

export default function mainHome() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar> 
          <NavLink activeClassName='active' to='/Oil_Fluid'><ImageIcon  /></NavLink>
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Oil_Fluid" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/Filter'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Filter" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/Brake'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Brake" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/Spark'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Spark" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/Belt'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Belt" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/CareCare'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="CarCare" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/Lamps'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Lamps" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/Bumps'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pumps" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/bearing'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Bearing" secondary="test" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <NavLink activeClassName='active' to='/Suspention'><ImageIcon  /></NavLink>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Suspention" secondary="test" />
      </ListItem>
    </List>
  );
}