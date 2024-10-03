import React, {useEffect, useState} from 'react';
import './contact.scss';
import {Controller, useForm} from 'react-hook-form';
import {Box, Button, TextField, Typography} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import instance from "../../utils/instance.js";
import parse from "html-react-parser";
import {toast} from "react-toastify";


function Index(props) {

    const {handleSubmit, control, formState: {errors}, reset} = useForm();

    const [contact, setContact] = useState(null)


    const onSubmit = (data) => {

        instance.post('/v1/app', data).then(res => {
            reset({
                fullName: '',
                email: '',
                description: '',
                phoneNumber: '998'
            })
            toast.success('Arizangiz qabul qilindi. Siz bilan tez orada bog\'lanamiz')
            // setTimeout(() => {
            //     setDisabled(!disabled)
            // }, 0)
        })
    };

    useEffect(() => {
        getContact()
    }, []);

    const getContact = () => {
        instance('/v1/dashboard/contact').then(res => {
            setContact(JSON.parse(res.data.message))
        })
    }

    const formatPhoneNumber = (phoneNumber) => {
        // Remove all non-numeric characters
        const cleaned = phoneNumber.replace(/\D/g, '');

        // Match and format the phone number
        const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);

        if (match) {
            return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        }

        return phoneNumber; // Return the original if the pattern doesn't match
    };


    return (
        <div className="contact-container mt-3" id="contact">
            <Typography variant="h4" gutterBottom sx={{
                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                textAlign: 'center'
            }}>
                Biz bilan bog'lanish
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    justifyContent: 'space-between',
                    p: 2
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        flex: 1,
                        maxWidth: '600px',
                        mx: 'auto',
                        '& .MuiTextField-root': {mb: 2, width: '100%'},
                    }}
                >
                    <div>
                        <h3 className={'tel'}>Telefonlarimiz:</h3>
                        {
                            contact?.phones?.map((item, index) => (
                                <h5 key={index}>
                                    <a href={`tel:${item?.number}`} style={{color: '#000', textDecoration: 'none'}}>
                                        {formatPhoneNumber(item?.number)}
                                    </a>
                                </h5>
                            ))
                        }

                    </div>

                    <div>
                        <h3 className={'tel'}>Xabar qoldiring</h3>
                    </div>


                    <Controller
                        name="fullName"
                        control={control}
                        defaultValue=""
                        rules={{required: 'Ismni kiritsh majburiy'}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="To'liq ismingiz"
                                color='success'
                                variant="outlined"
                                error={!!errors.fullName}
                                helperText={errors.fullName ? errors.fullName.message : ''}
                            />
                        )}
                    />

                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{required: 'Telefon raqam kiritish majburiy'}}
                        render={({field: {onChange, value}}) => (
                            <PhoneInput
                                country={"uz"}
                                specialLabel={'Telefon raqam'}
                                value={value}
                                inputStyle={{width: '100%', borderColor: '#4caf50', marginBottom: '1rem'}}
                                onChange={onChange}
                                prefix={"+"}
                                inputProps={{
                                    required: true,
                                }}
                            />
                        )}
                    />
                    {errors?.phoneNumber && <p className={'text-danger'}>{errors?.phoneNumber?.message}</p>}

                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Pochtani kiritish majburiy',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Entered value does not match email format'
                            }
                        }}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Pochta manzili"
                                color='success'
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{required: 'Xabar kiritish majburiy'}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Xabar"
                                variant="outlined"
                                color='success'
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ''}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{mt: 2}}
                    >
                        Xabar qoldirish
                    </Button>
                </Box>

                {/* Google Map Embed */}
                <Box
                    sx={{
                        flex: 1,
                        height: '400px',
                        mt: {xs: 3, md: 0},
                        ml: {md: 3},
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: 3
                    }}
                >
                    <div className={'d-flex gap-1 pt-1 pb-0 pl-1'} style={{
                        boxSizing: 'border-box'
                    }}>
                        <p
                            style={{
                                boxSizing: 'border-box'
                            }}
                            className={'pl-0.5'}>Manzil:</p> <p
                        className={'p-0.5'}>{contact?.address ? parse(contact?.address) : 'Buxoro'}</p></div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.6312560564265!2d64.42911107511327!3d39.76736899490709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500781e81113b1%3A0x767582d4023bbaac!2sBuxoro%20Savdo%20Majmuasi!5e1!3m2!1sen!2s!4v1725452982022!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>

                </Box>
            </Box>
        </div>
    );
}

export default Index;
