import React, { useState, useRef } from 'react';
import { TextField, IconButton, InputAdornment, MenuItem, Box, Popper, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const products = [
    {
        id: 1,
        name: 'Barmoqchilar va bilaklar',
        price: '27 000 so\'m',
        image: 'https://i.pinimg.com/736x/42/9d/63/429d631659a11a9eb666b103d811470a.jpg',
    },
    {
        id: 2,
        name: 'Quvvat mashqlari',
        price: '25 000 so\'m',
        image: 'https://i.pinimg.com/736x/42/9d/63/429d631659a11a9eb666b103d811470a.jpg',
    },
    {
        id: 3,
        name: 'Metall to\'pponcha',
        price: '299 000 so\'m',
        image: 'https://i.pinimg.com/736x/42/9d/63/429d631659a11a9eb666b103d811470a.jpg',
    },
];

const SearchWithDropdown = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFocus = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleBlur = () => {
        setTimeout(() => setOpen(false), 150);
    };

    return (
        <div style={{ position: 'relative', marginRight:'1.5rem' }}>
            <TextField
                variant="outlined"
                color="success"
                placeholder="Mahsulotlar va turkumlar izlash"
                sx={{
                    minWidth: '400px',
                    // maxWidth: '600px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    height: '45px',

                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                fullWidth
                InputProps={{
                    sx: { height: '45px' },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon color="success" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Popper
                open={open && Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{ zIndex: 1300 }} // Remove width from here
                modifiers={[
                    {
                        name: 'sameWidth',
                        enabled: true,
                        phase: 'beforeWrite',
                        requires: ['computeStyles'],
                        fn: ({ state }) => {
                            state.styles.popper.width = `${state.rects.reference.width}px`; // Match width to search input
                        },
                    },
                ]}
            >
                <Paper sx={{ mt: 1, maxHeight: '300px', overflowY: 'auto', width: '100%', borderRadius: '12px', boxShadow: 3 }}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <MenuItem key={product.id} sx={{ borderRadius: '12px', '&:hover': { backgroundColor: '#f4f4f4' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                            marginRight: '16px',
                                        }}
                                    />
                                    <Box>
                                        <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                                        <div style={{ color: 'green' }}>{product.price}</div>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem>
                            <Box sx={{ textAlign: 'center', width: '100%' }}>Mahsulot topilmadi</Box>
                        </MenuItem>
                    )}
                </Paper>
            </Popper>


        </div>
    );
};

export default SearchWithDropdown;
