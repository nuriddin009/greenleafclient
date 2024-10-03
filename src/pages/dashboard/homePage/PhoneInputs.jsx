import React, {useEffect, useState} from 'react';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import SaveIcon from '@mui/icons-material/Save';
import instance from "../../../utils/instance.js";
import {toast} from "react-toastify";

const quillModules = {
    toolbar: [
        [{'header': [1, 2, false]}],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link'],
    ],
};

const PhoneInputs = () => {
    const {control, handleSubmit, reset} = useForm({
        defaultValues: {
            phones: [{number: ''}],
            address: ''
        }
    });

    const [hasContact, setHasContact] = useState(false);

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'phones'
    });

    useEffect(() => {
        getContact();
    }, []);

    const getContact = async () => {
        try {
            const res = await instance('/v1/dashboard/contact');
            if (res.data.success) {
                const contactData = JSON.parse(res.data.message);

                // Reset form with fetched data
                reset({
                    phones: contactData.phones || [{number: ''}],
                    address: contactData.address || ''
                });

                setHasContact(true);
            } else {
                setHasContact(false);
            }
        } catch (error) {
            console.error('Error fetching contact:', error);
            setHasContact(false);
        }
    };

    const onSubmit = async (data) => {
        console.log('Form Data:', data);

        try {
            if (hasContact) {
                await instance.put('/v1/dashboard/contact', {text: JSON.stringify(data)});
                toast.success("O'zgartirildi");
                await getContact()
            } else {
                await instance.post('/v1/dashboard/contact', {text: JSON.stringify(data)});
                toast.success("Saqlandi");
                await getContact()
            }
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error("Error saving data");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <div style={{flex: 1}}>
                    {fields.map((field, index) => (
                        <div key={field.id} style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                            <Controller
                                name={`phones[${index}].number`}
                                control={control}
                                render={({field}) => (
                                    <PhoneInput
                                        {...field}
                                        country={'uz'}
                                        specialLabel={'Telefon raqam'}
                                        inputStyle={{flex: 1}}
                                    />
                                )}
                            />
                            <IconButton
                                color="error"
                                style={{marginLeft: '8px'}}
                                onClick={() => remove(index)}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    ))}

                    <Button
                        variant="contained"
                        startIcon={<AddIcCallIcon/>}
                        onClick={() => append({number: ''})}
                    >
                        Yana qo'shish
                    </Button>
                </div>

                <div style={{flex: 1}}>
                    <Controller
                        name="address"
                        control={control}
                        render={({field}) => (
                            <ReactQuill
                                {...field}
                                theme="snow"
                                modules={quillModules}
                                placeholder="Manzil"
                            />
                        )}
                    />
                </div>
            </div>

            <Button
                type="submit"
                startIcon={<SaveIcon/>}
                variant="contained"
                color='success'
            >
                Saqlash
            </Button>
        </form>
    );
};

export default PhoneInputs;
