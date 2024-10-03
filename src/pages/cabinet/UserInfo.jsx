import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
    Box,
    Button,
    Divider,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import {useNavigate} from "react-router-dom";


function UserInfo() {
    const {control, register, handleSubmit, watch} = useForm();
    const [isChanged, setIsChanged] = useState(false);

    const navigate = useNavigate()
    // Watch all form fields to detect changes
    const formValues = watch();

    useEffect(() => {
        const hasChanged = Object.keys(formValues).some(key => formValues[key] !== '');
        setIsChanged(hasChanged);
    }, [formValues]);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{p: 2}}>
            <Typography variant="h6">Ma'lumotlarim</Typography>
            <Divider sx={{mb: 2}}/>

            <TextField
                fullWidth
                label="Familiya *"
                margin="normal"
                {...register('familyName', {required: true})}
            />
            <TextField
                fullWidth
                label="Ism *"
                margin="normal"
                {...register('firstName', {required: true})}
            />
            <TextField
                fullWidth
                label="Otasining ismi"
                margin="normal"
                {...register('fatherName')}
            />
            <TextField
                fullWidth
                label="Tug‘ilgan sana"
                type="date"
                sx={{marginTop: 2}}
                InputLabelProps={{
                    shrink: true,
                }}
                {...register('birthDate', {required: true})}
            />
            <TextField
                fullWidth
                label="Elektron pochta *"
                margin="normal"
                {...register('email', {required: true})}
            />

            <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({field: {onChange, value}}) => (
                    <PhoneInput
                        country={'uz'}
                        value={value}
                        onChange={(phone) => {
                            onChange(phone);
                            setIsChanged(true); // Mark as changed on input change
                        }}
                        inputStyle={{width: '100%', marginTop: 16}}
                        specialLabel="Telefon raqami *"
                    />
                )}
            />

            <RadioGroup row sx={{mt: 2}} {...register('gender', {required: true})}>
                <FormControlLabel value="erkak" control={<Radio/>} label="Erkak"/>
                <FormControlLabel value="ayol" control={<Radio/>} label="Ayol"/>
            </RadioGroup>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3}}>
                <Button color={'inherit'} onClick={() => {
                    localStorage.clear()
                    navigate('/')
                }}>
                    Tizimdan chiqish
                </Button>
                {isChanged && (
                    <Box>
                        <Button variant="outlined" color="secondary" sx={{mr: 1}}>
                            Bekor qilish
                        </Button>
                        <Button variant="contained" color="primary">
                            Saqlash
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default UserInfo;