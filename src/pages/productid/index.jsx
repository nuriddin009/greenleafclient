import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box, Typography, Button, IconButton, Grid, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Index() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const product = {
        id: "6a25e561-368b-449f-9ac2-ff6620253b0e",
        name: "Burger",
        category: {
            id: "4b75f6ed-7861-4bb3-bb83-8b2075af1046",
            name: "Oyoq kiyimlar",
            description: "asasd",
            image: "http://localhost:9000/muhtabargreenleaf/public/264c2b35-e154-42a8-b4ba-cff781c4cf77.png",
        },
        price: 187000,
        description: "<p>adsdaasda</p>",
        images: [
            {
                id: "74225d69-62ef-4e85-b207-afaef549fc8a",
                url: "http://localhost:9000/muhtabargreenleaf/public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
                objectName: "public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
            },{
                id: "74225d69-62ef-4e85-b207-afaef549fc8a",
                url: "http://localhost:9000/muhtabargreenleaf/public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
                objectName: "public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
            },{
                id: "74225d69-62ef-4e85-b207-afaef549fc8a",
                url: "http://localhost:9000/muhtabargreenleaf/public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
                objectName: "public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
            },{
                id: "74225d69-62ef-4e85-b207-afaef549fc8a",
                url: "http://localhost:9000/muhtabargreenleaf/public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
                objectName: "public/a36094df-e5eb-4b0a-8e48-324f84056271.jpeg",
            },
            {
                id: "b07a9059-3e29-4416-8fc6-d0b07b172fb9",
                url: "http://localhost:9000/muhtabargreenleaf/public/aa435841-11c9-46da-8b18-3284dcd8c129.png",
                objectName: "public/aa435841-11c9-46da-8b18-3284dcd8c129.png",
            },
        ],
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f9f9f9' }}>
            <Grid container spacing={4}>
                {/* Image and Thumbnails Container */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                        {/* Thumbnails Swiper on the left */}
                        <Box sx={{ width: '25%', marginRight: 2, maxHeight: '400px', overflow: 'auto' }}>
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
                                style={{ height: '100%' }} // Make it full height of the container
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            >
                                {product.images.map((image) => (
                                    <SwiperSlide key={image.id}>
                                        <img
                                            src={image.url}
                                            alt={product.name}
                                            style={{
                                                width: '100%',
                                                height: '100px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>

                        {/* Main Image Swiper */}
                        <Box sx={{ width: '75%', position: 'relative', overflow: 'hidden' }}>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mainSwiper"
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            >
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={image.id}>
                                        <img
                                            src={image.url}
                                            alt={product.name}
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
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4">{product.name}</Typography>
                            <IconButton aria-label="Add to wishlist">
                                <FavoriteIcon color="error" />
                            </IconButton>
                        </Box>
                        <Typography variant="h6" color="textSecondary">
                            {product.category.name}
                        </Typography>
                        <Typography variant="h5" color="primary">
                            {product.price.toLocaleString()} сум
                        </Typography>
                        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: product.description }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
    );
}