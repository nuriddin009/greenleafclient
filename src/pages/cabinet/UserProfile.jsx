import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    ButtonBase
} from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import HelpIcon from '@mui/icons-material/Help';
import MailIcon from '@mui/icons-material/Mail';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BottomMenu from "../../components/BottomMenu/index.jsx";

const UserProfile = () => {
    const menuItems = [
        {text: 'Buyurtmalarim', icon: <HomeIcon sx={{color: '#1976d2'}}/>},
        {text: 'Sharhlarim', icon: <MarkUnreadChatAltIcon sx={{color: '#d32f2f'}}/>},
        {text: 'Kartalarim', icon: <PaymentIcon sx={{color: '#388e3c'}}/>},
        {text: 'Promokodlarim', icon: <LocalOfferIcon sx={{color: '#f57c00'}}/>},
        {text: 'Chatlarim', icon: <ForumRoundedIcon sx={{color: '#1976d2'}}/>},
        {text: 'Bildirishnomalar', icon: <NotificationsRoundedIcon sx={{color: '#f44336'}}/>},
        {text: 'Profilim', icon: <PersonIcon sx={{color: '#673ab7'}}/>},
        {text: 'Sozlamalar', icon: <SettingsIcon sx={{color: '#616161'}}/>},
        {text: 'Ilova tili', icon: <LanguageIcon sx={{color: '#3f51b5'}}/>},
        {text: 'Shahar', icon: <LocationOnIcon sx={{color: '#f44336'}}/>},
        {text: 'Topshirish joylari', icon: <MapIcon sx={{color: '#009688'}}/>},
        {text: 'Ma\'lumot', icon: <HelpIcon sx={{color: '#795548'}}/>},
        {text: 'Biz bilan bog\'lanish', icon: <MailIcon sx={{color: '#607d8b'}}/>},
    ];

    return (
        <>
            <Container maxWidth={false} disableGutters sx={{width: '100%'}}>
                <CssBaseline/>
                {/*<AppBar position="static" color={'success'}>*/}
                {/*    <Toolbar>*/}
                {/*        <Typography variant="h6" sx={{flexGrow: 1, textAlign: 'center'}}>*/}
                {/*            Shaxsiy kabinet*/}
                {/*        </Typography>*/}
                {/*    </Toolbar>*/}
                {/*</AppBar>*/}

                <Box sx={{textAlign: 'center', margin: '20px 0'}}>
                    <Avatar sx={{width: 100, height: 100, margin: '0 auto'}}/>
                    <Typography variant="h6">Nuriddin I.</Typography>
                    <Typography variant="body2">+998 99 968-66-53</Typography>
                </Box>

                <List>
                    {menuItems.map(({text, icon}) => (
                        <React.Fragment key={text}>
                            <ListItem
                                component={ButtonBase}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '10px 16px',
                                    borderRadius: 2,
                                    textAlign: 'left',
                                    marginBottom: 0.5,
                                    backgroundColor: '#f5f5f5',
                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </Box>
                                <KeyboardArrowRightIcon sx={{color: '#9e9e9e'}}/>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
                </List>

                <Box sx={{textAlign: 'center', marginTop: '10px'}} padding={'2rem'}>
                    <Button variant="contained" fullWidth color={'success'}>
                        Chiqish
                    </Button>
                </Box>
            </Container>
            <br/><br/>
            <BottomMenu/>
        </>
    );
};

export default UserProfile;
