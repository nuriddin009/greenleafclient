import React, { useEffect } from 'react';
import { ButtonBase, CssBaseline, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, setMenuOpen, closeMenu } from '../../features/categorySlice';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Styled Drawer component with rounded top-right corner
const FullWidthDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiPaper-root': {
        width: '100vw',
        height: `100vh`,
        margin: 0,
        position: 'fixed',
        overflow: 'hidden',
        zIndex: 9999,
        borderTopRightRadius: '20px', // Rounded top-right corner
        borderTopLeftRadius: '20px',  // Optionally, round the top-left corner as well
    },
}));

function Index() {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector((state) => state.category.isMenuOpen);
    const categories = useSelector((state) => state.category.categories);
    const commonHeight = '40px';
    const greenColor = '#6b9a50';

    // Fetch categories when component mounts
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleClick = () => {
        if (isMenuOpen) {
            dispatch(closeMenu());
        } else {
            dispatch(setMenuOpen());
        }
    };

    const handleClose = () => {
        dispatch(closeMenu());
    };

    return (
        <Toolbar>
            <Button
                startIcon={isMenuOpen ? <CloseOutlinedIcon /> : <MenuIcon />}
                onClick={handleClick}
                sx={{
                    textTransform: 'none',
                    backgroundColor: '#e5e1fb',
                    color: greenColor,
                    height: commonHeight,
                    '&:hover': {
                        backgroundColor: '#e5e1fb',
                    },
                    marginRight: '10px',
                }}
                variant="contained"
            >
                Katalog
            </Button>

            <FullWidthDrawer
                anchor="bottom" // Drawer will open from the bottom
                open={isMenuOpen} // Open based on state
                onClose={handleClose} // Close the drawer when clicked outside
            >
                <CssBaseline />

                {/* Close Icon Button */}
                <IconButton
                    onClick={handleClose} // Bind the close action
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#ff0000',
                        '&:hover': {
                            backgroundColor: '#b50505',
                        },
                        borderRadius: '50%', // Make the button circular
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a slight shadow
                        zIndex: 10000, // Ensure the close button appears above everything
                    }}
                >
                    <CloseOutlinedIcon sx={{color:'#fff'}}/>
                </IconButton>

                <Box sx={{ display: 'flex', height: '100vh' }}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflowY: 'auto',
                            zIndex: 1,
                            borderRight: '2px solid #222',
                            width: '400px',
                        }}
                    >
                        <List>
                            {categories?.map((category) => (
                                <ListItem component={ButtonBase} button key={category?.id}>
                                    <img src={category?.image} width={25} height={25} alt={category?.name} />&nbsp;&nbsp;
                                    <ListItemText primary={category?.name} />
                                    <NavigateNextIcon/>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            bgcolor: 'background.default',
                            width: '100%',
                        }}
                    >
                        <Toolbar />
                        <Typography component="div">
                            <h2>Elektronika</h2>
                            <ul>
                                <li>Smartfonlar va telefonlar</li>
                                <li>Aqlli soatlar va fitnes bilaguzuklar</li>
                                <li>Kompyuter texnikasi</li>
                                <li>Foto va video texnika</li>
                                <li>Televizorlar va videotehnika</li>
                            </ul>
                        </Typography>
                    </Box>
                </Box>
            </FullWidthDrawer>
        </Toolbar>
    );
}

export default Index;