import React, { useState, useEffect, useRef } from 'react';
import {
    TextField,
    IconButton,
    InputAdornment,
    MenuItem,
    Box,
    Popper,
    Paper,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../product/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchProducts } from '../../features/productSlice.js';
import useDebounce from '../../hooks/useDebounce';

const SearchWithDropdown = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const inputRef = useRef(null);
    const popperRef = useRef(null);

    const { products = [], status } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (debouncedSearchTerm) {
            dispatch(searchProducts(debouncedSearchTerm));
        } else {
            dispatch(fetchProducts());
        }
    }, [debouncedSearchTerm, dispatch]);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFocus = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleItemClick = () => {
        setOpen(false);
    };

    // Close dropdown when clicking outside the input or Popper
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                popperRef.current &&
                !popperRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ position: 'relative', marginRight: '1.5rem' }}>
            <TextField
                variant="outlined"
                color="success"
                placeholder="Mahsulotlar va turkumlar izlash"
                sx={{
                    minWidth: '400px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    height: '45px',
                    position: 'relative',
                    zIndex: 1301,
                }}
                onFocus={handleFocus}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                inputRef={inputRef} // Attach ref to the input
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

            {open && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        zIndex: 1200,
                    }}
                />
            )}

            <Popper
                ref={popperRef}
                open={open && Boolean(anchorEl)}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{ zIndex: 1300 }}
                modifiers={[
                    {
                        name: 'sameWidth',
                        enabled: true,
                        phase: 'beforeWrite',
                        requires: ['computeStyles'],
                        fn: ({ state }) => {
                            if (inputRef.current) {
                                state.styles.popper.width = `${inputRef.current.offsetWidth}px`;
                            }
                        },
                    },
                ]}
            >
                <Paper
                    sx={{
                        mt: 1,
                        borderRadius: '12px',
                        boxShadow: 3,
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <Box
                        sx={{
                            position: 'static',
                            width: '100%',
                            backgroundColor: '#fff',
                            boxShadow: 2,
                            padding: '8px',
                            borderRadius: '12px 12px 0 0',
                            zIndex: 1301,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" component="div">
                            Tavsiya etamiz
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                            padding: '8px',
                            marginTop: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '16px',
                                '@media (max-width: 1070px)': {
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                },
                                '@media (max-width: 600px)': {
                                    gridTemplateColumns: 'repeat(1, 1fr)',
                                },
                            }}
                        >
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={handleItemClick}
                                    />
                                ))
                            ) : (
                                <MenuItem>
                                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                                        Mahsulot topilmadi
                                    </Box>
                                </MenuItem>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Popper>
        </div>
    );
};

export default SearchWithDropdown;