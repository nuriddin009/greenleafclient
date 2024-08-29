import React from 'react';
import Header from "../../components/header/index.jsx";
import Footer from "../../components/footer/index.jsx";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './home.scss';
import Gallery from "../../components/gallery/index.jsx"; // Ensure this imports the updated styles

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

    return (
        <div className="home">
            <Header />

            {/* Responsive Swiper Section */}
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
                                alignItems: 'center'
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                onError={handleImageError} // Error handling for images
                                className="swiper-image"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Gallery/>

            <Footer />
        </div>
    );
}

export default Index;
