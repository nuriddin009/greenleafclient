import React, {useState} from 'react';
import './about.scss';
import {Button} from '@mui/material';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Fade, Zoom} from 'react-reveal'
import Typography from "@mui/material/Typography";

function Index(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="about-container" id="about">
            <Zoom bottom delay={1000} sx={{textAlign: 'center'}}>
                <Typography variant="h4" gutterBottom
                            sx={{
                                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                                textAlign: 'center'
                            }}
                >
                    Kompaniya haqida🌱
                </Typography>
            </Zoom>
            <div className="responsive-container">
                <Fade bottom>
                    <img
                        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                        alt="Kompaniya Binosi"
                        className="responsive-image"
                    />
                </Fade>
                <div className="responsive-text-container">
                    <Fade bottom>
                        <p>Greenleaf kompaniyasi (Suzhou Greenleaf Daily Commodity Co. Ltd) Suzhou shahridagi yuqori
                            texnologiyali
                            zonada joylashgan va uning asosiy kapitali 22 million dollarni tashkil etadi.</p>
                        <p>Bu zamonaviy yuqori texnologiyali guruh bo'lib, ilmiy tadqiqotlar, ishlab chiqarish, xalqaro
                            hamkorlik,
                            brendni ilgari surish va marketingni birlashtiradi.</p>
                        <p>Industriyal kosmetik park go'zallik sanoatining biologik asosidir. Uning umumiy ishlab
                            chiqarish
                            quvvatining
                            yiliga 80 000 tonnani tashkil etishi kutilmoqda.</p>
                        <p>Ishlab chiqarish liniyasi Germaniya, Fransiya va Italiyadan kelgan zamonaviy ishlab chiqarish
                            uskunalaridan
                            foydalanadi,</p>
                    </Fade>

                    {isExpanded && (
                        <div className="text-left">
                            <p>hamda so'nggi 20 yil ichida mustaqil tadqiqotlar va kimyoviy mahsulotlar ishlab chiqishga
                                asoslangan
                                xalqaro yetakchi sifat nazorati tizimi mavjud.</p>
                            <p>2016-yil 16-martda Xitoy Xalq Respublikasi Savdo Vazirligi Greenleaf Suzhou'ga
                                to'g'ridan-to'g'ri marketing
                                uchun litsenziya berdi. Partiya va milliy hukumatning muhim qo'llab-quvvatlovi va
                                yordamiga ega bo'lgan
                                Greenleaf qonunlarga muvofiq faoliyat yuritib, zamon ruhiga mos ravishda va Greenleaf
                                xususiyatlarini
                                hisobga olgan holda rivojlanadi.</p>
                        </div>
                    )}
                    <Fade bottom>
                        <Button
                            startIcon={isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            sx={{textTransform: 'none'}}
                            variant='contained'
                            color='success'
                            onClick={handleToggle}>
                            {isExpanded ? 'Kamroq' : 'Ko\'proq'}
                        </Button>
                    </Fade>
                </div>
            </div>
        </div>
    );
}

export default Index;
