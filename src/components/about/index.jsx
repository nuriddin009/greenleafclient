import React, {useEffect, useState} from 'react';
import './about.scss';
import {Button} from '@mui/material';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Fade, Zoom} from 'react-reveal'
import Typography from "@mui/material/Typography";
import instance from "../../utils/instance.js";
import uploadImg from "../../assets/uploadImg.png";
import parse from "html-react-parser";

function Index(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [about, setAbout] = useState(null)

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        getAbout()
    }, []);

    const getAbout = () => {
        instance('/v1/dashboard/about').then(res => {
            setAbout(res.data.data)
        })
    }


    return (
        <div className="about-container" id="about">
            <Zoom bottom delay={1000} sx={{textAlign: 'center'}}>
                <Typography variant="h4" gutterBottom
                            sx={{
                                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                                textAlign: 'center'
                            }}
                >
                    Kompaniya haqida 🌱
                </Typography>
            </Zoom>
            <div>
                <div className="responsive-container">
                    <Fade bottom>
                        <div className="image-container">
                            <img
                                src={about?.imageUrl ? about?.imageUrl : uploadImg}
                                alt="Kompaniya Binosi"
                                className="responsive-image"
                            />
                        </div>
                    </Fade>
                    <div className="responsive-text-container">
                        <Fade bottom>
                            {about?.descriptionP1 ? parse(about?.descriptionP1) : "Malumotlar yo'q"}
                        </Fade>

                    </div>
                </div>
                <div style={{
                    padding: '20px'
                }}>
                    {isExpanded && (
                        <div className="text-left">
                            {about?.descriptionP2 ? parse(about?.descriptionP2) : ''}
                        </div>
                    )}
                    <Fade bottom>
                        {about?.descriptionP2 && <Button
                            startIcon={isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            sx={{textTransform: 'none'}}
                            variant='outlined'
                            color='success'
                            onClick={handleToggle}>
                            {isExpanded ? 'Qisqatirish' : 'Batafsil'}
                        </Button>}
                    </Fade>
                </div>

            </div>

        </div>
    );
}

export default Index;
