import React from 'react';
import { CssBaseline, List, ListItem, ListItemText, Menu, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import img1 from "../header/img_1.png";
import { styled } from "@mui/system";

const FullWidthMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        width: '100%',
        height: '100vh',
        left: 0,
        top: '100%',
        marginTop: '10px',
        position: 'relative',  // Ensures proper positioning
        overflow: 'hidden',     // Prevents scroll when menu is open
    },
}));
const categories = [
    'Maktab bozori', 'Yozgi savdo', 'Kanselyariya', 'Nasiya', 'Elektronika',
    'Maishiy texnika', 'Kiyim', 'Poyabzallar', 'Aksessuarlar',
    'Go’zallik va parvarish', 'Salomatlik', 'Uy-ro‘zg‘or buyumlari',
    'Qurilish va ta’mirlash',
];

function Index(props) {
    const commonHeight = '40px';
    const greenColor = '#6b9a50';
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Toolbar>
            <Button
                startIcon={anchorEl ? <CloseOutlinedIcon /> : <MenuIcon />}
                aria-controls="simple-menu"
                aria-haspopup="true"
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
            <FullWidthMenu
                id="full-width-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <CssBaseline />

                    <Box
                        sx={{
                            width: { xs: '100%', sm: '240px' },
                            bgcolor: 'background.paper',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'fixed',
                            top: 85,
                            bottom: 30, // Ensure it extends to the bottom
                            overflowY: 'auto',
                            zIndex: 1,  // Ensures sidebar stays above content
                        }}
                    >
                        <List>
                            {categories.map((text) => (
                                <ListItem button key={text}>
                                    <img src={img1} width={25} height={25} alt="img" />&nbsp;&nbsp;
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            bgcolor: 'background.default',
                            p: 3,
                            ml: { xs: 0, sm: '240px' }, // Adjust margin based on screen size
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
            </FullWidthMenu>
        </Toolbar>
    );
}

export default Index;
