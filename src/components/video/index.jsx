import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import instance from "../../utils/instance.js";
import YouTubeVideoPlayer from "./YouTubeVideoPlayer.jsx";
import {Box, Grid, Typography, Button, useMediaQuery} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Index(props) {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = () => {
        instance('/v1/video', {params: {page: 0, search: ''}}).then(res => {
            setVideos(res.data.elements);
        });
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:960px)');
    const isLargeScreen = useMediaQuery('(max-width:1280px)');

    const getVisibleItems = () => {
        if (isSmallScreen) return 2;
        if (isMediumScreen) return 4;
        return 6;
    };


    // Render the component only if there are videos
    if (!videos.length) {
        return null; // Don't render anything if there are no videos
    }


    return (
        <div style={{
            maxWidth: '1300px',
            margin: '0 auto'
        }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                    textAlign: 'center',
                    mt: 3
                }}
            >
                Videolar
            </Typography>
            <Box sx={{marginTop: 3, padding: 3}}>
                <Grid container spacing={4} justifyContent="center">
                    {videos.slice(0, getVisibleItems()).map((video, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box display="flex" justifyContent="center">
                                <YouTubeVideoPlayer videoUrl={video?.url} description={video?.description}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{textAlign: 'center', mt: 4}}>
                <Button
                    variant="contained"
                    color='success'
                    startIcon={<ExpandMoreIcon/>}
                    onClick={() => navigate('/videos')} // Navigate to /videos
                    sx={{
                        fontSize: {xs: '0.5rem', sm: '0.9rem'},
                    }}
                >
                    Hammasini ko'rish
                </Button>
            </Box>
        </div>
    );
}

export default Index;