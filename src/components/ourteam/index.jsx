import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ourteam.scss'; // Ensure you have your styles here
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Bounce, Fade, Zoom} from 'react-reveal';
import Typography from "@mui/material/Typography";
import instance from "../../utils/instance.js";


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


    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams()
    }, []);

    const getTeams = () => {
        instance('/v1/dashboard/our_team').then(res => {
          setTeams(res.data.data)
        })
    }


    return (
        <div className="team-container" id={'our_team'}>

            <Fade bottom>
                <Typography variant="h4" gutterBottom sx={{
                    fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                    textAlign: 'center'
                }}>
                    Bizning jamoamiz
                </Typography>
            </Fade>

            <Swiper
                key={teams.length}
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
                {teams?.map((member, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            <Fade bottom>
                                <div className="team-member">
                                    <img
                                        src={member?.image?.imageUrl}
                                        alt={member?.name}
                                        className="team-member-image"
                                    />

                                </div>
                            </Fade>

                            <Zoom left>
                                <h3 className="team-member-title">{member?.name}</h3>
                            </Zoom>

                            <Bounce bottom>
                                <p>{member?.profession}</p>
                            </Bounce>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Index;
