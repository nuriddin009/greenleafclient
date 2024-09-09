import React, {useEffect} from 'react';
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './home.scss';
import Gallery from "../../components/gallery/index.jsx"; // Ensure this imports the updated styles
import {Flip, Zoom, Bounce, Fade} from "react-reveal";
import About from '../../components/about/index.jsx';
import Partner from "../../components/partner/index.jsx";
import Ourteam from "../../components/ourteam/index.jsx";
import Contact from "../../components/contact/index.jsx";
import AdvantagesSection from "../../components/advantages/AdvantagesSection.jsx";
import MarketingBenefits from "../../components/advantages/MarketingBenifits.jsx";
import {useLocation} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
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

    const {pathname} = useLocation()

    useEffect(() => {

    }, [pathname]);

    const handleDelete = (index) => {
        // Function to handle image delete
        console.log(`Delete image at index: ${index}`);
        // Implement deletion logic here
    };

    return (
        <div className="home">
            <Header/>


            <Fade bottom>
                <div className="swiper-container">
                    <Swiper
                        spaceBetween={10}
                        centeredSlides={true}
                        autoplay={{
                            delay: 100000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {itemData.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative', // For positioning the icons
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    onError={handleImageError} // Error handling for images
                                    className="swiper-image"
                                />

                                {pathname.startsWith('/dashboard') && (
                                    <div className="hover-overlay">
                                        <div className="upload-icon" onClick={() => alert('Upload new image')}>
                                            📤 {/* Replace with your actual upload icon */}
                                        </div>

                                        <div className="delete-icon" onClick={() => handleDelete(index)}>
                                            <IconButton>
                                                <CloseIcon/>
                                            </IconButton> {/* Replace with red close icon */}
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Fade>

            <About/>
            <AdvantagesSection/>
            <Ourteam/>
            <Partner/>
            <MarketingBenefits/>
            <Gallery/>
            <Contact/>

            <Footer/>
        </div>
    );
}

export default Index;
