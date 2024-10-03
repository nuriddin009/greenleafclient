import React, { useEffect, useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    TextField,
    InputAdornment,
    IconButton,
    ButtonBase
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import instance from "../../utils/instance.js";
import BottomMenu from "../../components/BottomMenu/index.jsx";

const Index = () => {
    const [categories, setCategories] = useState([]);

    // Fetch categories from the API
    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        instance('/v1/category').then(res => {
            setCategories(res.data.elements);
        });
    };

    return (
        <Box sx={{width: '100%',  paddingTop: '70px', boxSizing: 'border-box'}}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    padding: '8px 10px',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    backgroundColor: '#fff',
                    zIndex: 1,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
                        sx: { height: '40px' },
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchIcon color="success" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Box sx={{}}> {/* Adjusted marginTop to prevent overlap */}
                <List>
                    {categories.map((category) => (
                        <React.Fragment key={category?.id}>
                            <ListItem component={ButtonBase} button>
                                <img src={category?.image} width={25} height={25} alt={category?.name}/>&nbsp;&nbsp;
                                <ListItemText primary={category?.name}/>
                                <ListItemText primary="→" sx={{textAlign: 'right', color: '#9e9e9e'}}/>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
                </List>
            </Box>
   <Box sx={{}}> {/* Adjusted marginTop to prevent overlap */}
                <List>
                    {categories.map((category) => (
                        <React.Fragment key={category?.id}>
                            <ListItem component={ButtonBase} button>
                                <img src={category?.image} width={25} height={25} alt={category?.name}/>&nbsp;&nbsp;
                                <ListItemText primary={category?.name}/>
                                <ListItemText primary="→" sx={{textAlign: 'right', color: '#9e9e9e'}}/>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
                </List>
            </Box>
   <Box sx={{}}> {/* Adjusted marginTop to prevent overlap */}
                <List>
                    {categories.map((category) => (
                        <React.Fragment key={category?.id}>
                            <ListItem component={ButtonBase} button>
                                <img src={category?.image} width={25} height={25} alt={category?.name}/>&nbsp;&nbsp;
                                <ListItemText primary={category?.name}/>
                                <ListItemText primary="→" sx={{textAlign: 'right', color: '#9e9e9e'}}/>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
                </List>
            </Box>
   <Box sx={{}}> {/* Adjusted marginTop to prevent overlap */}
                <List>
                    {categories.map((category) => (
                        <React.Fragment key={category?.id}>
                            <ListItem component={ButtonBase} button>
                                <img src={category?.image} width={25} height={25} alt={category?.name}/>&nbsp;&nbsp;
                                <ListItemText primary={category?.name}/>
                                <ListItemText primary="→" sx={{textAlign: 'right', color: '#9e9e9e'}}/>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            <br/><br/><br/>
            <BottomMenu/>
        </Box>
    );
};

export default Index;
