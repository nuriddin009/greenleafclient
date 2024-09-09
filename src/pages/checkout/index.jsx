// src/Index.jsx
import React from 'react';
import {useForm} from 'react-hook-form';
import Cards from 'react-credit-cards';
import {Box, TextField, Button, Typography} from '@mui/material';
import 'react-credit-cards/es/styles-compiled.css';
import clickImg from './click.png';
import paymeImg from './payme.png';

const Index = () => {
    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        console.log('Card Data:', data);
    };

    const cardNumber = watch('number') || '';
    const expiry = watch('expiry') || '';
    const name = watch('name') || '';
    const cvc = watch('cvc') || '';

    const formatCardNumber = (value) => {
        return value.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    const formatExpiry = (value) => {
        return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').trim();
    };

    return (
        <Box sx={{
            maxWidth: 800,
            mx: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap-reverse',
        }}>
            <Box sx={{flex: 1, mr: 2}}>
                {/*<Typography variant="h5" component="h2" gutterBottom>*/}
                {/*    Checkout*/}
                {/*</Typography>*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Karta raqami"
                        value={formatCardNumber(cardNumber)}
                        onChange={(e) => setValue('number', formatCardNumber(e.target.value))}
                        {...register('number', {
                            required: 'Karta raqami majburiy',
                            minLength: {
                                value: 16,
                                message: "Karta raqam 16 raqamdan iborat bo'lishi kerak",
                            },
                            maxLength: {
                                value: 19,
                                message: 'Card number must be 16 digits',
                            },
                            pattern: {
                                value: /^\d+\s?\d*\s?\d*\s?\d*$/,
                                message: 'Invalid card number',
                            },
                        })}
                        error={!!errors.number}
                        helperText={errors.number ? errors.number.message : ''}
                        variant="outlined"
                        inputProps={{maxLength: 19}}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Karta nomi"
                        {...register('name', {required: 'Cardholder name is required'})}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Amal qilish muddati (OO/YY)"
                        value={formatExpiry(expiry)}
                        onChange={(e) => setValue('expiry', formatExpiry(e.target.value))}
                        {...register('expiry', {
                            required: 'Expiry date is required',
                            pattern: {
                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                message: 'Invalid expiry date format (MM/YY)',
                            },
                        })}
                        error={!!errors.expiry}
                        helperText={errors.expiry ? errors.expiry.message : ''}
                        variant="outlined"
                        inputProps={{maxLength: 5}}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="CVC (ixtiyoriy)"
                        {...register('cvc', {
                            minLength: {
                                value: 3,
                                message: 'CVC must be 3 digits',
                            },
                            maxLength: {
                                value: 3,
                                message: 'CVC must be 3 digits',
                            },
                            pattern: {
                                value: /^\d*$/,
                                message: 'Invalid CVC',
                            },
                        })}
                        error={!!errors.cvc}
                        helperText={errors.cvc ? errors.cvc.message : ''}
                        variant="outlined"
                        inputProps={{maxLength: 3}}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mb: 2}}>
                        Pay Now
                    </Button>
                </form>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                    <Button sx={{p: 0}}>
                        <img src={clickImg} alt="click" style={{maxWidth: '100px', cursor: 'pointer'}}/>
                    </Button>
                    <Button sx={{p: 0}}>
                        <img src={paymeImg} alt="payme" style={{maxWidth: '100px', cursor: 'pointer'}}/>
                    </Button>
                </Box>
                <Button
                    variant='contained'
                    type='button'
                    color='success'
                    sx={{
                        mt: 2,
                    }}
                    fullWidth
                >Bosh sahifaga</Button>
            </Box>
            <Box sx={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Cards
                    number={cardNumber}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused="number"
                />
            </Box>
        </Box>
    );
};

export default Index;