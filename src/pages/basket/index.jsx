import React, {useState} from 'react';
import {Box, Button, Grid, Typography, TextField, IconButton, MenuItem} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BottomMenu from '../../components/BottomMenu/index.jsx';
import EmptyTableData from "../../components/emptydata/EmptyTableData.jsx";
import {useNavigate} from "react-router-dom";

const products = [
    {
        id: 1,
        name: 'Cotton T-shirt',
        price: 440000.0,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
    },
    {
        id: 2,
        name: 'Cotton T-shirt',
        price: 45000.0,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
    },
    {
        id: 3,
        name: 'Cotton T-shirt',
        price: 120044.0,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
    },
];

const Index = () => {
    const [cart, setCart] = useState(products);
    const [shipping, setShipping] = useState(5.0);
    const [code, setCode] = useState('');

    const handleQuantityChange = (id, increment) => {
        setCart(cart.map(item =>
            item.id === id ? {...item, quantity: item.quantity + increment} : item
        ));
    };

    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };
    const navigate = useNavigate()

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Box p={2} sx={{maxWidth: '1200px', mx: 'auto', boxShadow: 3, borderRadius: 2, bgcolor: 'white'}}>
                <Grid container spacing={2}>
                    {/* Left section: Cart Items */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom textAlign='center'>
                            Savat
                        </Typography>

                        {cart.length === 0 ? (
                            <EmptyTableData
                                message="Savatda hozircha mahsulot yo'q"
                                actionLabel={'Bosh sahifa'}
                                onActionClick={() => navigate('/')}
                            />
                        ) : (
                            cart.map((product) => (
                                <Grid
                                    container
                                    key={product.id}
                                    alignItems="center"
                                    spacing={2}
                                    py={2}
                                    borderBottom={1}
                                    borderColor="grey.300"
                                    sx={{
                                        // Stack vertically on small screens
                                        flexDirection: {xs: 'column', sm: 'row'},
                                    }}
                                >
                                    <Grid item xs={12} sm={2}>
                                        <img src={product.image} alt={product.name}
                                             style={{width: '100%', borderRadius: '8px'}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="subtitle1">{product.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">Shirt</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Box display="flex" alignItems="center"
                                             justifyContent={{xs: 'center', sm: 'flex-start'}}>
                                            <IconButton
                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                disabled={product.quantity === 1}
                                                sx={{color: 'success.main'}}
                                            >
                                                <RemoveCircleIcon fontSize="large"/>
                                            </IconButton>
                                            <Typography variant="body1" mx={2}>
                                                {product.quantity}
                                            </Typography>
                                            <IconButton onClick={() => handleQuantityChange(product.id, 1)}
                                                        sx={{color: 'success.main'}}>
                                                <AddCircleIcon fontSize="large"/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={2} sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                                        <Typography
                                            variant="body1">{(product.price * product.quantity).toFixed(2)}UZS</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1} sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                                        <IconButton onClick={() => handleRemove(product.id)} sx={{color: 'error.main'}}>
                                            <HighlightOffIcon fontSize="large"/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))
                        )}
                    </Grid>

                    {/* Right section: Summary */}
                    {
                        cart.length > 0 && <Grid item xs={12} md={4}>
                            <Box sx={{p: 3, borderRadius: 2, boxShadow: 2}}>
                                <Typography variant="h6" gutterBottom>
                                    Summary
                                </Typography>

                                <Grid container justifyContent="space-between" py={1}>
                                    <Typography variant="body1">Items {cart.length}</Typography>
                                    <Typography variant="body1">€{totalPrice.toFixed(2)}</Typography>
                                </Grid>

                                <Grid container justifyContent="space-between" py={1}>
                                    <Typography variant="body1">Shipping</Typography>
                                    <TextField
                                        select
                                        value={shipping}
                                        onChange={(e) => setShipping(parseFloat(e.target.value))}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    >
                                        <MenuItem value={5.0}>Standard Delivery - €5.00</MenuItem>
                                        <MenuItem value={10.0}>Express Delivery - €10.00</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid container justifyContent="space-between" py={1}>
                                    <Typography variant="body1">Give Code</Typography>
                                    <TextField
                                        placeholder="Enter your code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid container justifyContent="space-between" py={1} mt={2}>
                                    <Typography variant="body1">Total Price</Typography>
                                    <Typography variant="h6">€{(totalPrice + shipping).toFixed(2)}</Typography>
                                </Grid>
                            </Box>
                        </Grid>
                    }
                </Grid>

                {/* Fixed Bottom Bar */}
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
                            <Typography variant="h6">
                                Jami: {(totalPrice + shipping).toFixed(2)}UZS
                            </Typography>
                            <p>2 ta mahsulot</p>
                        </div>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{textTransform: 'none'}}
                            onClick={() => navigate('/checkout')}
                        >
                            Rasmiylashtirish
                        </Button>
                    </Box>
                )}
            </Box>
            <Box sx={{
                display: {xs: 'flex', md: 'none'}
            }}>
                <br/><br/>
                <br/><br/>
                <br/><br/>
            </Box>
            <BottomMenu/>
        </>
    );
};

export default Index;
