import React from 'react';
import {Grid, Typography, Box} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportIcon from '@mui/icons-material/Support';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReplayIcon from '@mui/icons-material/Replay';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import {Fade} from "react-reveal";

const advantages = [
    {
        icon: <LocalShippingIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Bepul yetkazib berish',
        description: 'Mahsulot narxi 990 000 so‘mdan oshganda',
    },
    {
        icon: <PaymentIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Xavfsiz to‘lovlar',
        description: '100% xavfsizlik',
    },
    {
        icon: <SupportIcon style={{fontSize: 40, color: 'green'}}/>,
        title: '24/7 qo‘llab-quvvatlash',
        description: 'Doimiy qo‘llab-quvvatlash',
    },
    {
        icon: <AccessTimeIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Erkin jadval',
        description: 'Biznesni qulay vaqtda yuriting!',
    },
    {
        icon: <ReplayIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Mablag‘ qaytarish kafolati',
        description: 'Mahsulot nuqsoni topilsa qaytarish mumkin',
    },
    {
        icon: <DirectionsBoatIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Kompaniya hisobidan dam olish',
        description: 'Yiliga bir necha marta bepul sayohat qiling!',
    },
    {
        icon: <DirectionsCarIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Sovg‘a sifatida avtomobil',
        description: 'Mashina yutib oling yoki kupon bilan pul oling',
    },
    {
        icon: <HomeIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Uy mulkiga ega bo‘ling',
        description: 'Bonus sifatida ko‘chmas mulkga ega bo‘ling',
    },
];

const AdvantagesSection = () => {
    return (
        <Box sx={{
            padding: '40px 0',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1300px',
            margin: '0 auto'
        }}>
            <Fade bottom>
                <Typography variant="h5" gutterBottom
                            sx={{
                                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                                textAlign: 'center'
                            }}
                >
                    GreenLeaf bilan biznesning afzalliklari
                </Typography>
            </Fade>

            <Grid container spacing={4} justifyContent="center">
                {advantages.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box>
                            <Fade top>
                                {item.icon}
                                <Typography variant="h6" gutterBottom>
                                    {item.title}
                                </Typography>
                            </Fade>

                            <Fade bottom>
                                <Typography variant="body2">{item.description}</Typography>
                            </Fade>

                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdvantagesSection;
