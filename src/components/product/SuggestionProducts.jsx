import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard.jsx';
import {Box, Button, Typography} from '@mui/material';
import instance from '../../utils/instance';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useNavigate} from "react-router-dom";

function SuggestionProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        instance('/v1/product').then(res => {
            setProducts(res.data.elements);
        });
    };

    const navigate = useNavigate()


    return (
        <Box
            sx={{
                maxWidth: '1300px',
                margin: '0 auto',
                padding: '16px',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    marginBottom: '16px',
                    textAlign: 'left',
                    fontWeight: 'bold',
                }}
            >
                Tavsiyalar <KeyboardArrowRightIcon/>
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}
            >
                {products.map((product, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: '1 1 calc(50% - 16px)', // 2 cards per row on mobile starting from 520px
                            '@media (min-width: 520px)': {
                                flex: '1 1 calc(50% - 16px)', // 2 cards per row for screens >= 520px
                            },
                            '@media (min-width: 768px)': {
                                flex: '1 1 calc(33.33% - 16px)', // 3 cards per row on tablets
                            },
                            '@media (min-width: 1200px)': {
                                flex: '1 1 calc(25% - 16px)', // 4 cards per row on larger screens
                            },
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <ProductCard product={product}/>
                    </Box>
                ))}
            </Box>

            <Button
                sx={{
                    display: 'block',
                    width: '50%',
                    mt: 2,
                    ml: 'auto',
                    mr: 'auto',
                    height: {md: '50px', xs: '40px'},
                }}
                color="success"
                variant="outlined"
                onClick={() => navigate('/suggestion')}
            >
                Yana ko'rsatish
            </Button>
        </Box>
    );
}

export default SuggestionProducts;