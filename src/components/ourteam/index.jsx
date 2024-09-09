import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ourteam.scss'; // Ensure you have your styles here
import {Pagination, Navigation, Autoplay} from 'swiper/modules';
import Groups2Icon from '@mui/icons-material/Groups2';
import {Fade, Zoom} from 'react-reveal';
import Typography from "@mui/material/Typography";

const teamData = [
    {
        img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
        title: 'Software Engineer',
    },
    {
        img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
        title: 'Product Manager',
    },
    {
        img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4',
        title: 'Designer',
    },
    {
        img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        title: 'Marketing Specialist',
    },
];

const Index = () => {
    return (
        <div className="team-container" id={'our_team'}>

            <Typography variant="h4" gutterBottom sx={{
                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                textAlign: 'center'
            }}>
                Bizning jamoamiz
            </Typography>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="team-swiper"
            >
                {teamData.map((member, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            <div className="team-member">
                                <img
                                    src={member.img}
                                    alt={member.title}
                                    className="team-member-image"
                                />

                            </div>
                            <h3 className="team-member-title">{member.title}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Index;
