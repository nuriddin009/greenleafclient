import React, {useEffect, useState} from 'react';
import instance from "../../utils/instance.js";
import {useNavigate} from "react-router-dom";
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {Box, Button} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import FollowTheSignsOutlinedIcon from "@mui/icons-material/FollowTheSignsOutlined";

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getGallery(0);
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            Fancybox.bind('[data-fancybox="gallery"]', {});
        }
        return () => Fancybox.destroy();
    }, [images]);

    const getGallery = (page) => {
        instance.get('/v1/gallery', {params: {page}})
            .then(res => {
                const {data, totalPages} = res.data;
                setImages(prevImages => {
                    const newImages = data.filter(newImage => !prevImages.some(existingImage => existingImage.id === newImage.id));
                    return [...prevImages, ...newImages];
                });

                if (page + 1 >= totalPages) {
                    setHasMore(false);
                }
            })
            .catch(error => {
                console.error("Error loading gallery:", error);
            });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        getGallery(nextPage);
        setCurrentPage(nextPage);
    };

    return (
        <div style={{textAlign: 'center', padding: '16px'}}>
            <Button
                variant='text'
                size='large'
                color='success'
                startIcon={<CollectionsIcon/>}
            >
                Galleriya
            </Button>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
            }}>
                {images.map((item) => (
                    <div key={item?.id} style={{
                        width: '164px',
                        height: '164px',
                        position: 'relative',
                        // overflow: 'hidden',
                        borderRadius: '8px'
                    }}>
                        <a href={item?.attachment?.url} data-fancybox="gallery" data-caption={item?.description}>
                            <img
                                src={`${item?.attachment?.url}?w=164&h=164&fit=crop&auto=format`}
                                alt={item?.id}
                                loading="lazy"
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </a>
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
                            justifyContent: 'center',
                        }}>
                            <span>{images.indexOf(item) + 1}</span>
                        </div>
                    </div>
                ))}
            </div>

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