import React, {useEffect, useState} from 'react';
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './home.scss';
import Gallery from "../../components/gallery/index.jsx"; // Ensure this imports the updated styles
import {Fade} from "react-reveal";
import About from '../../components/about/index.jsx';
import Partner from "../../components/partner/index.jsx";
import Ourteam from "../../components/ourteam/index.jsx";
import Contact from "../../components/contact/index.jsx";
import AdvantagesSection from "../../components/advantages/AdvantagesSection.jsx";
import MarketingBenefits from "../../components/advantages/MarketingBenifits.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Box, Button, Typography} from "@mui/material";
import instance from "../../utils/instance.js";
import Video from "../../components/video/index.jsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SuggestionProducts from "../../components/product/SuggestionProducts.jsx";
import {useDispatch} from "react-redux";
import {setMenuOpen} from '../../features/categorySlice';

const itemData = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        id: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    }
];

function Index() {
    // Ensure images are loaded correctly
    const handleImageError = (event) => {
        event.target.src = 'default-image-path.png'; // Fallback image path if image fails to load
    };
    const theme = useTheme()

    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    const {pathname} = useLocation()

    useEffect(() => {

    }, [pathname]);

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [slideImages, setSlideImages] = useState([])
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        getSlider()
        getCategories();
    }, []);


    const getCategories = () => {
        instance('/v1/category').then(res => {
            setCategories(res.data.elements);
        });
    };


    const getSlider = () => {
        instance('/v1/dashboard/slider').then(res => {
            if (res.data.data.length === 0) {
                setSlideImages(itemData)
            } else {
                setSlideImages(res.data.data)
            }
        })
    }


    const dispatch = useDispatch();


    const handleClick = () => {
        dispatch(setMenuOpen());
    };


    const navigate = useNavigate()


    return (
        <>
            <div className="home">

                <Header/>

                <div style={{
                    height: !scroll && isMd ? '50px' : 0
                }}/>

                <Box
                    display={{xs: 'none', md: 'flex'}}
                    sx={{boxSizing: 'border-box', width: '100%', paddingTop: '20px'}}>
                    {/* Categories List */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',          // Ensures wrapping on smaller screens
                            gap: '20px',               // Spacing between categories
                            justifyContent: 'center',  // Center the categories on larger screens
                            width: '100%',             // Full width for responsive behavior
                        }}
                    >
                        {categories.map((category) => (
                            <Button
                                key={category?.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    gap: '0.5rem',
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                    color: '#000'
                                }}
                                onClick={() => navigate(`/category/${category?.id}`)}
                            >
                                {/* Category Image */}

                                <img
                                    src={category?.image}
                                    alt={category?.name}
                                    width={25}     // Fixed width for smaller image
                                    height={25}    // Fixed height for smaller image
                                    style={{objectFit: 'contain'}}
                                />
                                {/* Category Name */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: {xs: '12px', sm: '14px', md: '16px'}, // Responsive text size
                                        marginTop: '5px', // Space between image and text
                                    }}
                                >
                                    {category?.name}
                                </Typography>
                            </Button>
                        ))}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Button sx={{color: '#000'}} startIcon={<KeyboardArrowDownIcon/>}
                                    onClick={handleClick}
                            >Yana</Button>
                        </Box>
                    </Box>
                </Box>

                <Fade bottom>
                    <div className="swiper-container">
                        <Swiper
                            key={slideImages.length}  // Force Swiper to reinitialize when slideImages updates
                            spaceBetween={10}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            pagination={{clickable: true}}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {slideImages.map((item, index) => (
                                <SwiperSlide
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    <img
                                        src={item?.imageUrl}
                                        alt={item?.id}
                                        onError={handleImageError}
                                        className="swiper-image"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Fade>


                <SuggestionProducts/>
                <br/>
                <About/>
                <br/>
                <AdvantagesSection/>
                <Ourteam/>
                <Partner/>
                <MarketingBenefits/>
                <Gallery/>
                <Video/>
                <Contact/>


            </div>
            <Footer/>
            <Box sx={{
                height: {xs: '25px', md: '0'}
            }}></Box>
        </>
    );
}

export default Index;
