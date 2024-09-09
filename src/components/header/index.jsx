import React, {useEffect, useState} from 'react';
import logo from '../../assets/greenleaf.png';
import AppBar from '@mui/material/AppBar';
import {Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Fade} from "react-reveal";
import LoginIcon from '@mui/icons-material/Login';
import Dropdown from "../dropdown/index.jsx";
import {useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BottomMenu from "../BottomMenu/index.jsx";
import Menudrawer from "../menudrawer/index.jsx";

function Index(props) {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const commonHeight = '40px';
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);


    return (
        <>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    maxWidth: '100%',
                    margin: '0 auto',
                    overflowX: 'hidden',
                    zIndex: 1000,
                    top: 0,
                    backgroundColor: scroll ? 'rgba(255, 255, 255, 0.9)' : 'inherit', // Background change on scroll
                    transition: 'background-color 0.3s ease-in-out', // Smooth transition
                    boxShadow: scroll ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none', // Optional shadow effect
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        justifyContent: {xs: 'center', md: 'space-between'},
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        padding: {xs: '8px', sm: '16px'},
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Logo */}
                    <Box display="flex" alignItems="center" justifyContent="space-between"
                         sx={{width: {xs: '100%', md: 'auto'}, p: 2}}>
                        <IconButton sx={{p: 0}}>
                            <img src={logo} alt="Logo" style={{height: 40}}/>
                        </IconButton>
                        <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                            <MenuIcon
                                onClick={() => setOpen(!open)}
                                sx={{transform: 'scale(1.2)'}}
                                color="success"
                            />
                        </Box>
                    </Box>

                    <Menudrawer open={open} setOpen={setOpen}/>

                    {/* Dropdown and Search Bar for Larger Screens */}
                    <Box
                        display={{xs: 'none', md: 'flex'}}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            flexGrow: 1,
                            gap: '16px',
                        }}
                    >
                        <Dropdown/>

                        <TextField
                            variant="outlined"
                            color="success"
                            placeholder="Mahsulotlar va turkumlar izlash"
                            sx={{
                                minWidth: '400px',
                                maxWidth: '600px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                                height: commonHeight,
                            }}
                            InputProps={{
                                sx: {height: commonHeight},
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon color="success"/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* User Account, Favorite, and Cart Buttons */}
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap="16px"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            flexShrink: 0,
                            marginTop: {xs: '8px', md: 0},
                            width: {xs: '100%', md: 'auto'},
                            boxSizing: 'border-box',
                            overflowX: 'hidden',
                        }}
                    >
                        {localStorage.getItem('access_token') ? (
                            <Button
                                startIcon={<AccountCircleIcon/>}
                                onClick={() => navigate('/auth/login')}
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    height: commonHeight,
                                    fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                    width: '100%',
                                }}
                            >
                                Nuriddin
                            </Button>
                        ) : (
                            <Button
                                startIcon={<LoginIcon/>}
                                onClick={() => navigate('/auth/login')}
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    height: commonHeight,
                                    fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                    width: '100%',
                                }}
                            >
                                Kirish
                            </Button>
                        )}

                        <Button
                            startIcon={<FavoriteBorderIcon color="error"/>}
                            color="inherit"
                            sx={{
                                textTransform: 'none',
                                height: commonHeight,
                                fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                width: '100%',
                            }}
                        >
                            Saralangan
                        </Button>

                        <Button
                            startIcon={<ShoppingCartIcon/>}
                            color="inherit"
                            onClick={() => navigate('/basket')}
                            sx={{
                                textTransform: 'none',
                                height: commonHeight,
                                fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                width: '100%',
                            }}
                        >
                            Savat
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Adjust content for fixed header */}
            <Box sx={{height: '64px', width: '100%'}}/> {/* Spacer to prevent content overlap */}

            {/* Mobile Search Input */}
            <Fade bottom>
                <Box
                    sx={{
                        display: {xs: 'flex', md: 'none'},
                        width: '100%',
                        padding: '8px 10px',
                        alignItems: 'center',
                        gap: '1rem',
                        mt: 2,
                        boxSizing: 'border-box',
                    }}
                >
                    <TextField
                        variant="outlined"
                        color="success"
                        placeholder="Mahsulotlar va turkumlar izlash"
                        fullWidth
                        sx={{
                            height: commonHeight,
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px',
                        }}
                        InputProps={{
                            sx: {height: commonHeight},
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon color="success"/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={() => navigate('/wishlist')}>
                        <FavoriteBorderIcon size="large"/>
                    </IconButton>
                </Box>
            </Fade>

            {/* Bottom Navigation with Icons Only */}
            <BottomMenu/>
        </>
    );

}

export default Index;
