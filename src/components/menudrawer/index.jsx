import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CollectionsIcon from '@mui/icons-material/Collections';

function Index({open, setOpen}) {

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const menus = [
        {
            title: 'Kompaniya haqida',
            url: '#about',
            icon: <BusinessIcon/>
        }, {
            title: 'Bizning jamoamiz',
            url: '#our_team',
            icon: <Diversity3Icon/>
        }, {
            title: 'Galleriya',
            url: '#galleriya',
            icon: <CollectionsIcon/>
        }
    ]

    const DrawerList = (
        <Box sx={{width: 260}} role="presentation">
            {/* Close Button */}
            <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon/>
                </IconButton>
            </Box>


            <Divider/>
            <List>
                {menus.map((item, index) => (
                    <a href={item.url} key={item.url} style={{
                        textDecoration: 'none',
                        color: '#000'
                    }}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleDrawer(false)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItemButton>
                        </ListItem>
                    </a>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default Index;
