import React, {useState} from 'react';
import {Button, Box, Typography, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/system';
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, removeFromCart} from "../../features/cartSlice.js";

const Counter = ({productId}) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const currentProduct = cartItems.filter(item => item.id === productId)[0]


    const handleIncrement = () => {
        dispatch(changeQuantity({id: currentProduct?.id, increment: 1}))
    };

    const handleDecrement = () => {
        if (currentProduct?.quantity - 1 === 0) {
            dispatch(removeFromCart(currentProduct?.id))
        } else {
            dispatch(changeQuantity({id: currentProduct?.id, increment: -1}))
        }
    };

    const getButtonSize = () => {
        if (isSmallScreen) return {minWidth: '20px', height: '20px', fontSize: '12px'};
        if (isMediumScreen) return {minWidth: '25px', height: '25px', fontSize: '14px'};
        if (isLargeScreen) return {minWidth: '30px', height: '30px', fontSize: '16px'};
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
            border="1px solid #ccc"
            padding="5px"
            borderRadius="5px"
        >
            <Button
                variant="outlined"
                style={getButtonSize()}
                onClick={handleDecrement}
            >
                -
            </Button>
            <Typography
                variant="body1"
                style={{
                    fontSize: isSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px',
                }}
            >
                {currentProduct?.quantity}
            </Typography>
            <Button
                variant="outlined"
                style={getButtonSize()}
                onClick={handleIncrement}
            >
                +
            </Button>
        </Box>
    );
};

export default Counter;
