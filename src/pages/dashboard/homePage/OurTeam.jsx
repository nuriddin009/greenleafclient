import React, {useEffect, useState} from "react";
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Avatar, Typography, Grid, IconButton, DialogContentText
} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import instance from "../../../utils/instance.js";

const Index = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [members, setMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [captions, setCaptions] = useState([])

    const {handleSubmit, control, reset, setValue} = useForm();

    const handleOpenDialog = () => setOpenDialog(true);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        reset();
        setImagePreview(null);
        setEditingMember(null);
    };

    useEffect(() => {
        getTeams()
    }, []);


    const getTeams = () => {
        instance('/v1/dashboard/our_team').then(res => {
            console.log(res.data)
            setMembers(res.data.data)
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview({url: URL.createObjectURL(file), file});
        }
    };

    const onSubmit = (data) => {
        // Create the new team member object with only the required fields
        const newMember = {
            name: data.name,
            profession: data.profession,
        };

        // Create a new teams array with only name and profession fields
        let teams = [...members.map(member => ({
            name: member.name,
            profession: member.profession
        })), newMember];  // Add the new member

        // Prepare formData
        let formData = new FormData();
        formData.append('file', imagePreview?.file);  // Append the image file to FormData
        formData.append('data', JSON.stringify(teams));  // Append the teams array as JSON to FormData

        // Make the API call to save the new team member
        instance.post('/v1/dashboard/our_team', formData)
            .then(res => {
                getTeams()
                handleCloseDialog();
                reset({
                    name: '',
                    profession: ''
                });
            });


    };


    const handleEditMember = (index) => {
        const member = members[index];
        setValue("name", member.name);
        setValue("profession", member.profession);
        setImagePreview({url: member.image});
        setEditingMember(index);
        setOpenDialog(true);
    };

    const handleDeleteMember = () => {
        const updatedMembers = members.filter((_, i) => i !== memberToDelete.index);
        setMembers(updatedMembers);
        setConfirmDeleteDialog(false);
        setMemberToDelete(null);
    };

    const openConfirmDeleteDialog = (index) => {
        setMemberToDelete({index, ...members[index]});
        setConfirmDeleteDialog(true);
    };

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Jamoa a'zosi qo'shish
            </Button>

            <Grid container spacing={2} sx={{mt: 4}}>
                {members?.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                            sx={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                p: 2,
                                position: "relative",
                                textAlign: "center"
                            }}
                        >
                            <Avatar
                                src={member?.image?.imageUrl}
                                alt={member?.name}
                                sx={{width: 100, height: 100, mx: "auto", mb: 2}}
                            />
                            <Typography variant="h6">{member.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {member?.profession}
                            </Typography>
                            <IconButton
                                onClick={() => openConfirmDeleteDialog(index)}
                                sx={{position: "absolute", top: 8, right: 8}}
                            >
                                <CloseIcon color="error"/>
                            </IconButton>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                sx={{mt: 2}}
                                onClick={() => handleEditMember(index)}
                            >
                                Tahrirlash
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>{editingMember !== null ? "Jamoa a'zosini yangilash" : "Jamoa a'zosi qo'shish"}</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{display: "flex", flexDirection: "column", gap: "1rem", paddingTop: '1rem'}}
                    >
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField {...field} label="Ism" variant="outlined" fullWidth/>
                            )}
                        />

                        <Controller
                            name="profession"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField {...field} label="Kasb" variant="outlined" fullWidth/>
                            )}
                        />

                        <Box sx={{textAlign: "center", my: 2}}>
                            {imagePreview ? (
                                <Avatar src={imagePreview.url} alt="Member Image"
                                        sx={{width: 150, height: 150, mx: "auto"}}/>
                            ) : (
                                <Avatar sx={{width: 150, height: 150, mx: "auto", bgcolor: "grey.200"}}>
                                    <Typography variant="caption">Rasm yuklash</Typography>
                                </Avatar>
                            )}

                            <input
                                accept="image/*"
                                type="file"
                                onChange={handleImageChange}
                                style={{display: "none"}}
                                id="image-upload"
                            />
                            <label htmlFor="image-upload">
                                <Button component="span" variant="contained" sx={{mt: 2}}>
                                    Rasm yuklash
                                </Button>
                            </label>
                        </Box>

                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Bekor qilish
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {editingMember !== null ? "Yangilash" : "Qo'shish"}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Confirm Delete Dialog */}
            {memberToDelete && (
                <Dialog
                    open={confirmDeleteDialog}
                    onClose={() => setConfirmDeleteDialog(false)}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>Jamoa a'zosini o'chirishni tasdiqlang</DialogTitle>
                    <DialogContent>
                        <Box sx={{textAlign: 'center'}}>
                            <Avatar
                                src={memberToDelete.image}
                                alt={memberToDelete.name}
                                sx={{width: 100, height: 100, mx: "auto", mb: 2}}
                            />
                            <Typography variant="h6">{memberToDelete.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {memberToDelete.profession}
                            </Typography>
                        </Box>
                        <DialogContentText sx={{mt: 2, textAlign: 'center'}}>
                            Ushbu jamoa a'zosini o'chirishga ishonchingiz komilmi?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDeleteDialog(false)} color="secondary">
                            Bekor qilish
                        </Button>
                        <Button onClick={handleDeleteMember} variant="contained" color="error">
                            O'chirish
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default Index;