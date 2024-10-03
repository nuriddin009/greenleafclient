import React, {useEffect, useState} from 'react';
import instance from "../../utils/instance.js"; // Assuming this is your API instance

import {Box, Button, Typography} from '@mui/material';
import YouTubeVideoPlayer from "../../components/video/YouTubeVideoPlayer.jsx";
import FollowTheSignsOutlinedIcon from "@mui/icons-material/FollowTheSignsOutlined";
import {useNavigate} from "react-router-dom";

export default function VideosPage() {
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        getVideos(0); // Fetch initial data
    }, []);

    const getVideos = (page) => {
        instance.get('/v1/video', {params: {page, search: ''}}) // Adjust the endpoint as needed
            .then(res => {
                const {elements, totalElements} = res.data; // Use your structure here
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
        <div style={{textAlign: 'center', padding: '16px'}}>
            <Typography variant="h4" gutterBottom>
                Videolar
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                {videos.map(video => (
                    <Box key={video.id} width="200px" height="200px" position="relative" overflow="hidden"
                         borderRadius="8px">
                        <YouTubeVideoPlayer videoUrl={video.url}/>
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
                ))}
            </Box>

            {hasMore && (
                <Button onClick={handleLoadMore} variant="contained" color="primary" style={{marginTop: '20px'}}>
                    Yana ko'rsatish
                </Button>
            )}

            <br/>
            <Button onClick={() => navigate('/')} style={{margin: '40px'}} color={'success'} variant='contained'
                    startIcon={<FollowTheSignsOutlinedIcon/>}
            >
                Bosh sahifaga chiqish
            </Button>
        </div>
    );
}