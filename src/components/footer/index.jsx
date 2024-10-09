import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, IconButton, TextField, Typography} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import instance from "../../utils/instance.js";
import parse from "html-react-parser";
import {formatPhoneNumber} from "../../utils/formatters.js";

const Index = () => {

    const [contact, setContact] = useState(null)

    useEffect(() => {
        getContact()
    }, []);


    const getContact = () => {
        instance('/v1/dashboard/contact').then(res => {
            setContact(JSON.parse(res.data.message))
        })
    }




    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubscribe = () => {
        // Validate the email
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Yaroqsiz elektron pochta manzili');
            return;
        }

        setSubscribed(true);
    };


    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#123d2d',
                color: 'white',
                padding: '40px',
                width: '100%',
                boxSizing: 'border-box',

            }}
        >
            <Grid container spacing={4}>
                {/* Logo and Subscription */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h5" sx={{fontWeight: 'bold', mb: 2}}>Greenleaf</Typography>

                    {!subscribed && (
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start'}}>
                            <Typography variant="body1" sx={{mb: 2}}>
                                Hozir obuna boʻling
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Sizning email"
                                size="small"
                                fullWidth
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError(''); // Clear error when user types
                                }}
                                sx={{backgroundColor: 'white', marginRight: '8px', borderRadius: '4px'}}
                            />
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <Button variant="contained" color="success" type="submit" onClick={handleSubscribe}>
                                {subscribed ? '✅ Obuna bo\'ldingiz' : 'Obuna bo\'lish'}
                            </Button>
                        </Box>
                    )}
                    {subscribed && <Button variant="contained" color="success" type="submit" sx={{
                        mt: 1,
                        borderRadius: subscribed ? '20px' : '',
                        backgroundColor: subscribed ? '#fff' : '',
                        color: subscribed ? 'green' : '',
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: 'green',
                        }
                    }} onClick={handleSubscribe}>
                        ✅ Obuna bo'ldingiz
                    </Button>}

                </Grid>


                {/* Links */}
                <Grid item xs={12} sm={6} md={2}>
                    <Typography variant="h6" sx={{fontWeight: 'bold', mb: 2}}>Havolalar</Typography>
                    <Typography variant="body2" sx={{mb: 1}}><a style={{textDecoration: 'none', color: '#fff'}}
                                                                href="#about">Kompaniya haqida</a></Typography>
                    <Typography variant="body2" sx={{mb: 1}}><a style={{textDecoration: 'none', color: '#fff'}}
                                                                href="#our_team">Bizning jamoa</a></Typography>
                    <Typography variant="body2" sx={{mb: 1}}><a style={{textDecoration: 'none', color: '#fff'}}
                                                                href="#partner">Hamkor bo'lish</a></Typography>
                    <Typography variant="body2" sx={{mb: 1}}><a style={{textDecoration: 'none', color: '#fff'}}
                                                                href="#galleriya">Galleriya</a></Typography>
                    <Typography variant="body2" sx={{mb: 1}}><a style={{textDecoration: 'none', color: '#fff'}}
                                                                href="#contact">Bog'lanish</a></Typography>
                </Grid>

                {/* Working Hours */}
                <Grid item xs={12} sm={6} md={2}>
                    <Typography variant="h6" sx={{fontWeight: 'bold', mb: 2}}>Ish vaqti</Typography>
                    <Typography variant="body2" sx={{mb: 1}}><AccessTimeIcon/> 24/7</Typography>
                </Grid>

                {/* Get In Touch */}
                <Grid item xs={12} sm={6} md={2}>
                    <Typography variant="h6" sx={{fontWeight: 'bold', mb: 2}}>Bog'lanish&nbsp;uchun</Typography>
                    <Typography variant="body2" sx={{mb: 1, display: 'flex', alignItems: 'center'}}>
                        {contact?.address ? parse(contact?.address) : 'Buxoro'}
                    </Typography>
                    <Typography variant="body2" sx={{mb: 1}}>
                        <a href="mailto:nuriddinovamuhtabar5@gmail.com"
                           style={{textDecoration: 'none', color: 'inherit'}}>
                            ✉️&nbsp;nuriddinovamuhtabar5@gmail.com
                        </a>
                    </Typography>
                    <Typography variant="body2">


                        {
                            contact?.phones?.map((item, index) => (
                                <h5 key={index}>
                                    <span>📞</span> <a href={`tel:${item?.number}`}
                                                      style={{textDecoration: 'none', color: '#fff', fontSize: '16px'}}>
                                    {formatPhoneNumber(item?.number)}
                                </a>
                                </h5>
                            ))
                        }
                    </Typography>
                </Grid>
            </Grid>

            {/* Social Media Icons */}
            <Box mt={4} sx={{display: 'flex', justifyContent: 'center'}}>
                <IconButton color="inherit" href="https://www.facebook.com/">
                    <FacebookIcon/>
                </IconButton>
                <IconButton color="inherit" href="https://twitter.com/">
                    <TwitterIcon/>
                </IconButton>
                <IconButton color="inherit" href="https://www.instagram.com/greenleaf__bukhara/">
                    <InstagramIcon/>
                </IconButton>
                <IconButton color="inherit" href="https://t.me/GreenLeafcom">
                    <TelegramIcon/>
                </IconButton>
            </Box>

            {/* Copyright */}
            <Box mt={2} sx={{textAlign: 'center', fontSize: '14px'}}>
                <Typography variant="body2">
                    &copy;  {new Date().getFullYear()} Barcha huquqlar himoyalangan.
                </Typography>
            </Box>
        </Box>
    );
};

export default Index;