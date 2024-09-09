import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsIcon from '@mui/icons-material/Collections';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    background: '#4caf50',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    background: '#4caf50',
    color: 'white',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#4caf50',
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({

        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        background: 'transparent',

        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            '& .MuiDrawer-docked': {
                background: 'transparent',
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
            '& .MuiDrawer-docked': {
                background: 'transparent',
            },
        }),
    }),
);

const menus = [
    {
        title: 'Foydalanuvchilar',
        path: '/dashboard/users',
        icon: <AccountCircleIcon/>
    },
    {
        title: 'Mahsulotlar',
        path: '/dashboard/products',
        icon: <ViewListIcon/>
    },
    {
        title: 'Kategoriyalar',
        path: '/dashboard/categories',
        icon: <DashboardIcon/>
    },
    {
        title: 'Galleriya',
        path: '/dashboard/gallery',
        icon: <CollectionsIcon/>
    },
    {
        title: 'Videolar',
        path: '/dashboard/videos',
        icon: <PlayCircleIcon/>
    },
    {
        title: 'Arizalar',
        path: '/dashboard/inbox',
        icon: <InboxIcon/>
    },
    {
        title: 'Sozlamalar',
        path: '/dashboard/settings',
        icon: <SettingsIcon/>
    },
    {
        title: 'Dashboard',
        path: '/dashboard/update',
        icon: <DashboardCustomizeIcon/>
    },
]

function Index(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    let {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

    }, [pathname]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };


    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon sx={{color: 'white'}}/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Greenleaf dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: 'white'}}/> :
                            <ChevronLeftIcon sx={{color: 'white'}}/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>

                <List>
                    {
                        menus.map((menu, index) => <ListItem key={index} disablePadding sx={{
                            display: 'block',
                            background: pathname === menu.path ? 'white' : '#4caf50'
                        }}>
                            <ListItemButton
                                onClick={() => navigate(menu.path)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: pathname !== menu.path ? 'white' : '#4caf50'
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.title} sx={{
                                    opacity: open ? 1 : 0,
                                    color: pathname !== menu.path ? 'white' : '#4caf50',
                                    fontWeight: 'bold'
                                }}/>
                            </ListItemButton>
                        </ListItem>)
                    }
                    <Divider/>
                </List>
            </Drawer>

            <Box component="main" sx={{flexGrow: 1, p: 3, width: '100%'}}>
                <DrawerHeader/>
                <Outlet/>
            </Box>
        </Box>
    );
}

export default Index;