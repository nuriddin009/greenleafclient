import React, {useState} from 'react';
import './partner.scss';
import {TextField, Button, Checkbox, FormControlLabel, Typography} from '@mui/material';
import PhoneInput from "react-phone-input-2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Controller, useForm} from "react-hook-form";

function Index() {
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}, control
    } = useForm()


    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };


    const submitForm = (data) => {
        console.log(data)
    }

    return (
        <div className='partner' id='partner'>
            <Typography variant="h4" gutterBottom  sx={{
                fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem'},
                textAlign: 'center'
            }}>
                Hamkor bo'lish
            </Typography>

            <div className='partner-content'>
                <div className='content-text'>
                    <p>
                        <code>GreenLeaf</code> — yaxshi qo'shimcha daromad olish va sifatli ekoproduktlardan 50%
                        chegirma bilan foydalanish imkoniyati
                    </p>

                    <p>GreenLeaf kompaniyasida biznes joyini sotib olayotganda:</p>


                    {isExpanded && (
                        <div className='additional-info'>
                            <ul>
                                <li>Kompaniyaning global bozorni rivojlantirishida ishtirok etasiz.</li>
                                <li>Minimal sarmoyalar bilan Greenleaf brendi ostida ekologik do'konlar tarmog'ini
                                    ochish imkoniyatiga ega bo'lasiz.
                                </li>
                                <li>Onlayn va oflayn ishlashingiz mumkin</li>
                            </ul>

                            <strong>Korxona egalari uchun afzalliklar:</strong>
                            <ol>
                                <li>Yirik va ishonchli kompaniya bilan hamkorlik, 20 yildan ortiq bozor tajribasi.</li>
                                <li>Premium sifatdagi birinchi zaruriyat mahsulotlarining keng assortimenti.</li>
                                <li>O'rtachilarsiz to'g'ridan-to'g'ri ishlab chiqaruvchi bilan ishlash.</li>
                                <li>Kamroq boshlang'ich kapital bilan biznesni boshlash imkoniyati.</li>
                            </ol>

                            <strong>O'ziga mahsulotlarni diler narxida, qo'shimcha narx qo'ymasdan olishni istaganlar
                                uchun afzalliklar:</strong>
                            <ol>
                                <li>O'z oilasi uchun sifatli BIO, EKO mahsulotlar</li>
                                <li>Oilaviy byudjetni tejash, kompaniya 50% chegirma taqdim etadi</li>
                                <li>Qo'shimcha daromad olish imkoniyati.</li>
                            </ol>

                            <b>MLM yetakchilari uchun afzalliklar:</b>
                            <ul style={{listStyleType: 'square'}}>
                                <li>Firma ikki xil kirish paketini taklif qiladi</li>
                                <li>Aralash marketing (Step-Binar + Lineyka)</li>
                                <li>8 xil daromad tizimi</li>
                                <li>Kunlik 3 xil bonuslar</li>
                                <li>Har oyda LTO yo'q</li>
                                <li>Kvalifikatsiyalarni tasdiqlash shart emas.</li>
                                <li>Ranglar / sayohatlar / avtomobil bonuslari / uy uchun ballar — yo'qolmaydi.</li>
                            </ul>
                        </div>
                    )}
                    <Button
                        startIcon={isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        sx={{textTransform: 'none'}}
                        variant='contained'
                        color='success'
                        onClick={handleToggle}>
                        {isExpanded ? 'Kamroq' : 'Ko\'proq'}
                    </Button>
                </div>

                <form className='content-form' onSubmit={handleSubmit(submitForm)}>
                    <h6>
                        Hamkorlik va franshiza sotib olish uchun ariza yuborish
                    </h6>
                    <div className='form-fields'>
                        <TextField
                            label={"To'liq FISH"}
                            fullWidth
                            color='success'
                            {...register('fullName', {required: 'Ushbu qator to\'ldirilishi shart.'})}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />

                        <TextField
                            label={'Pochta'}
                            color='success'
                            fullWidth
                            type='email'
                            {...register('email', {required: 'Ushbu qator to\'ldirilishi shart.'})}
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                        />

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
                        {errors?.phoneNumber && <p>{errors?.phoneNumber?.message}</p>}

                        <TextField
                            label={'Mamlakat va yashash manzili'}
                            fullWidth
                            multiline
                            color='success'
                            rows={5}
                            {...register('address')}
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="success"/>}
                            label="Shaxsiy ma'lumotlarimni qayta ishlashga roziligimni tasdiqlayman"
                        />
                        <Button type='submit' color='success' variant={'contained'}>
                            {"Hamkor bo'lish"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Index;
