import React, { useEffect, useState } from 'react';
import instance from "../../utils/instance.js";
import { Box, Button, Typography, Grid } from '@mui/material';
import YouTubeVideoPlayer from "../../components/video/YouTubeVideoPlayer.jsx";
import FollowTheSignsOutlinedIcon from "@mui/icons-material/FollowTheSignsOutlined";
import { useNavigate } from "react-router-dom";

export default function VideosPage() {
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        getVideos(0);
    }, []);

    const getVideos = (page) => {
        instance.get('/v1/video', { params: { page, search: '' } })
            .then(res => {
                const { elements, totalElements } = res.data;
                setVideos(prevVideos => {
                    const newVideos = elements.filter(newVideo =>
                        !prevVideos.some(existingVideo => existingVideo.id === newVideo.id)
                    );
                    return [...prevVideos, ...newVideos];
                });

                if (videos.length >= totalElements) {
                    setHasMore(false);
                }
            })
            .catch(error => {
                console.error("Error loading videos:", error);
            });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        getVideos(nextPage);
        setCurrentPage(nextPage);
    };

    return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
                Videolar
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {videos.map(video => (
                    <Grid item xs={12} sm={6} md={4} key={video?.id} display="flex" justifyContent="center">
                        <Box
                            position="relative"
                            overflow="hidden"
                            borderRadius="50%"
                            sx={{
                                width: '250px',
                                height: '250px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <YouTubeVideoPlayer videoUrl={video?.url} description={video?.description} />
                            <div style={{
                                position: 'absolute',
                                top: '8px',
                                left: '8px',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span>{videos.indexOf(video) + 1}</span>
                            </div>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {hasMore && (
                <Button onClick={handleLoadMore} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Yana ko'rsatish
                </Button>
            )}

            <br />
            <Button onClick={() => navigate('/')} style={{ margin: '40px' }} color={'success'} variant='contained'
                    startIcon={<FollowTheSignsOutlinedIcon />}
            >
                Bosh sahifaga chiqish
            </Button>
        </div>
    );
}