import React, {useEffect, useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CollectionsIcon from '@mui/icons-material/Collections';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import PreviewIcon from '@mui/icons-material/Visibility';
import "./gallery.scss";
import PreviewDialog from '../../../components/previewImg/PreviewDialog.jsx'
import UploadIcon from '@mui/icons-material/Upload';
import AddImageDialog from "../../../components/dialog/AddImageDialog.jsx";
import instance from "../../../utils/instance.js";

export default function Index() {
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const theme = useTheme();
    const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
    const [addImageDialogOpen, setAddImageDialogOpen] = useState(false);
    const [addImages, setAddImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getGallery(0);
    }, []);

    const getGallery = (page) => {
        instance.get('/v1/gallery', {
            params: {page}
        }).then(res => {
            const {data, totalPages} = res.data;
            console.log(data)
            setImages(prevImages => {
                const newImages = data.filter(newImage => !prevImages.some(existingImage => existingImage.id === newImage.id));
                return [...prevImages, ...newImages];
            });

            // Check if there are more pages to load
            if (page + 1 >= totalPages) {
                setHasMore(false);
            }
        }).catch(error => {
            console.error("Error loading gallery:", error);
        });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        getGallery(nextPage); // Load the next page
        setCurrentPage(nextPage); // Update the current page
    };


    const handleOpenDialog = () => setAddImageDialogOpen(true);
    const handleCloseDialog = () => setAddImageDialogOpen(false);
    const handleAddImage = (newImage) => {
        let formData = new FormData();
        formData.append("description", newImage?.description);
        formData.append("file", newImage?.file);

        instance.post('/v1/gallery', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            setImages(prevImages => [res.data, ...prevImages]);
        }).catch(error => {
            console.error("Error adding image:", error);
        });

        setAddImages([newImage, ...addImages]);
    };


    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    const cols = isXs ? 1 : isSm ? 2 : isMd ?  6: 4; // Adjust columns based on screen size

    const handleOpenPreviewDialog = (image) => {
        setOpenPreviewDialog(true);
        setSelectedImage(image);
    };

    const handleClickOpenRemoveDialog = (img) => {
        setSelectedImage(img);
        setOpenRemoveDialog(true);
    };

    const handleCloseRemoveDialog = () => {
        setOpenRemoveDialog(false);
        setSelectedImage(null);

    };

    const handleRemoveImage = () => {
        if (!selectedImage) return;
        instance.delete('/v1/gallery', {params: {id: selectedImage?.id}})
            .then((response) => {
                setImages((prevImages) => prevImages.filter((img) => img?.id !== selectedImage?.id));
                handleCloseRemoveDialog();
            })
            .catch((error) => {
                console.error('Failed to delete image:', error);
            });
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index);
    };

    const handleDrop = (e, toIndex) => {
        e.preventDefault();
        const fromIndex = e.dataTransfer.getData("text/plain");

        if (fromIndex !== toIndex) {
            const draggedImage = images[fromIndex];
            const newImages = [...images];
            newImages.splice(fromIndex, 1);
            newImages.splice(toIndex, 0, draggedImage);
            setImages(newImages);

            instance.post('/v1/gallery/reorder', {
                ids: newImages.map(img => img.id)
            }).catch(error => {
                console.error("Failed to update image order:", error);
                // Optionally revert state change on failure
            });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className={'gallery'}>
            <Button
                variant='text'
                size='large'
                color='success'
                startIcon={<CollectionsIcon/>}
            >
                Galleriya
            </Button>

            <ImageList
                sx={{
                    width: '100%',
                    height: 'auto',
                    gap: '16px'
                }}
                cols={cols}
                rowHeight='auto'
            >
                <ImageListItem
                    sx={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0,0,1,0.8)',
                        '&:hover .preview-overlay': {
                            opacity: 1
                        }
                    }}
                >
                    <Button onClick={handleOpenDialog}>
                        <UploadIcon sx={{color: '#fff', fontSize: '30px'}}/>
                    </Button>
                </ImageListItem>

                {images.map((item, index) => (
                    <ImageListItem
                        key={item?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        sx={{
                            position: 'relative',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            '&:hover .preview-overlay': {
                                opacity: 1
                            }
                        }}
                    >
                        <div className="preview-overlay">
                            <Button
                                sx={{color: '#fff'}}
                                onClick={() => handleOpenPreviewDialog(item)}
                                startIcon={<PreviewIcon sx={{color: '#fff'}}/>}
                            >
                                {"Ko'rish"}
                            </Button>
                        </div>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                            disableRipple
                        >
                            <Typography variant="body2" sx={{color: 'white'}}>
                                {index + 1}
                            </Typography>
                        </IconButton>

                        <img
                            srcSet={`${item?.attachment?.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item?.attachment?.url}?w=164&h=164&fit=crop&auto=format`}
                            alt={item?.id}
                            loading="lazy"
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%'
                            }}
                        />

                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                            onClick={() => handleClickOpenRemoveDialog(item)}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </ImageListItem>
                ))}
            </ImageList>

            {hasMore && (
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleLoadMore}
                    sx={{mt: 2}}
                >
                    Load More
                </Button>
            )}

            <Dialog
                open={openRemoveDialog}
                onClose={handleCloseRemoveDialog}
            >
                <DialogTitle>{"O'chirishni tasdiqlang"}</DialogTitle>
                <DialogContent>
                    {"Haqiqatan ham bu rasmni o'chirmoqchimisiz ?"}
                    {selectedImage && (
                        <img
                            src={selectedImage?.attachment?.url}
                            alt="Selected"
                            style={{
                                width: '100%',
                                maxHeight: '200px',
                                objectFit: 'contain',
                                marginTop: '10px'
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRemoveDialog} color="primary">
                        bekor qilish
                    </Button>
                    <Button onClick={handleRemoveImage} color="secondary" autoFocus>
                        {"o'chirish"}
                    </Button>
                </DialogActions>
            </Dialog>

            <PreviewDialog
                open={openPreviewDialog}
                onClose={() => setOpenPreviewDialog(false)}
                image={selectedImage}
            />

            <AddImageDialog
                addImageDialogOpen={addImageDialogOpen}
                onClose={handleCloseDialog}
                onAddImage={handleAddImage}
            />
        </div>
    );
}

