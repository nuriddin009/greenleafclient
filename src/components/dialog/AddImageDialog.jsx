import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function AddImageDialog({addImageDialogOpen, onClose, onAddImage}) {
    const [file, setFile] = useState(null);
    const {control, handleSubmit, reset} = useForm({
        defaultValues: {
            description: '',
        },
    });

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile({
                    img: newFile,
                    preview: URL.createObjectURL(newFile),
                    title: newFile.name,
                });
            };
            reader.readAsDataURL(newFile);
        }
    };

    const onSubmit = (data) => {
        if (file) {
            onAddImage({file: file?.img, description: data.description});
            reset();
            setFile(null);
            onClose();
        }
    };

    return (
        <Dialog
            open={addImageDialogOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Add New Image</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
                <label htmlFor="file-input">
                    {
                        file ? <img src={file?.preview} height={100} width={100} alt=""/> : <IconButton
                            component="span"
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                border: '2px dashed #ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <CloudUploadIcon/>
                        </IconButton>
                    }
                </label>
                <Typography variant="body1" sx={{mt: 2}}>
                    {file ? file.title : 'No file selected'}
                </Typography>

                {/* Description Editor */}
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <ReactQuill
                            value={field.value}
                            onChange={field.onChange}
                            modules={quillModules}
                            style={{width: '100%', marginTop: '16px'}}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    color="primary"
                    disabled={!file}
                >
                    Add Image
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// Quill editor modules configuration
const quillModules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['bold', 'italic', 'underline'],
        [{'color': []}, {'background': []}],
        [{'align': []}],
        ['link'],
        ['clean']
    ],
};
