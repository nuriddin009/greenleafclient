import React, {useState} from 'react';
import {Dialog, DialogContent, IconButton, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const YouTubeVideoPlayer = ({videoUrl}) => {
    const [open, setOpen] = useState(false);
    const [ripples, setRipples] = useState([]);

    const getVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^&\n]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = getVideoId(videoUrl);

    const handleClickOpen = (event) => {
        const newRipple = {
            x: event.clientX,
            y: event.clientY,
            id: Date.now(),
        };

        setRipples((prev) => [...prev, newRipple]);
        setOpen(true);

        // Remove the ripple after the animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
        }, 600); // Duration matches the animation duration
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box position="relative" display="inline-block">
            {videoId ? (
                <>
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Video Thumbnail"
                        style={{width: '100%', height: 'auto', display: 'block'}}
                    />
                    <IconButton
                        onClick={handleClickOpen}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '50%',
                            padding: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <PlayCircleOutlineIcon fontSize="large" sx={{
                            fontSize: '3rem'
                        }} color="error"/>
                    </IconButton>
                    {ripples.map((ripple) => (
                        <span
                            key={ripple.id}
                            className="ripple circle"
                            style={{
                                left: ripple.x - 35, // Centering the ripple
                                top: ripple.y - 35, // Centering the ripple
                            }}
                        />
                    ))}
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
                        <CloseIcon sx={{color: 'red'}}/>
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
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default YouTubeVideoPlayer;