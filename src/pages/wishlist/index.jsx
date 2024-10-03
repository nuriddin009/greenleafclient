import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BottomMenu from "../../components/BottomMenu/index.jsx";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate} from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import parse from "html-react-parser";
import EmptyWishlist from "./EmptyWishlist.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, toggleFavorite} from "../../features/cartSlice.js";

const Index = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.cart.wishlist);
    const cartItems = useSelector(state => state.cart.items);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        dispatch(toggleFavorite(itemToDelete))
        setConfirmOpen(false);
        setItemToDelete(null);
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setItemToDelete(null);
    };


    function hasInCart(id) {
        return cartItems.some(item => item.id === id);
    }


    const handleBuyNowClick = () => {
        wishlistItems.forEach(item => dispatch(addToCart(item)));r
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

    const navigate = useNavigate()

    return (
        <Box sx={{padding: {xs: '10px', sm: '20px'}}}>
            {
                wishlistItems.length > 0 &&
                <Typography variant="h4" gutterBottom>
                    Sevimlilar ro‘yxati
                </Typography>
            }


            {wishlistItems.length === 0 && <EmptyWishlist/>}


            {/* Desktop ko'rinishi */}
            {wishlistItems.length > 0 && <TableContainer sx={{display: {xs: 'none', md: 'block'}}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mahsulot</TableCell>
                            <TableCell>Qo'shilgan sana</TableCell>
                            <TableCell>Narxi</TableCell>
                            {/*<TableCell>Miqdor</TableCell>*/}
                            <TableCell>Omborda</TableCell>
                            <TableCell>O'chirish</TableCell>
                            <TableCell>Savat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wishlistItems.map((item) => (
                            <TableRow key={item?.id}>
                                <TableCell>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <img
                                            src={item?.images[0]?.url}
                                            alt={item?.name}
                                            style={{width: '50px', height: '50px', marginRight: '10px'}}
                                        />
                                        <Box>
                                            <Typography variant="body1">{item?.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item?.description ? getDesc(item?.description)
                                                    : 'Product description here.'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>28 mart, 2019</TableCell>
                                <TableCell>{item?.price?.toLocaleString()} UZS</TableCell>
                                <TableCell>Omborda mavjud</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClick(item)} sx={{color: 'error.main'}}>
                                        <HighlightOffIcon fontSize="large"/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="savatga qo'shish">
                                        <ShoppingCartIcon color={`${hasInCart(item.id) ? 'primary' : 'action'}`}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            {/* Mobil ko'rinishi */}
            <Box
                sx={{
                    display: {xs: 'block', md: 'none'},
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                {wishlistItems.map((item) => (
                    <Box
                        key={item?.id}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                        }}
                    >
                        <IconButton
                            onClick={() => handleDeleteClick(item)}
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                color: 'error.main',
                            }}
                        >
                            <HighlightOffIcon fontSize="large"/>
                        </IconButton>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <img
                                src={item?.images[0]?.url}
                                alt={item?.name}
                                style={{width: '80px', height: '80px', marginRight: '15px'}}
                            />
                            <Box>
                                <Typography variant="body1">{item?.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item?.description ? getDesc(item?.description)
                                        : 'Product description here.'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                            <Typography>{item?.price?.toLocaleString()} so'm</Typography>
                            <Typography>Omborda mavjud</Typography>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'end',
                            mt: 2
                        }}>
                            <IconButton
                                aria-label="savatga qo'shish"
                                sx={{
                                    color: 'action.main',
                                }}
                            >
                                <ShoppingCartIcon size='large'/>
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Hammasini savatga qo'shish tugmasi */}
            {wishlistItems.length > 0 && < Button
                variant="contained"
                color="primary"
                onClick={handleBuyNowClick}
                startIcon={<ShoppingCartIcon/>}
                sx={{marginTop: '20px'}}
            >
                Hammasini savatga qo'shish
            </Button>
            }

            {wishlistItems.length > 0 && <Button
                variant="contained"
                color="success"
                onClick={() => navigate('/')}
                startIcon={<HomeIcon/>}
                sx={{marginTop: '20px', display: {xs: 'none', md: 'flex'}}}
            >
                Bosh sahifaga chiqish
            </Button>}


            {/* Tasdiqlash dialogi */}
            <Dialog open={confirmOpen} onClose={handleCancelDelete}>
                <DialogTitle>O'chirishni tasdiqlash</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <strong>{itemToDelete?.name}</strong> ni sevimlilar ro‘yxatidan o‘chirishni istaysizmi?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Bekor qilish
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        O'chirish
                    </Button>
                </DialogActions>
            </Dialog>

            <br/><br/><br/><br/>

            <BottomMenu/>
        </Box>
    );
};

export default Index;