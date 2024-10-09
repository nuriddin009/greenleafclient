import React, { useState } from 'react';
import {Dialog, DialogContent, IconButton, Box, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayButton from "../PlayButton/index.jsx";

const YouTubeVideoPlayer = ({ videoUrl ,description}) => {
    const [open, setOpen] = useState(false);

    const getVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^&\n]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getVideoId(videoUrl);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            position="relative"
            display="inline-block"
            width="300px"  // Set equal width and height for a perfect circle
            height="300px"
            overflow="hidden"
            borderRadius="50%" // Make it a circle
        >
            {videoId ? (
                <>
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Video Thumbnail"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <IconButton
                        onClick={handleClickOpen}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                            // backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            borderRadius: '50%',
                            padding: 2,
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                            transition: 'box-shadow 0.3s',
                            '&:hover': {
                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <PlayButton />
                    </IconButton>
                </>
            ) : (
                <p>Invalid video URL</p>
            )}

            <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
                <DialogContent>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: 1,
                            boxShadow: 2,
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <CloseIcon sx={{ color: 'red' }} />
                    </IconButton>
                    {videoId ? (
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>Invalid video URL</p>
                    )}

                    <Typography component={'h5'}>
                        {description}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default YouTubeVideoPlayer;