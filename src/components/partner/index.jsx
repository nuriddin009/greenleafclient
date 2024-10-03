import React, { useEffect, useState } from 'react';
import './partner.scss';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import PhoneInput from "react-phone-input-2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player/youtube";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import instance from "../../utils/instance.js";
import parse from "html-react-parser";
import { Bounce } from "react-reveal";
import {toast} from "react-toastify";

function Index() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [partner, setPartner] = useState(null);
    const [isChecked, setIsChecked] = useState(false); // New state for checkbox

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control
    } = useForm();
    const theme = useTheme();

    useEffect(() => {
        getPartner();
    }, []);

    const getPartner = () => {
        instance('/v1/dashboard/partner').then(res => {
            setPartner(res.data.data);
        });
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const submitForm = (data) => {
        instance.post('/v1/app', data).then(res => {
            reset({
                fullName: '',
                email: '',
                description: '',
                phoneNumber: '998'
            })
            // setIsChecked(false)
            toast.success('Arizangiz qabul qilindi. Siz bilan tez orada bog\'lanamiz')
            // setTimeout(() => {
            //     setDisabled(!disabled)
            // }, 0)
        })
    };

    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div className='partner' id='partner'>
            <Bounce>
                <Typography variant="h4" gutterBottom sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                    textAlign: 'center'
                }}>
                    Hamkor bo'lish
                </Typography>
            </Bounce>

            <div className='partner-content'>
                <div className='content-text'>
                    <Bounce bottom>
                        {partner?.descriptionP1 ? parse(partner?.descriptionP1) : "Malumotlar yo'q"}
                    </Bounce>

                    {isExpanded && (
                        <div className='additional-info'>
                            {partner?.descriptionP2 ? parse(partner?.descriptionP2) : "Malumotlar yo'q"}
                            <h5>Batafsil videoda...</h5>

                            <ReactPlayer
                                url={partner?.videoLink ? partner?.videoLink : 'https://youtu.be/JqGVrlaSp9I?si=3PKbUxhcHNKOFvBa'}
                                width={isMd ? '60%' : '100%'}
                                height="200px"
                                controls
                            />
                            <br />
                        </div>
                    )}
                    {partner?.seeMore && <Button
                        startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{ textTransform: 'none' }}
                        variant='outlined'
                        color='success'
                        onClick={handleToggle}>
                        {isExpanded ? 'Qisqatirish' : 'Batafsil'}
                    </Button>}
                </div>

                <form className='content-form' onSubmit={handleSubmit(submitForm)}>
                    <h6>
                        Hamkorlik va franshiza sotib olish uchun ariza yuborish
                    </h6>
                    <div className='form-fields'>
                        <Bounce left>
                            <TextField
                                label={"To'liq FISH"}
                                fullWidth
                                color='success'
                                {...register('fullName', { required: 'Ushbu qator to\'ldirilishi shart.' })}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                        </Bounce>

                        <Bounce right>
                            <TextField
                                label={'Pochta'}
                                color='success'
                                fullWidth
                                type='email'
                                {...register('email', { required: 'Ushbu qator to\'ldirilishi shart.' })}
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                            />
                        </Bounce>

                        <Bounce>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                rules={{ required: 'Ushbu qator to\'ldirilishi shart.' }}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                        country={"uz"}
                                        specialLabel={'Telefon raqam'}
                                        value={value}
                                        inputStyle={{ width: '100%', borderColor: '#4caf50' }}
                                        onChange={onChange}
                                        prefix={"+"}
                                    />
                                )}
                            />
                        </Bounce>
                        {errors?.phoneNumber && <span className={'text-danger'}>{errors?.phoneNumber?.message}</span>}

                        <Bounce bottom>
                            <TextField
                                label={'Mamlakat va yashash manzili'}
                                fullWidth
                                multiline
                                color='success'
                                rows={5}
                                {...register('description', { required: 'Ushbu qator to\'ldirilishi shart.' })} // Make description required
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        </Bounce>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="success"
                                    onChange={(e) => setIsChecked(e.target.checked)} // Update state on change
                                />
                            }
                            label="Shaxsiy ma'lumotlarimni qayta ishlashga roziligimni tasdiqlayman"
                        />
                        <Button
                            type='submit'
                            color='success'
                            variant={'contained'}
                            disabled={!isChecked} // Disable button if checkbox is not checked
                        >
                            {"Hamkor bo'lish"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Index;