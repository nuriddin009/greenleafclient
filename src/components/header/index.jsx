import React from 'react';
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
import {useNavigate} from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

function Index(props) {
    const commonHeight = '40px';
    const navigate = useNavigate(); // For navigation

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
                maxWidth: {xs: '100%'}, // Responsive width
                margin: '0 auto',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center', // Center items vertically
                    flexWrap: 'wrap' // Prevent wrapping to ensure single line
                }}
            >
                {/* Logo */}
                <Fade left>
                    <Box display="flex" alignItems="center">
                        <IconButton>
                            <img src={logo} alt="Logo" style={{height: 40}}/>
                        </IconButton>
                    </Box>
                </Fade>

                <Fade top>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            flexGrow: 1,
                            width: '100%'
                        }}
                    >
                        <Dropdown/>

                        <TextField
                            variant="outlined"
                            color="success"
                            placeholder="Mahsulotlar va turkumlar izlash"
                            sx={{
                                flexGrow: 1, // Make the search input grow to fill available space
                                minWidth: '500px',
                                maxWidth: '600px', // Maximum width to ensure it doesn't become too large
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                                height: commonHeight,
                                margin: 'auto' // Pushes the search input to the right
                            }}
                            InputProps={{
                                sx: {
                                    height: commonHeight
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon color="success"/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Fade>

                {/* User Account, Favorite, and Cart Buttons */}
                <Fade right>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="20px" // Consistent gap for buttons
                        sx={{
                            flexShrink: 0 // Prevent shrinking of this Box
                        }}
                    >
                        {localStorage.getItem('access_token') ? (
                            <Button
                                startIcon={<AccountCircleIcon/>}
                                onClick={() => navigate('/auth/login')}
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    height: commonHeight
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
                                    height: commonHeight
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
                                height: commonHeight
                            }}
                        >
                            Saralangan
                        </Button>

                        <Button
                            startIcon={<ShoppingCartIcon/>}
                            color="inherit"
                            sx={{
                                textTransform: 'none',
                                height: commonHeight
                            }}
                        >
                            Savat
                        </Button>
                    </Box>
                </Fade>
            </Toolbar>
        </AppBar>
    );
}

export default Index;
