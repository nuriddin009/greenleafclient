import React, {useEffect, useState} from 'react';
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import {Button, DialogContentText, TextField} from '@mui/material';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import uploadImg from '../../../assets/uploadImg.png';
import ReactQuill from 'react-quill';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {Controller, useForm} from "react-hook-form";
import instance from "../../../utils/instance.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import FollowTheSignsOutlinedIcon from '@mui/icons-material/FollowTheSignsOutlined';
import PhoneInputs from "./PhoneInputs.jsx";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import OurTeam from "./OurTeam.jsx";

const Accordion = styled((props) => (<MuiAccordion disableGutters elevation={0} square {...props} />))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`, '&:not(:last-child)': {
        borderBottom: 0,
    }, '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (<MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
    {...props}
/>))(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    }, ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2), borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const prefixUrl = '/v1/dashboard';

const Index = () => {
    const [expanded, setExpanded] = useState('');
    const [images, setImages] = useState(itemData);

    const [aboutImage, setAboutImage] = useState(null)
    const [hasAbout, setHasAbout] = useState(false)
    const [hasPartner, setHasPartner] = useState(false)

    useEffect(() => {
        // getPartner()
    }, []);

    const navigate = useNavigate()


    const {
        handleSubmit: aboutHandleSubmit, control: aboutControl, reset: aboutReset
    } = useForm({
        defaultValues: {
            descriptionP1: '', descriptionP2: '',
        },
    });

    const {handleSubmit: partnerHandleSubmit, control: partnerControl, reset: partnerReset}
        = useForm({
        defaultValues: {
            descriptionP1: '',
            descriptionP2: '',
            videoLink: '',
        },
    });


    const [sliderImages, setSliderImages] = useState([])

    const getSliderImages = () => {
        instance.get(`${prefixUrl}/slider`).then(res => {
            console.log(res.data)
            setSliderImages(res.data.data)
        })
    }

    const handleSlideImage = (e) => {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);

        instance.post(`${prefixUrl}/slider`, formData).then(res => {
            console.log(res.data);

            // Ensure prevImages is an array before appending the new image
            setSliderImages((prevImages) => Array.isArray(prevImages) ? [res.data, ...prevImages] : [res.data]);
        }).catch(error => {
            console.error('Image upload failed:', error);
        });
    };

    const [selectedImage, setSelectedImage] = useState(null); // Image to be deleted
    const [openDialog, setOpenDialog] = useState(false); // Dialog state

    const handleRemoveImage = (img) => {
        setSelectedImage(img); // Set the image to be deleted
        setOpenDialog(true);   // Open the confirmation dialog
    };

    const confirmDeleteImage = () => {
        // Perform the image deletion logic
        setSliderImages(sliderImages.filter((image) => image.id !== selectedImage.id)); // Remove the image
        setOpenDialog(false);  // Close the dialog after deletion
        setSelectedImage(null); // Reset the selected image

        instance.delete(`${prefixUrl}/slider`, {params: {id: selectedImage.id}}).then(res => {
            console.log(res.data)
        })
    };

    const cancelDeleteImage = () => {
        setOpenDialog(false);  // Close the dialog without deleting
        setSelectedImage(null); // Reset the selected image
    };


    const getAbout = () => {
        instance(`${prefixUrl}/about`).then(res => {
            if (res.data.success) {
                let dashAbout = res.data.data;
                aboutReset({
                    descriptionP1: dashAbout?.descriptionP1, descriptionP2: dashAbout?.descriptionP2
                })
                setAboutImage({
                    url: dashAbout?.imageUrl, file: null
                })
                setHasAbout(true)
            } else {
                setHasAbout(false)
            }

        })
    }

    const onSubmitAbout = (data) => {
        let formData = new FormData();
        if (aboutImage?.file) {
            formData.append('file', aboutImage?.file);
        }
        formData.append('descriptionP1', data.descriptionP1);
        formData.append('descriptionP2', data.descriptionP2);

        if (hasAbout) {
            console.log('bor')
            instance.put(`${prefixUrl}/about`, formData).then(res => {
                console.log(res.data)
                setHasAbout(true)
                setAboutImage(null)
                getAbout()
                toast.success("O'zgartirildi...")
            })
        } else {
            if (aboutImage) {
                instance.post(`${prefixUrl}/about`, formData).then(res => {
                    setHasAbout(true)
                    setAboutImage(null)
                    getAbout()
                    toast.success("Saqlandi")
                })
            } else alert("Rasm kiriting!!!")
        }
    };




    // partner

    const getPartner = () => {
        instance(`${prefixUrl}/partner`).then(res => {
            if (res.data.success) {
                let partnerData = res.data.data
                partnerReset({
                    descriptionP1: partnerData?.descriptionP1,
                    descriptionP2: partnerData?.descriptionP2,
                    videoLink: partnerData?.videoLink
                })
                setHasPartner(true)
            } else {
                setHasPartner(false)
            }
        })
    }


    const onSubmitPartner = (data) => {
        console.log(data);
        if (hasPartner) {
            instance.put(`${prefixUrl}/partner`, data).then(res => {
                toast.success("O'zgartirildi...")
                setHasPartner(true)
            })
        } else {
            instance.post(`${prefixUrl}/partner`, data).then(res => {
                setHasPartner(true)
                toast.success("Saqlandi...")
            })
        }
    };


    // panels
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        if (newExpanded) {
            switch (panel) {
                case 'panel1':
                    getSliderImages()
                    break;
                case 'panel2':
                    getAbout()
                    break;
                case 'panel3':

                    break;
                case 'panel4':
                    getPartner()
                    break;
                case 'panel5':
                    // getContact()
                    break;
            }
        }
    };

    function handleAboutImage(e) {
        setAboutImage({
            url: URL.createObjectURL(e.target.files[0]), file: e.target.files[0]
        })
    }

    const isLargeScreen = useMediaQuery('(min-width:1200px)');
    const isMediumScreen = useMediaQuery('(min-width:900px)');
    const isSmallScreen = useMediaQuery('(min-width:600px)');

    let cols = 1;
    if (isLargeScreen) {
        cols = 4;
    } else if (isMediumScreen) {
        cols = 3;
    } else if (isSmallScreen) {
        cols = 2;
    }

    return (<div className='dashboard w-full'>
        <Button
            variant='text'
            size='large'
            color='success'
            startIcon={<DashboardCustomizeIcon/>}
        >Dashboard</Button>

        {/*Slide*/}

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Slayd</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <h2 className="text-center">Slayd</h2>


                <ImageList
                    sx={{width: '100%', margin: '0 auto'}}
                    cols={cols}
                    gap={16} // Add space between rows and columns
                >
                    <ImageListItem>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '2px solid'
                        }}>
                            <label>
                                <img
                                    src={uploadImg}
                                    alt="gallery item"
                                    loading="lazy"
                                    width={200}
                                    height={200}
                                    style={{
                                        borderRadius: '4px', marginBottom: '1rem',
                                    }}
                                />

                                <input
                                    type="file"
                                    onChange={handleSlideImage}
                                    style={{
                                        display: 'none'
                                    }}
                                    accept={'image/*'}
                                />
                            </label>
                        </div>
                    </ImageListItem>
                    {sliderImages?.map((img) => (
                        <ImageListItem key={img?.id} style={{position: 'relative'}}>
                            <img
                                srcSet={`${img?.imageUrl}`}
                                src={`${img?.imageUrl}`}
                                alt="gallery item"
                                loading="lazy"
                                style={{borderRadius: '4px', marginBottom: '1rem'}}
                            />
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemoveImage(img)}
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '50%',
                                }}
                            >
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </ImageListItem>
                    ))}
                </ImageList>

                {/* Confirm Delete Dialog */}
                <Dialog open={openDialog} onClose={cancelDeleteImage}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this image? This action cannot be undone.
                        </DialogContentText>

                        <img
                            width={200}
                            height={100}
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                marginTop: '10px'
                            }}
                            src={selectedImage?.imageUrl} alt=""/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancelDeleteImage} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDeleteImage} color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </AccordionDetails>
        </Accordion>


        {/*Kampaniya haqida*/}

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Typography>Kompaniya haqida</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <h2 className={'text-center'}>Kampaniya haqida</h2>

                <label style={{
                    width: '100%',
                }}>
                    {aboutImage ? <img
                        width={150}
                        height={150}
                        style={{display: 'block', margin: '0 auto'}}
                        src={aboutImage?.url}
                        alt="aboutImage"
                    /> : <img
                        src={uploadImg}
                        alt="upload"
                        width={150}
                        height={150}
                        style={{display: 'block', margin: '0 auto'}}
                    />}

                    <input
                        type="file"
                        style={{display: 'none'}}
                        accept={"image/*"}
                        onChange={handleAboutImage}
                    />

                </label>

                <hr/>

                <form onSubmit={aboutHandleSubmit(onSubmitAbout)}>
                    <Controller
                        name="descriptionP1"
                        control={aboutControl}
                        render={({field}) => (<ReactQuill
                            {...field}
                            theme="snow"
                            placeholder="Kampaniya haqida malumot kiriting..."
                            modules={quillModules}
                        />)}
                    />
                    <br/>
                    <Controller
                        name="descriptionP2"
                        control={aboutControl}
                        render={({field}) => (<ReactQuill
                            {...field}
                            theme="snow"
                            placeholder="Davomi..."
                            modules={quillModules}
                        />)}
                    />
                    <hr/>
                    <Button type="submit" variant="contained" fullWidth>
                        Saqlash
                    </Button>
                </form>

            </AccordionDetails>
        </Accordion>

        {/*Bizning jamoa*/}

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>Bizning jamoa</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <h2 className="text-center">Bizning jamoa</h2>

                {expanded==='panel3' && <OurTeam/>}

            </AccordionDetails>
        </Accordion>


        {/*Hamkor bo'lish*/}

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                <Typography>Hamkor bo'lish</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <h2 className={'text-center'}>Hamkor bo'lish</h2>

                <form onSubmit={partnerHandleSubmit(onSubmitPartner)}>
                    {/* First ReactQuill Editor */}
                    <Controller
                        name="descriptionP1"
                        control={partnerControl}
                        render={({field}) => (
                            <ReactQuill
                                {...field}
                                theme="snow"
                                modules={{toolbar: true}} // Customize quill modules if needed
                                placeholder="Hamkor bo'lish haqida malumot kiriting..."
                            />
                        )}
                    />
                    <br/>

                    {/* Second ReactQuill Editor */}
                    <Controller
                        name="descriptionP2"
                        control={partnerControl}
                        render={({field}) => (
                            <ReactQuill
                                {...field}
                                theme="snow"
                                modules={{toolbar: true}} // Customize quill modules if needed
                                placeholder="Davomi..."
                            />
                        )}
                    />
                    <br/>

                    {/* TextField for Video Link */}
                    <Controller
                        name="videoLink"
                        control={partnerControl}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Video link"
                                fullWidth
                            />
                        )}
                    />
                    <hr/>

                    {/* Save Button */}
                    <Button variant="contained" fullWidth type="submit">
                        saqlash
                    </Button>

                </form>

            </AccordionDetails>
        </Accordion>

        {/*Biz bilan bog'lanish*/}

        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                <Typography>Biz bilan bog'lanish</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <h2 className="text-center">Biz bilan bog'lanish</h2>

                {expanded === 'panel5' && <PhoneInputs/>}

            </AccordionDetails>
        </Accordion>


        <br/><br/>
        <hr/>

        <Button
            startIcon={<FollowTheSignsOutlinedIcon/>}
            variant={'contained'}
            onClick={() => navigate('/')}
        >Bosh sahifaga chiqish</Button>
    </div>);
};

const quillModules = {
    toolbar: [[{'header': '1'}, {'header': '2'}, {'header': '3'}, {'header': '4'}, {'font': []}], [{'list': 'ordered'}, {'list': 'bullet'}], ['bold', 'italic', 'underline'], [{'color': []}, {'background': []}], [{'align': []}], ['link'], ['clean']],
};


const itemData = ['https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25', 'https://images.unsplash.com/photo-1567306301408-9b74779a11af', 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1', 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',];

export default Index;
