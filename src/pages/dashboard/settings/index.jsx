import React from 'react';
import SettingsIcon from "@mui/icons-material/Settings";
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import instance from "../../../utils/instance.js";
import {toast} from "react-toastify";

function Index(props) {
    const {control, handleSubmit, formState: {errors}} = useForm();


    const onSubmit = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            instance.post('/v1/user/change_password', data).then(res => {
                console.log(res.data)
            })
        } else {
            toast.error('Tasdiqlash paroli xato kiritildi');
        }
    }
    return (
        <div>
            <Button
                variant='text'
                size='large'
                color='success'
                startIcon={<SettingsIcon/>}
            >Sozlamalar</Button>

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{minHeight: '100vh', padding: 2}}
            >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Card sx={{padding: 2, boxShadow: 3}}> {/* Added boxShadow property */}
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                {"Parolni o'zgartirish"}
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="currentPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: 'Amaldagi parolni kiriting'}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Eski parol"
                                            type="password"
                                            color='success'
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.currentPassword}
                                            helperText={errors.currentPassword ? errors.currentPassword.message : ''}
                                        />
                                    )}
                                />
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: 'Yangi parolni kiriting'}}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Yangi parol"
                                            type="password"
                                            color='success'
                                            fullWidth
                                            margin="normal"
                                            error={!!errors.newPassword}
                                            helperText={errors.newPassword ? errors.newPassword.message : ''}
                                        />
                                    )}
                                />
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Parol tasdiqini kiriting',
                                    }}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Tasdishlash paroli"
                                            type="password"
                                            fullWidth
                                            color='success'
                                            margin="normal"
                                            error={!!errors.confirmPassword}
                                            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                                        />
                                    )}
                                />
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    type="submit"
                                    sx={{marginTop: 2}}
                                >
                                    Change Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}

export default Index;