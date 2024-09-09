import React from 'react';
import './contact.scss';
import {useForm, Controller} from 'react-hook-form';
import {TextField, Button, Box, Typography} from '@mui/material';
import PhoneInput from 'react-phone-input-2';


function Index(props) {

    const {handleSubmit, control, formState: {errors}} = useForm();


    const onSubmit = (data) => {
        console.log(data);
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
                        <h5>+998 93 453 45 00</h5>
                    </div>

                    <div>
                        <h3 className={'tel'}>Xabar qoldiring</h3>
                    </div>


                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{required: 'Ismni kiritsh majburiy'}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="To'liq ismingiz"
                                color='success'
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
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
                    {errors?.phoneNumber && <p>{errors?.phoneNumber?.message}</p>}

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
                        name="message"
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
                                error={!!errors.message}
                                helperText={errors.message ? errors.message.message : ''}
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
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.6312560564265!2d64.42911107511327!3d39.76736899490709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500781e81113b1%3A0x767582d4023bbaac!2sBuxoro%20Savdo%20Majmuasi!5e1!3m2!1sen!2s!4v1725452982022!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>

                    Manzil : Buxoro savdo majbuasi

                </Box>
            </Box>
        </div>
    );
}

export default Index;
