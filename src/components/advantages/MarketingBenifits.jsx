import React from 'react';
import {Grid, Typography, Box} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SyncIcon from '@mui/icons-material/Sync';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const features = [
    {
        icon: <CalendarTodayIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Oylik xaridlar yo‘q',
        description: 'Mahsulotni kerak bo‘lganda olasiz',
    },
    {
        icon: <SyncIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Guruh aylanmasi talab qilinmaydi',
        description: 'Hamma rivojlanadi va hech kim majburlanmaydi',
    },
    {
        icon: <TrendingUpIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Erishilgan daraja saqlanadi',
        description: 'Har oy guruh aylanmasini tasdiqlash kerak emas',
    },
    {
        icon: <AttachMoneyIcon style={{fontSize: 40, color: 'green'}}/>,
        title: 'Ballar tizimi',
        description: 'Ballar sayohat, avtomobil va ko‘chmas mulk uchun to‘planadi',
    },
];

const MarketingBenefits = () => {
    return (
        <Box sx={{
            padding: '40px 0',
            textAlign: 'center',
            maxWidth: '1300px',
            margin: '0 auto'
        }}>
            <Typography variant="h4" gutterBottom sx={{
                fontSize: {xs: '1.3rem', sm: '1.7rem', md: '2rem', lg: '3rem'},
                textAlign: 'center'
            }}>
                Nega GreenLeaf marketingi hamkorlar uchun foydali?
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {features.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box>
                            {item.icon}
                            <Typography variant="h6" gutterBottom>
                                {item.title}
                            </Typography>
                            <Typography variant="body2">{item.description}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MarketingBenefits;
