import React from 'react';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useForm, Controller} from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import instance from "../../../utils/instance.js";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import PasswordInput from "../../../components/passwordInput/index.jsx";

function Index(props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}, control
    } = useForm()

    const navigate = useNavigate()
    const submitForm = (data) => {
        instance.post('/v1/auth/authenticate',
            {...data, phoneNumber: '+' + data.phoneNumber}).then(res => {
            localStorage.setItem('access_token', res.data?.access_token);
            localStorage.setItem('refresh_token', res.data?.refresh_token);

            try {
                const decodedToken = jwtDecode(res.data?.access_token);
                if (decodedToken?.ROLE_ADMIN) navigate('/dashboard/users')
                alert("Admin panelga muvaffiqiyatli kirdingiz✅")
            } catch (error) {
                console.error("Invalid token:", error);
            }

        })
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Avatar sx={{margin: '0 auto', background: '#4caf50'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" className={'m-2'}>
                        Kirish
                    </Typography>
                    <form onSubmit={handleSubmit(submitForm)}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="success"/>}
                            label="Eslab qolish"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            color='success'
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Kirish
                        </Button>
                        <Grid>
                            <Link href="">Parolni unutdingizmi?</Link>
                        </Grid>
                        <Grid className="footer">
                            <Typography component="h5">
                                {"Hisobingiz yo'qmi?"} <Link href="/auth/register">{"Ro'yxatdan o'tish"}</Link>
                            </Typography>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </>
    );
}

export default Index;