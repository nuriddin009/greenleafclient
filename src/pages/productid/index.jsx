import React, {Fragment, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Box, Typography, Button, IconButton, Grid, Paper} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useParams} from "react-router-dom";
import instance from "../../utils/instance.js";
import BottomMenu from "../../components/BottomMenu/index.jsx";
import SuggestionProducts from "../../components/product/SuggestionProducts.jsx";

export default function Index() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [product, setProduct] = useState(null)

    useEffect(() => {
        getProduct()
    }, []);

    const {productId} = useParams()

    const getProduct = () => {
        instance.get(`/v1/product/get?id=${productId}`).then(res => {
            setProduct(res.data)
        })
    }

    return (
        <Fragment>


            <Box sx={{padding: 4, backgroundColor: '#f9f9f9'}}>
                <Grid container spacing={4}>
                    {/* Image and Thumbnails Container */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{display: 'flex'}}>
                            {/* Thumbnails Swiper on the left */}
                            <Box sx={{width: '25%', marginRight: 2, maxHeight: '400px', overflow: 'auto'}}>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    direction="vertical"
                                    loop={false} // Disable infinite loop in thumbnails
                                    spaceBetween={10}
                                    slidesPerView={4} // Limit the number of visible thumbnails
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="thumbSwiper"
                                    style={{height: '100%'}} // Make it full height of the container
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                >
                                    {product?.images?.map((image) => (
                                        <SwiperSlide key={image?.id}>
                                            <img
                                                src={image?.url}
                                                alt={product?.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    border: '1.5px solid'
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>

                            {/* Main Image Swiper */}
                            <Box sx={{width: '75%', position: 'relative', overflow: 'hidden'}}>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#fff',
                                        '--swiper-pagination-color': '#fff',
                                    }}
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{swiper: thumbsSwiper}}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mainSwiper"
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                >
                                    {product?.images?.map((image, index) => (
                                        <SwiperSlide key={image?.id}>
                                            <img
                                                src={image?.url}
                                                alt={product?.name}
                                                style={{
                                                    width: '100%',
                                                    height: '400px',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s ease',
                                                    zIndex: activeIndex === index ? 999 : 1, // Active image on top
                                                    transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)', // Enlarge the active image
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Product Information */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{padding: 3}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="h4">{product?.name}</Typography>
                                <IconButton aria-label="Add to wishlist">
                                    <FavoriteIcon color="error"/>
                                </IconButton>
                            </Box>
                            <Typography variant="h6" color="textSecondary">
                                {product?.category?.name}
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {product?.price?.toLocaleString()} сум
                            </Typography>
                            <Typography variant="body1" dangerouslySetInnerHTML={{__html: product?.description}}/>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                                <Button variant="contained" color="primary">
                                    Добавить в корзину
                                </Button>
                                <Button variant="outlined" color="primary">
                                    Купить в 1 клик
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <br/><br/>

            <SuggestionProducts categoryId={product?.category?.id}/>

            <Box sx={{
                height: {xs: '50px', md: '0'}
            }}></Box>

            <BottomMenu/>
        </Fragment>
    );
}