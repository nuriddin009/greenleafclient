import React from "react";
import {Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneInput from "react-phone-input-2";
import {Controller, useForm} from "react-hook-form";
import instance from "../../../utils/instance.js";
import {useNavigate} from "react-router-dom";
import PasswordInput from "../../../components/passwordInput/index.jsx";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://eco-tovar.uz">
                Greenleaf
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}


export default function Index() {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}, control
    } = useForm()

    const navigate = useNavigate()

    const submitForm = (data) => {
        let obj = {
            ...data,
            phoneNumber: '+' + data.phoneNumber
        }
        instance.post('/v1/auth/register', obj)
            .then(res => {
                console.log(res.data)
                navigate('/')
                alert("Tabriklaymiz muvaffiqiyatli ro'yxatdan o'tdingiz ✨🎉")
            }).catch(e => {
            alert(e.data.message)
        })
    }

    return (
        <Container component="main" maxWidth="xs"

                   sx={{
                       width: '100%',
                       height: '100vh',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'center',
                       alignItems: 'center'
                   }}
        >
            <CssBaseline/>
            <div>
                <Avatar sx={{margin: '0 auto', background: '#4caf50'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" className={'text-center mt-2 mb-2'}>
                    {"Ro'yxatdan o'tish"}
                </Typography>
                <form onSubmit={handleSubmit(submitForm)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="firstname"
                                variant="outlined"
                                required
                                color='success'
                                fullWidth
                                label="Ism"
                                autoFocus
                                {...register('firstname')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Familiya"
                                color='success'
                                {...register('lastname')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <PhoneInput
                                        country={"uz"}
                                        specialLabel={'Telefon raqam'}
                                        value={value}
                                        inputStyle={{width: '100%', borderColor: '#4caf50'}}
                                        onChange={onChange}
                                        prefix={"+"}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <PasswordInput
                                        label="Parol"
                                        color='success'
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Grid>
                        {/*<Grid item xs={12} className={'m-2'}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox value="allowExtraEmails" color="success"/>}*/}
                        {/*        label="Men marketing aksiyalari va yangilanishlarni email orqali qabul qilishni xohlayman."*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{mt: 3}}
                    >
                        {"Ro'yxatdan o'tish"}
                    </Button>
                    <Grid container justify="flex-end" className={'mt-2'}>
                        <Grid item>
                            Allaqachon hisobingiz bormi? <Link href="/auth/login" variant="body2">
                            {"Kirish"}
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>

        </Container>
    );
}
