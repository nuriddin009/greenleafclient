import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; // Import the icon
import {useNavigate} from 'react-router-dom';

const EmptyBasket = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%', // Full width
                height: '100vh', // Full height
                textAlign: 'center',
                padding: 2,
                bgcolor: '#f9f9f9',
                position: 'relative',
                margin: '0 auto'
            }}
        >
            {/* Icon for the empty basket */}
            <ShoppingCartOutlinedIcon
                sx={{fontSize: '100px', color: '#ccc', marginBottom: '20px'}} // Adjust size and color as needed
            />
            <Typography variant="h4" gutterBottom>
                Savatingiz bo'sh
            </Typography>
            <Typography variant="body1" gutterBottom>
                Hali hech narsa qo'shilmadi.
                Mahsulotlarni ko'rish uchun davom eting!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')} // Change the route as necessary
                sx={{marginTop: 2}}
            >
                Mahsulotlarni ko'rish
            </Button>
        </Box>
    );
};

export default EmptyBasket;