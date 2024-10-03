import React, {useEffect, useState} from 'react';
import {Button, Typography, useMediaQuery} from '@mui/material';
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './index.scss';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useNavigate} from "react-router-dom";
import instance from "../../utils/instance.js";

const Index = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (images.length > 0) {
            Fancybox.bind('[data-fancybox="gallery"]', {});
        }
        return () => Fancybox.destroy();
    }, [images]);

    useEffect(() => {
        instance.get('/v1/gallery', {params: {page: 0}})
            .then((response) => {
                const fetchedData = response.data.data.map(item => ({
                    img: item?.attachment?.url,
                    description: item?.description,
                    imgOrder: item?.imgOrder,
                }));
                setImages(fetchedData);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    }, []);

    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        navigate('/gallery');
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
        return 6; // Default to 6 columns for larger screens
    };

    const getVisibleItems = () => {
        if (isSmallScreen) return 2;
        if (isMediumScreen) return 4;
        return 12;
    };


    return (
        <div className="gallery-container" id={'galleriya'} style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        }}>
            <Typography variant="h4" gutterBottom sx={{
                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                textAlign: 'center'
            }}>
                Galleriya
            </Typography>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                        gap: '8px',
                        maxWidth: '1280px',
                        width: '100%',
                        margin: '0 auto',
                        gridAutoRows: '1fr', // Ensures the grid items grow to fill the available space
                    }}
                >
                    {images.slice(0, getVisibleItems()).map((item, index) => (
                        <div key={index} style={{position: 'relative', paddingBottom: '100%', overflow: 'hidden'}}>
                            <a href={item.img} data-fancybox="gallery"
                               data-caption={item.description}>
                                <img
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    alt={item.description}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                sx={{
                    mt: 2,
                }}
                startIcon={isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                color='success'
                onClick={handleToggle}
                variant={'contained'}
            >
                Ko'poq ko'rish
            </Button>
        </div>
    );
};

export default Index;