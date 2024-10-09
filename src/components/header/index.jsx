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
import {useLocation, useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BottomMenu from "../BottomMenu/index.jsx";
import Menudrawer from "../menudrawer/index.jsx";
import SearchWithDropdown from "./SearchWithDropdown.jsx";
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector} from "react-redux";

function Index() {
    const [scroll, setScroll] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [productName, setProductName] = useState('');


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 27) {
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


    const handleConfirmRemove = () => {
        setConfirmationOpen(false);
    };

    const handleCancelRemove = () => {
        setConfirmationOpen(false);
    };

    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const wishlist = useSelector((state) => state.cart.wishlist);


    const {pathname} = useLocation()

    useEffect(() => {

    }, [pathname]);

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
                    backgroundColor: scroll ? 'rgba(255, 255, 255, 1)' : 'inherit',
                    transition: 'background-color 0.3s ease-in-out',
                    boxShadow: scroll ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
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
                        <IconButton sx={{p: 0}} href={'/'}>
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
                            width: '63%'
                        }}
                    >

                        <Dropdown/>
                        <Box sx={{
                            flexGrow: 1,
                        }}>
                            <SearchWithDropdown/>
                        </Box>
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
                            flexDirection: 'row',
                            flexGrow: 1
                        }}
                    >
                        {localStorage.getItem('access_token') ? (
                            <Button
                                startIcon={<AccountCircleIcon/>}
                                onClick={() => navigate('/cabinet')}
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    height: '40px',
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
                                    height: '40px',
                                    fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                    width: '100%',
                                }}
                            >
                                Kirish
                            </Button>
                        )}

                        <Button
                            color="inherit"
                            onClick={() => navigate('/wishlist')}
                            sx={{
                                textTransform: 'none',
                                height: '44px',
                                fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                position: 'relative',
                            }}
                        >
                            <Badge
                                badgeContent={wishlist.length}
                                color="error"
                                sx={{
                                    '& .MuiBadge-dot': {
                                        borderRadius: '50%',
                                    },
                                }}
                            >
                                <FavoriteBorderIcon/>
                            </Badge>
                        </Button>

                        <Button
                            color="inherit"
                            onClick={() => navigate('/basket')}
                            sx={{
                                textTransform: 'none',
                                height: '43px',
                                fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                position: 'relative',
                            }}
                        >
                            <Badge
                                badgeContent={cartItems.length}
                                color="error"
                                sx={{
                                    '& .MuiBadge-dot': {
                                        borderRadius: '50%',
                                    },
                                }}
                            >
                                <ShoppingCartIcon/>
                            </Badge>
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
                            height: '40px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px',
                        }}
                        InputProps={{
                            sx: {height: '40px'},
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon color="success"/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {
                        pathname !== '/wishlist' && <Button
                            color="inherit"
                            onClick={() => navigate('/wishlist')}
                            sx={{
                                textTransform: 'none',
                                height: '44px',
                                fontSize: {xs: '12px', sm: '14px', md: '16px'},
                                position: 'relative',
                            }}
                        >
                            <Badge
                                badgeContent={wishlist.length}
                                color="error"
                                sx={{
                                    '& .MuiBadge-dot': {
                                        borderRadius: '50%',
                                    },
                                }}
                            >
                                <FavoriteBorderIcon/>
                            </Badge>
                        </Button>
                    }


                </Box>
            </Fade>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmationOpen}
                onClose={handleCancelRemove}
            >
                <DialogTitle>Mahsulotni olib tashlash</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {productName} mahsulotini olib tashlamoqchimisiz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelRemove} color="primary">
                        Bekor qilish
                    </Button>
                    <Button onClick={handleConfirmRemove} color="primary">
                        Ha
                    </Button>
                </DialogActions>
            </Dialog>
            <BottomMenu/>
        </>
    );
}

export default Index;