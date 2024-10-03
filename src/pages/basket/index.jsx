import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Divider, Grid, IconButton, TextField, Typography} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BottomMenu from '../../components/BottomMenu/index.jsx';
import {useNavigate} from "react-router-dom";
import parse from "html-react-parser";
import EmptyBasket from "./EmptyBasket.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, removeFromCart} from "../../features/cartSlice.js"; // Updated import for remove

const Index = () => {
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items); // Get cart from Redux store

    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatNumber = (inputNumber) => {
        return Math.round(Number(inputNumber)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " so'm";
    };

    const getDesc = (x) => {
        const MAX_WORDS = 27;
        const extractText = (element) => {
            let text = '';
            if (typeof element === 'string') {
                text += element;
            } else if (Array.isArray(element)) {
                element.forEach((child) => {
                    text += extractText(child);
                });
            } else if (element?.props?.children) {
                text += extractText(element.props.children);
            }
            return text;
        };

        let elements = parse(x);
        let text = extractText(elements);
        if (!text) return '';

        const words = text.trim().split(/\s+/);
        if (words.length > MAX_WORDS) {
            return `${words.slice(0, MAX_WORDS).join(' ')}...`;
        }

        return text;
    };

    return (
        <>
            <Box sx={{
                width: '100%', // Full width by default
                maxWidth: {xs: '100%', md: '100%'}, // Full width on all screen sizes
                mx: 'auto', // Center the content
                my: 4,
                p: 2,
            }}>
                {cart.length === 0 && <EmptyBasket/>}
                <Grid container spacing={4}>
                    {/* Cart Items Section */}
                    <Grid item xs={12} md={8}>
                        {cart.length > 0 && <Typography variant="h4" gutterBottom align="center">
                            Savat
                        </Typography>}

                        {cart.length > 0 && (
                            cart.map((product) => (
                                <Card key={product.id} sx={{mb: 2, p: 2, borderRadius: '12px', boxShadow: 3}}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={12} sm={1} display={'flex'} justifyContent={'end'} sx={{
                                            display: {sm: 'none', xs: 'flex'}
                                        }}>
                                            <IconButton
                                                onClick={() => dispatch(removeFromCart(product.id))} // Dispatch remove
                                                sx={{color: 'error.main'}}>
                                                <HighlightOffIcon fontSize="large"/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={6} sm={2}> {/* Increased sm and md values for more space */}
                                            <Box
                                                sx={{
                                                    overflow: 'hidden',
                                                    borderRadius: '12px',
                                                    '&:hover img': {
                                                        transform: 'scale(1.1)',
                                                    }
                                                }}>
                                                <img
                                                    src={product?.images[0]?.url}
                                                    alt={product?.name}
                                                    style={{width: '100%', transition: 'transform 0.3s ease'}}
                                                />
                                            </Box>
                                        </Grid>


                                        <Grid item xs={4} sm={4}>
                                            <Typography variant="h6" sx={{fontWeight: '500'}}>
                                                {product?.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {product?.description ? getDesc(product?.description) : 'Product description here.'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Box display="flex" alignItems="center"
                                                 justifyContent={{xs: 'center', sm: 'flex-start'}}>
                                                <IconButton
                                                    onClick={() => dispatch(changeQuantity({
                                                        id: product.id,
                                                        increment: -1
                                                    }))}
                                                    disabled={product.quantity === 1}
                                                    sx={{color: '#ff1744'}}
                                                >
                                                    <RemoveCircleIcon fontSize="large"/>
                                                </IconButton>
                                                <Typography variant="body1" mx={2}>
                                                    {product.quantity}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => dispatch(changeQuantity({
                                                        id: product.id,
                                                        increment: 1
                                                    }))}
                                                    sx={{color: '#00e676'}}
                                                >
                                                    <AddCircleIcon fontSize="large"/>
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Typography variant="body1"
                                                        sx={{
                                                            textAlign: {xs: 'center', sm: 'left'},
                                                            fontWeight: '500',
                                                            // whiteSpace: 'nowrap'
                                                        }}>
                                                {` ${formatNumber(product.price * product.quantity)}`}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={1} display={'flex'} justifyContent={'space-between'}
                                              sx={{
                                                  display: {sm: 'flex', xs: 'none'}
                                              }}>
                                            <IconButton
                                                onClick={() => dispatch(removeFromCart(product.id))} // Dispatch remove
                                                sx={{color: 'error.main'}}>
                                                <HighlightOffIcon fontSize="large"/>
                                            </IconButton>
                                        </Grid>

                                    </Grid>
                                </Card>
                            ))
                        )}
                    </Grid>

                    {/* Summary Section */}
                    {
                        cart.length > 0 &&
                        <Grid item xs={12} md={4}>
                            <Card sx={{boxShadow: 3, borderRadius: '12px'}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{fontWeight: '500'}}>
                                        Buyurtma xulosasi
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body1">Yig'indi:</Typography>
                                        <Typography variant="body1">{formatNumber(totalPrice)}</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                        <Typography variant="body1">Yetkazib berish:</Typography>
                                        <Typography variant="body1">Bepul</Typography>
                                    </Box>
                                    <Divider sx={{my: 2}}/>
                                    <TextField
                                        fullWidth
                                        label="Chegirma kodini qo'shing"
                                        variant="outlined"
                                        size="small"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        sx={{mb: 2}}
                                    />
                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Typography variant="h6" sx={{fontWeight: '500'}}>Jami:</Typography>
                                        <Typography variant="h6"
                                                    sx={{fontWeight: '500'}}>{formatNumber(totalPrice)}</Typography>
                                    </Box>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="success"
                                        size="large"
                                        onClick={() => navigate('/checkout')}
                                        sx={{textTransform: 'none'}}
                                    >
                                        To'lash
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    }

                </Grid>
                <br/><br/>
                <br/>

                {/* Fixed Bottom Bar for Mobile */}
                {cart.length > 0 && (
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: {xs: 50, md: 0},
                            left: 0,
                            width: '100%',
                            bgcolor: 'white',
                            boxShadow: 3,
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}
                    >
                        <div>
                            <Typography variant="h6" sx={{fontWeight: '500'}}>
                                Jami: {formatNumber(totalPrice)}
                            </Typography>
                            <Typography variant="body2">{cart.length} ta mahsulot</Typography>
                        </div>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{textTransform: 'none'}}
                            onClick={() => navigate('/checkout')}
                        >
                            To'lash
                        </Button>
                    </Box>
                )}

                <br/><br/>
            </Box>
            <BottomMenu/>
        </>
    );
};

export default Index;