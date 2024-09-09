import React, {useEffect, useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useMediaQuery, Button, Typography} from '@mui/material';
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './index.scss';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useNavigate} from "react-router-dom";


const itemData = [
    {img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Breakfast', rows: 2, cols: 2},
    {img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Burger'},
    {img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Camera'},
    {img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'Coffee', cols: 2},
    {img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Hats', cols: 2},
    {img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', title: 'Honey', rows: 2, cols: 2},
    {img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', title: 'Basketball'},
    {img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', title: 'Fern'},
    {img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25', title: 'Mushrooms', rows: 2, cols: 2},
    {img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af', title: 'Tomato basil'},
    {img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1', title: 'Sea star'},
    {img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6', title: 'Bike', cols: 2},
];

const srcset = (image, size, rows = 1, cols = 1) => ({
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
});

const Index = () => {
    useEffect(() => {
        Fancybox.bind('[data-fancybox="gallery"]', {});
        return () => Fancybox.destroy();
    }, []);

    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate()
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        navigate('/gallery')
    };

    // Use media queries to determine the number of columns based on screen size
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:960px)');
    const isLargeScreen = useMediaQuery('(max-width:1280px)');

    // Determine the number of columns for different screen sizes
    const getColumns = () => {
        if (isSmallScreen) return 2;
        if (isMediumScreen) return 4;
        if (isLargeScreen) return 6;
        return 8;
    };

    const getVisibleItems = () => {
        if (isSmallScreen) return 2;
        if (isMediumScreen) return 4;
        return 12;
    };


    return (
        <div className="gallery-container" id={'galleriya'} style={{textAlign: 'center'}}>
            <Typography variant="h4" gutterBottom  sx={{
                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                textAlign: 'center'
            }}>
                Galleriya
            </Typography>
            <ImageList
                sx={{
                    width: '100%', // Maintain 50% width
                    margin: '0 auto', // Center the gallery horizontally
                    gap: 0, // Remove gap between images
                }}
                variant="standard"
                cols={getColumns()} // Responsive columns
            >
                {itemData?.slice(0, getVisibleItems()).map((item) => (
                    <ImageListItem
                        key={item.img}
                        cols={isSmallScreen ? 1 : (item.cols || 1)}
                        rows={isSmallScreen ? 1 : (item.rows || 1)}
                        sx={{margin: 0, padding: 0}} // Remove margin and padding from items
                    >
                        <a href={item.img} data-fancybox="gallery" data-caption={item.title}>
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                                className="gallery-image"
                                style={{
                                    width: '100%', // Ensure images fit their container
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                        </a>
                    </ImageListItem>
                ))}
            </ImageList>
            <Button
                sx={{
                    mt: 2,
                    textTransform: 'none'
                }}
                startIcon={isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                color='success'
                onClick={handleToggle}
                variant={'contained'}>Ko'poq ko'rish</Button>
        </div>
    );
};

export default Index;
