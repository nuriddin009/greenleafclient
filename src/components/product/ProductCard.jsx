import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import uploadImg from '../../assets/uploadImg.png';
import parse from 'html-react-parser';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart, toggleFavorite} from '../../features/cartSlice';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import {useNavigate} from "react-router-dom";
import Counter from "./Counter.jsx";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const wishlistItems = useSelector(state => state.cart.wishlist);

    const [openDialog, setOpenDialog] = useState(false);

    const isFavorited = wishlistItems.some(item => item.id === product.id);
    const isInCart = cartItems.some(item => item.id === product.id);

    const handleFavoriteToggle = () => {
        dispatch(toggleFavorite(product));
    };

    const handleAddToCart = () => {
        if (isInCart) {
            setOpenDialog(true);
        } else {
            dispatch(addToCart(product));
        }
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
        setOpenDialog(false); // Close the dialog after removal
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog without action
    };

    const formatPrice = (price) => {
        if (price == null) return 'N/A';
        return `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`;
    };

    const getDesc = (description) => {
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

        let elements = parse(description);
        let text = extractText(elements);
        if (!text) return '';

        const words = text.trim().split(/\s+/);
        if (words.length > MAX_WORDS) {
            return `${words.slice(0, MAX_WORDS).join(' ')}...`;
        }

        return text;
    };

    const navigate = useNavigate()



    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.02)',
                    },
                    position: 'relative', // Important for absolute positioning of the favorite icon
                }}
            >
                {/* Favorite Icon at top-right of the image */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 1, // Ensure it appears on top of the image
                    }}
                >
                    <IconButton
                        aria-label="sevimlilar ro'yxatiga qo'shish"
                        color={isFavorited ? 'error' : 'default'}
                        onClick={handleFavoriteToggle}
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            padding: '6px',
                            width: {
                                xl: '45px',
                                md: '40px',
                                sm: '30px',
                                xs: '27px',
                            },
                            height: {
                                xl: '45px',
                                md: '40px',
                                sm: '30px',
                                xs: '27px',
                            },
                            boxShadow: 1,
                            '&:hover': {backgroundColor: '#f0f0f0'},
                        }}
                    >
                        <FavoriteIcon
                            sx={{
                                fontSize: {
                                    xs: '14px',  // Small screens (mobile)
                                    md: '16px',  // Medium screens (desktop)
                                    lg: '18px',  // Large screens
                                    xl: '28px',  // Extra large screens
                                },
                            }}
                        />
                    </IconButton>
                </Box>

                <CardMedia
                    component="img"
                    image={product?.images?.length > 0 ? product.images[0]?.url : uploadImg}
                    alt={product?.name || 'Mahsulot rasmi'}
                    onClick={() => navigate(`/product/${product.id}`)}
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '200px', // You can adjust this height to ensure all images are uniform
                        margin: 0,       // Remove any margins or padding
                        padding: 0,      // Remove padding
                        transition: 'transform 0.6s ease',
                        '&:hover': {
                            transform: 'scale(1.1) translateY(-5px)',
                        },
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{fontWeight: 'bold'}}
                                onClick={() => navigate(`/product/${product.id}`)}>
                        {product?.name || 'Mahsulot nomi'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary"
                                onClick={() => navigate(`/product/${product.id}`)}>
                        {product?.description ? getDesc(product?.description) : 'Mahsulot haqida ta\'rif.'}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    justifyContent: 'space-between',
                    flexDirection: isInCart ? 'column' : 'row',
                    gap: '0.5rem'
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {
                                xs: '13px',  // Small screens (mobile)
                                sm: '18px',  // Small-medium screens (tablets)
                                lg: '18px',  // Large screens
                                xl: '28px',  // Extra large screens
                            },
                        }}
                    >
                        {formatPrice(product?.price)}
                    </Typography>
                    {
                        isInCart ? <Counter productId={product.id}/> : <Box sx={{display: 'flex', gap: '8px'}}>
                            <IconButton
                                aria-label="savatga qo'shish"
                                onClick={handleAddToCart}
                                sx={{
                                    color: isInCart ? 'primary.main' : 'default',
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                    padding: '6px',
                                    width: {
                                        xl: '45px',
                                        md: '40px',
                                        sm: '30px',
                                        xs: '27px',
                                    },
                                    height: {
                                        xl: '45px',
                                        md: '40px',
                                        sm: '30px',
                                        xs: '27px',
                                    },
                                    boxShadow: 1,
                                    '&:hover': {backgroundColor: '#f0f0f0'},
                                }}
                            >
                                <AddShoppingCartTwoToneIcon
                                    sx={{
                                        fontSize: {
                                            xs: '14px',  // Small screens (mobile)
                                            md: '16px',  // Medium screens (desktop)
                                            lg: '18px',  // Large screens
                                            xl: '28px',  // Extra large screens
                                        },
                                        fontWeight: 'bolder'
                                    }}
                                />
                            </IconButton>
                        </Box>
                    }
                </CardActions>
            </Card>

            {/* Dialog for confirmation of removal */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>O'chirishni tasdiqlang</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`"${product.name}" mahsulotini savatdan o‘chirishni istaysizmi?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Yo'q
                    </Button>
                    <Button onClick={handleRemoveFromCart} color="error">
                        Ha
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductCard;